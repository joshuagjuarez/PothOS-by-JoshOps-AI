# Verify JoshOps AI downloads

The current Windows, Android, Apple-silicon Mac and connection-kit files have detached signatures made with the existing JoshOps AI release key. Independent verification passed for each exact file and rejected an altered byte. The Mac checksum list and publisher-signature manifest are signed too.

Download your installer from [Downloads](DOWNLOADS.md), its matching `.minisig` file from the [1.0.10 release](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/tag/v1.0.10-beta.1), and [JoshOps-AI-release.pub](../signing/JoshOps-AI-release.pub). Keep the matching files together. For example:

```sh
minisign -Vm JoshOps-AI-1.0.8-windows-x64.exe -p JoshOps-AI-release.pub
```

[Minisign's official verification documentation](https://jedisct1.github.io/minisign/) explains the options. The `.minisig` files are the normal Minisign format; the matching `.sig` files retain the updater's base64 format.

The public key file's SHA-256 is `f2279d3df6eb9a0184e3f570d36e977750cc529ca724bf733bb3c11d96d383f5`. Obtain it from this canonical repository or its release. The [signed manifest](PUBLISHER-SIGNATURES-20261114.json) records each file hash, signature hash and download address.

The release signature verifies the bytes against the project key. Windows Authenticode publisher verification is still pending. Android's platform signatures and the Mac Developer ID/notarization checks have their own recorded evidence. No store approval or legal IP assignment is created by these detached signatures.
