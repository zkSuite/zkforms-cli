# zkForms Client

An open source client tool for zkForms to generate Zero Knowledge Proofs locally and use it using the zkforms-frontend.

## Using the zkForms Client tool

Enter the whitelisted addresses and the formId in the public.json as:

```json
{
  "whitelisted": [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000"
  ],
  "formID": "0"
}
```

Now, open a terminal in the root directory of the project and run:

```bash
node cli.js "Your Private Key"
```

Now that the proof has been saved in the proof.json file, it can be used to demonstrate that the user is a DAO member and has permission to fill out zkForms.
