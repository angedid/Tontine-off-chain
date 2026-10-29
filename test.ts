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
    Redeemer
}  from "https://deno.land/x/lucid@0.9.1/mod.ts"

const tontineApplication = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewkey"
    ), "Preview",
);

tontineApplication.selectWalletFromSeed(
    "some seed word" 
);
const addr: Address = await tontineApplication.wallet.address();
console.log(addr);

const utxos : Array<UTxO> = await tontineApplication.utxosAt(addr)

// define a function that converts a string to hex
const fromText = (str) => {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const hexValue = charCode.toString(16);

        // Pad with zeros to ensure two-digit representation
        hex += hexValue.padStart(2, '0');
    }
    return hex;
};

// Create the vesting datum type
const VestingDatum = Data.Object({
    beneficiary: Data.String,
    deadline: Data.BigInt,
});
type VestingDatum = Data.Static<typeof VestingDatum>;

// Set the vesting deadline
const deadlineDate: Date = new Date("2023-03-19T00:00:00Z")
const deadlinePosIx = BigInt(deadlineDate.getTime());

// Set the vesting beneficiary to our own key.
const details: AddressDetails = getAddressDetails(addr);
const beneficiaryPKH: string = details.paymentCredential.hash
console.log("beneficiaryPKH: " + beneficiaryPKH);
// Creating a datum with a beneficiary and deadline
const datum: VestingDatum = {
    beneficiary: fromText ("Bla bla bla"),
    deadline: BigInt(123456789),
};

const dtm: Datum = Data.to<VestingDatum>(datum,VestingDatum);

console.log(dtm);

const OperationType = Data.Object({
   getOperationType: Data.String
});
type OperationType = Data.Static<typeof OperationType>;

// create tontine datum type
const TontineDatum = Data.Object({
    operation: OperationType,
    transactor: Data.String,
    member: Data.String
});
type TontineDatum = Data.Static<typeof TontineDatum>;

const tontine : OperationType = {
    getOperationType: fromText("TONTINE")
};
const moimeme : string = fromText("Moi meme");
const raoul : string = fromText("raoul");



const mydatum : TontineDatum = {
    operation: tontine,
    transactor: moimeme,
    member : raoul
};

console.log(mydatum);

const mydtm: Redeemer = Data.to<TontineDatum>(mydatum,TontineDatum);

console.log(mydtm);

const fromData = Data.from (mydtm, TontineDatum);

console.log("Conversion inverse: ");
console.log(fromData);

const addressDetails : AddressDetails = tontineApplication.utils.getAddressDetails(addr);

console.log(addressDetails.paymentCredential.hash);

