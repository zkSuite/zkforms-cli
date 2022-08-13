// Function to convert BigInt to tuple
function bigint_to_tuple(x) {
  let mod = 2n ** 64n;
  let ret = [0n, 0n, 0n, 0n];

  var x_temp = x;
  for (var idx = 0; idx < ret.length; idx++) {
    ret[idx] = x_temp % mod;
    x_temp = x_temp / mod;
  }
  return ret;
}

// Function to convert hex to decimal
function h2d(hex) {
  if (hex.length % 2) {
    hex = '0' + hex;
  }
  const bn = BigInt('0x' + hex);
  return bn.toString(10);
}

module.exports = {
  bigint_to_tuple,
  h2d,
};
