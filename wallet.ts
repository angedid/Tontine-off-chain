import {
    Lucid,
    Blockfrost
} from "https://deno.land/x/lucid@0.10.6/mod.ts"
//Use different methods to select a wallet and query balances.
import { secretSeed } from "./seed.ts"

const lucid = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewAiQH6B0Rcvef02CHU5T3x74QgLysWKbj"
    ), "Preview",
);

const privateKey = lucid.utils.generatePrivateKey(); // Bech32 encoded private key
console.log(privateKey);
lucid.selectWalletFromPrivateKey(privateKey);


//const seed = lucid.utils.generateSeedPhrase();
//console.log(seed);
lucid.selectWalletFrom(
    {address:"addr_test1wrkj7a6ppejke48ka27h4j06e8kyquyccp6kllsu6z4frec8dre4r"});

// @ts-ignore
const address = await lucid.wallet.address(); // Bech32 address

console.log(address);

// @ts-ignore
const utxos = await lucid.provider.getUtxos("addr_test1wrkj7a6ppejke48ka27h4j06e8kyquyccp6kllsu6z4frec8dre4r");

console.log(utxos);

// @ts-ignore
const datum = await lucid.provider.getDatum("2783d049e61f27b62c82f5165b98dd8203117c6c3b8262eef1f650c6a7e11847");

console.log(datum);

const lastUtxo = utxos[utxos.length-1];
// @ts-ignore
const lastdatum = await lucid.datumOf(lastUtxo);

console.log(lastdatum);




