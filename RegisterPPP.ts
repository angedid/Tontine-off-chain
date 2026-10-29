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
import { secretSeed, fromText } from "./myseed.ts";

const provider: Provider = await new Blockfrost(
    "https://cardano-mainnet.blockfrost.io/api/v0",
    "mainnetApiKey"
);

console.log(provider);

// @ts-ignore
const tontineApplication = await Lucid.new(provider, "Mainnet");

// Associer un porte-monnaie electronique
tontineApplication.selectWalletFromSeed(secretSeed);

const applicationWalletAddress = await tontineApplication.wallet.address();
const applicationAddressDetails : AddressDetails = tontineApplication.utils.getAddressDetails(applicationWalletAddress);
console.log(applicationWalletAddress);
const applicationWalletPaymentKeyHash = applicationAddressDetails.paymentCredential.hash
console.log(applicationWalletPaymentKeyHash);
