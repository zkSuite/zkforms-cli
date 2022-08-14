const snarkjs = require('snarkjs');
const fs = require('fs');
const { h2d, bigint_to_tuple } = require('../core/utils');

async function run() {
  if (process.argv.length < 3) {
    console.log('Please provide private key');
    process.exit(1);
  }

  const publicInputs = JSON.parse(fs.readFileSync('public.json'));

  const pKey = process.argv[2];
  const privateKeyDecimal = h2d(pKey);
  const priv_tuple = bigint_to_tuple(BigInt(privateKeyDecimal));

  const inputs = {
    privateKey: priv_tuple,
    whitelisted: publicInputs.whitelisted.map((addr) => h2d(addr.slice(2))),
    formID: publicInputs.formID,
  };

  console.log('**** GENERATING PROOF ****');
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    inputs,
    'https://dx9qacyqak197.cloudfront.net/circuit.wasm',
    'https://dx9qacyqak197.cloudfront.net/circuit.zkey'
  );

  console.log('**** VERIFYING PROOF ****');
  const vKey = JSON.parse(fs.readFileSync('verification_key.json'));
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  if (res === true) {
    console.log('✅ Verification OK');
  } else {
    console.log('❌ Invalid proof');
  }

  console.log('**** EXPORTING SOLIDITY CALLDATA ****');
  const calldata = await snarkjs.groth16.exportSolidityCallData(
    proof,
    publicSignals
  );

  const argv = calldata.replace(/["[\]\s]/g, '').split(',');

  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const input = [];

  for (let i = 8; i < argv.length; i++) {
    input.push(argv[i]);
  }

  console.log('**** PROOF: ****');
  console.log(JSON.stringify({ a, b, c, input }, null, 1));

  fs.writeFileSync('proof.json', JSON.stringify({ a, b, c, input }, null, 1));
  console.log('**** PROOF SAVED IN PROOF.JSON ****');
}

run().then(() => {
  process.exit(0);
});
