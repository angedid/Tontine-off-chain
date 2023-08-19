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

tontineApplication.selectWalletFromSeed(
    "small magic allow corn wine circle pitch huge unknown noble thrive evoke " +
    "tiny shallow ketchup chase lonely step leisure piano mother viable mask wish"
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

/*
const ListingSchema = Data.Object({
    owner: Data.Bytes,
    amount: Data.Integer,
    private: Data.Boolean,
});
type Listing = Data.Static<typeof ListingSchema>;
const Listing = ListingSchema as unknown as Listing;

const listing = Data.to(
    { owner: "31313131313131", amount: 5252352323n, private: false },
    Listing,
);

console.log(listing);
*/

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
/*

How to get public key hash from address?
https://cardano.stackexchange.com/questions/7350/how-to-get-public-key-of-nami-wallet
echo addr_test1qrc5sta2j9e3dlkxm3l9nzkg4q3wc5xrmwnj3tah7w0n473juwv4s0z84ztfqhhxpx2zre8pmfhcmu778ay2j90ymchq3609fr | /home/nkalla-ehawe/cardano/cardano-address/bin/cardano-address address inspect
{
    "stake_reference": "by value",
    "stake_key_hash_bech32": "stake_vkh1xt3ejkpug75fdyz7ucyegg0yu8dxlr0nmcl532g4un0zul7rdhl",
    "stake_key_hash": "32e399583c47a896905ee6099421e4e1da6f8df3de3f48a915e4de2e",
    "spending_key_hash_bech32": "addr_vkh179yzl253wvt0a3ku0evc4j9gytk9ps7m5u52ldlnnua05qzrcj7",
    "address_style": "Shelley",
    "spending_key_hash": "f1482faa917316fec6dc7e598ac8a822ec50c3dba728afb7f39f3afa",
    "network_tag": 0,
    "address_type": 0
}


pour obtenir le public key hash on peut utiliser Lucid
Notamment :
const addressDetails : AddressDetails = tontineApplication.utils.getAddressDetails(addr);

console.log(addressDetails);
et on prend paymentCredential hash
 */
