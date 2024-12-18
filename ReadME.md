## Checkout the code

## Fix Code
Fix /node_modules/@irys/sdk/build/esm/node/upload.js:

> import { parse } from "csv-parse"
>
> import { stringify } from "csv-stringify"

install node (v22.12.0 worked fine)

install yarn

touch .env

## Add below lines to .env
### Add the private key

> irysUrl=https://devnet.irys.xyz
> 
> irysToken=matic
> 
> irysProviderUrl=https://rpc-mumbai.maticvigil.com
> 
> PRIVATE_KEY=ADD-KEY-HERE
> 
> chain=
> 
> chainId=
> 
> IRYS_GATEWAY=https://gateway.irys.xyz/

## Run app

node src/app.js

