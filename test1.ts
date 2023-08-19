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
        "previewAiQH6B0Rcvef02CHU5T3x74QgLysWKbj"
    ), "Preview",
);

tontineApplication.selectWalletFrom({address:"addr_test1vrmemrvzn049qymmefgmmgwedcqf8g58wja7ld28f3llpsqyhmlh0"})
const addr: Address = await tontineApplication.wallet.address();
console.log(addr);

//const utxos : Array<UTxO> = await tontineApplication.utxosAt(addr)



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




const OperationTypeData = Data.Object({
    getOperationType: Data.String
});
type OperationTypeData = Data.Static<typeof OperationTypeData>;


const TransactorData = Data.Object({
    name: Data.String
});
type TransactorData = Data.Static<typeof TransactorData>;


const MemberData = Data.Object({
    identifier:Data.String,
    mane:Data.String,
    phonenumber:Data.String
});
type MemberData = Data.Static<typeof MemberData>;


const TontineDatumData = Data.Object({
    operation:OperationTypeData,
    mane:TransactorData,
    phonenumber:Data.String
});
type TontineDatumData = Data.Static<typeof TontineDatumData>;




const tontine : OperationTypeData = {
    getOperationType: fromText("TONTINE")
};
const moimeme : TransactorData = {name:fromText("Moi meme")};

const membre : MemberData = {
  identifier: fromText("12efa56b") ,

};
//const raoul : string = fromText("raoul");



const mydatum : TontineDatumData = {
    operation: tontine,
    transactor: moimeme,
    member : raoul
};

console.log(mydatum);

const mydtm: Redeemer = Data.to<TontineDatum>(mydatum,TontineDatum);

console.log(mydtm);



const opt : OperationTypeData = {
    getOperationType: fromText("CLOSE")
};
const transtor : TransactorData = {
    name: fromText("Moi meme")
};
const memb: MemberData = {
    identifier: fromText("1eff5a126"),
    mane: fromText("Nkalla Ehawe"),
    phonenumber: fromText("123456789")
};
const datumTontine: TontineDatumData = {
    operation: opt,
    transactor: transtor,
    member: memb
};
//const datumData: Datum = Data.to<TontineDatumData>(datumTontine, TontineDatumData);




