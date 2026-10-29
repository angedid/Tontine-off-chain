import {
    Data,
    Lucid,
    Blockfrost,
    getAddressDetails,
    SpendingValidator,
    TxHash,
    Datum,
    UTxO,
    Address,
    AddressDetails,
    Redeemer,
    Provider
} from "https://deno.land/x/lucid@0.9.1/mod.ts";
import { secretSeed, fromText } from "./hackathon-seed.ts";

const provider: Provider = await new Blockfrost(
    "https://cardano-mainnet.blockfrost.io/api/v0",
    "mainnetApiKey"
);

//console.log(provider);

// @ts-ignore
const hackathonAwardApplication = await Lucid.new(provider/*, "Mainnet"*/);

// Associer un porte-monnaie electronique
hackathonAwardApplication.selectWalletFromSeed(secretSeed);

const hackathonAwardApplicationWalletAddress = await hackathonAwardApplication.wallet.address();
const hackathonAwardApplicationAddressDetails : AddressDetails = hackathonAwardApplication.utils.getAddressDetails(hackathonAwardApplicationWalletAddress);
console.log(hackathonAwardApplicationWalletAddress);
const applicationWalletPaymentKeyHash = hackathonAwardApplicationAddressDetails.paymentCredential.hash
console.log(applicationWalletPaymentKeyHash);
//stop
const utxoAtWallet: UTxO[] = await hackathonAwardApplication.utxosAt(hackathonAwardApplicationWalletAddress);
console.log(utxoAtWallet);

async function payer(/*participantAddress:Address, amount:BigInt*/):Promise<TxHash>{
        const tx = await hackathonAwardApplication
            .newTx()
            .payToAddress(
                "addr1qyj4sp26qd4ssvxjzjg6q3jargwy4t7ng8946fxec8g8qfpzlj7prvw5z3p209ye0c4a34qqywsfp7chw5hul4rx4j8q628k5m",
                { lovelace: 1000000n }
            )
            .payToAddress(
                "addr1qykzcgel2q2679kk6gwfql7ywy8tegad7mckddsfuekgq786j3l8v3cvll262pys093gexacsl930r2kk70pfmu0tytqpgdayw",
                { lovelace: 1000000n }
            )
            .addSignerKey(applicationWalletPaymentKeyHash)
            .attachMetadata(1, { msg: "Merci d'avoir ete des notres pour ce Hackathon de Novembre 2023"})
            .complete({
                change:{
                    address: hackathonAwardApplicationWalletAddress
                }
            });
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash;

}
console.log(await payer());
