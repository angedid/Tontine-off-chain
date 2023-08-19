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
} from "https://deno.land/x/lucid@0.9.1/mod.ts"

import { secretSeed } from "./seed.ts"

const tontineApplication = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewAiQH6B0Rcvef02CHU5T3x74QgLysWKbj"
    ), "Preview",
);

// Associer un porte-monnaie electronique
tontineApplication.selectWalletFromSeed(secretSeed);
//tontineApplication.selectWalletFrom({address:"addr_test1vrmemrvzn049qymmefgmmgwedcqf8g58wja7ld28f3llpsqyhmlh0"})
const addr: Address = await tontineApplication.wallet.address();
//console.log(addr);

const utxos : Array<UTxO> = await tontineApplication.utxosAt(addr)

//console.log(utxos);

// Define the tontine plutus script
const tontineScript: SpendingValidator = {
    type: "PlutusV2",
    script: "590d8d590d8a01000033232323232332232323232323232323322323322323232323232323232323232323232323232322232323223232232325335323232323235005222350032350082235002253353302300101b15335533533023004025150081038103913357389212a546f6e74696e652064656a61206f7576657274652e20496d706f737369626c652064276f7576726972210003815335330230010251533553353302300401b150081038103913357389212a546f6e74696e652064656a61204665726d65652e20496d706f737369626c65206465206665726d657221000381533533023001488107544f4e54494e45001533553353302300401b15335333573466e20cccd54c06848005408088cdc000099980d1a801111100181301319aa980e0900091a800910009aa8049111111111110062400066e00ccc060d54024888888888888024090090d405c88880100e00e44ccd54c06848004c8cd408888ccd400c88008008004d40048800448cc004894cd400840f040040e4c08c008d405c888800440e040e040e44cd5ce2481564d657263692064652076657269666965722071756520766f7573206176657a20737566666973616d656e7420646520666f6e64206f7520717565206c6120746f6e74696e65206573742064656a61206f75766572746500038153353302300148810350415900153355335330230040251333573466e20cd54074c06848004ccd54c08848004894cd4cc06d402c0084cd40b4008004400540b0d405c888800d200203803910381039133573892134566f7573206e276176657a20706173206c65732064726f697473206465207061796572206c652062656e6566696369616972652100038133573892011b4572726f72203430342e20416374696f6e20696e636f6e6e756521000381333573466e20cd54054c04848004ccd54c06848004894cd4cc04d400c0084cd409400800440054090d403c88880092002030031135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40ac0b0d5d0a80619a8158161aba1500b33502b02d35742a014666aa05eeb940b8d5d0a804999aa817bae502e35742a01066a0560706ae85401cccd540bc0e5d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd410dd69aba150023044357426ae8940088c98c8124cd5ce02502482389aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a821bad35742a00460886ae84d5d1280111931902499ab9c04a049047135573ca00226ea8004d5d09aba2500223263204533573808c08a08626aae7940044dd50009aba1500533502b75c6ae854010ccd540bc0d48004d5d0a801999aa817bae200135742a004606e6ae84d5d1280111931902099ab9c04204103f135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a008604e6ae84d5d1280211931901999ab9c0340330313333573466e1cd55cea8032400046644246600200600460606ae854018dd71aba135744a00c464c6406466ae700cc0c80c0cccd5cd19b8735573aa012900011999110919980080200180118179aba1500932323333573466e1cd55cea800a40004642460020046eb8d5d09aab9e500223263203433573806a06806426ea8004d5d0a804191919191999ab9a3370e6aae75400d2000233322212333001004003002375c6ae85400cdd71aba15002375c6ae84d5d1280111931901b19ab9c037036034135744a00226aae7940044dd50009aba135744a010464c6406266ae700c80c40bc40c04c98c80c0cd5ce24810350543500030135573ca00226ea80044d55cf280089baa001135744a00226aae7940044dd500091119191800802990009aa8151119a800a4000446a00444a66a666ae68cdc78010048158150980380089803001990009aa8149119a800a4000446a00444a66a666ae68cdc7801003815014880089803001911a801111111111111299a999aa98078900099a80b11299a801108018800a8119299a999ab9a3371e01c00205e05c26a04a0022a0480084205e205a640026aa0484422444a66a00226a012006442666a01800a6008004666aa600e2400200a008002911044f50454e00320013550222211225335001150142213350153004002335530061200100400111223333550023233500722333500700300100235004001500522337000029001000a4000246a00244002246a00244004266a0024446006600400240022442466002006004640026aa0384422444a66a00220044426600a004666aa600e2400200a00800244666ae68cdc780100080c00ba44100488105434c4f5345001232230023758002640026aa032446666aae7c004940288cd4024c010d5d080118019aba2002019232323333573466e1cd55cea80124000466442466002006004601c6ae854008c014d5d09aba2500223263201933573803403202e26aae7940044dd50009191919191999ab9a3370e6aae75401120002333322221233330010050040030023232323333573466e1cd55cea80124000466442466002006004602e6ae854008cd403c058d5d09aba2500223263201e33573803e03c03826aae7940044dd50009aba150043335500875ca00e6ae85400cc8c8c8cccd5cd19b875001480108c84888c008010d5d09aab9e500323333573466e1d4009200223212223001004375c6ae84d55cf280211999ab9a3370ea00690001091100191931901019ab9c02102001e01d01c135573aa00226ea8004d5d0a80119a805bae357426ae8940088c98c8068cd5ce00d80d00c09aba25001135744a00226aae7940044dd5000899aa800bae75a224464460046eac004c8004d5405888c8cccd55cf80112804119a8039991091980080180118031aab9d5002300535573ca00460086ae8800c05c4d5d080088910010910911980080200189119191999ab9a3370ea002900011a80398029aba135573ca00646666ae68cdc3a801240044a00e464c6402a66ae7005805404c0484d55cea80089baa0011212230020031122001232323333573466e1d400520062321222230040053007357426aae79400c8cccd5cd19b875002480108c848888c008014c024d5d09aab9e500423333573466e1d400d20022321222230010053007357426aae7940148cccd5cd19b875004480008c848888c00c014dd71aba135573ca00c464c6402666ae7005004c04404003c0384d55cea80089baa001232323333573466e1cd55cea80124000466442466002006004600a6ae854008dd69aba135744a004464c6401e66ae7004003c0344d55cf280089baa0012323333573466e1cd55cea800a400046eb8d5d09aab9e500223263200d33573801c01a01626ea80048c8c8c8c8c8cccd5cd19b8750014803084888888800c8cccd5cd19b875002480288488888880108cccd5cd19b875003480208cc8848888888cc004024020dd71aba15005375a6ae84d5d1280291999ab9a3370ea00890031199109111111198010048041bae35742a00e6eb8d5d09aba2500723333573466e1d40152004233221222222233006009008300c35742a0126eb8d5d09aba2500923333573466e1d40192002232122222223007008300d357426aae79402c8cccd5cd19b875007480008c848888888c014020c038d5d09aab9e500c23263201633573802e02c02802602402202001e01c26aae7540104d55cf280189aab9e5002135573ca00226ea80048c8c8c8c8cccd5cd19b875001480088ccc888488ccc00401401000cdd69aba15004375a6ae85400cdd69aba135744a00646666ae68cdc3a80124000464244600400660106ae84d55cf280311931900799ab9c01000f00d00c135573aa00626ae8940044d55cf280089baa001232323333573466e1d400520022321223001003375c6ae84d55cf280191999ab9a3370ea004900011909118010019bae357426aae7940108c98c8030cd5ce00680600500489aab9d50011375400224464646666ae68cdc3a800a40084244400246666ae68cdc3a8012400446424446006008600c6ae84d55cf280211999ab9a3370ea00690001091100111931900699ab9c00e00d00b00a009135573aa00226ea80048c8cccd5cd19b8750014800880148cccd5cd19b8750024800080148c98c8024cd5ce00500480380309aab9d37540022440042440024646666ae68cdc39aab9d5001480008c848c004008dd71aba135573ca004464c6400a66ae7001801400c4dd5000a4c24002921035054310011232300100122330033002002001333512223351223333002482030b5cbccd40112211cd6e54d72226594a0f16761e48ecbc2fc4a080eab2c18f2cf40ba2b6d0033500448811c24d58a9de7340637cf96c78f2567dfa151ddefe8cf500bfe9ba8284300500533500448811cd6e54d72226594a0f16761e48ecbc2fc4a080eab2c18f2cf40ba2b6d0033500448811cf79d8d829bea50137bca51bda1d96e0093a28774bbefb5474c7ff0c000500533500448810572616f756c00335004488106747361677565003350044881086e6f756d6564656d0033500448810469676f72005005222212333300100500400300220011122002122122330010040031200101"
};
const tontieAddress: Address = tontineApplication.utils.validatorToAddress(tontineScript);
console.log(tontieAddress);

let  utxosScript : UTxO[] = await tontineApplication.utxosAt(tontieAddress);


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

//Define type


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
    transactor:TransactorData,
    member:MemberData
});
type TontineDatumData = Data.Static<typeof TontineDatumData>;

//console.log(utxosScript);
const RedeemerData = Data.Object({
    operationType:OperationTypeData,
    for: Data.String
});
type RedeemerData = Data.Static<typeof RedeemerData>;
//utxosScript.push(utxos);
//const utxoScriptFilterd : Array<UTxO> = utxosScript.filter((xo:UTxO):boolean => {xo});

async function closeTontine(amount:bigint):Promise<TxHash>{

    const optype: OperationTypeData = {
        getOperationType: fromText("CLOSE")
    };

    const myredeemer: RedeemerData = {
        operationType: optype,
        for: fromText("Moi-meme")
    };
    const rdm: Redeemer = Data.to<RedeemerData>(myredeemer, RedeemerData);

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
    const datumData: Datum = Data.to<TontineDatumData>(datumTontine, TontineDatumData);

    //const openOperationType : OperationTypeData = {getOperationType: fromText("OPEN")};
    //const plutusVersionOperationType = Data.to<OperationTypeData>(openOperationType,OperationTypeData);

    //const filteredUtxos: UTxO[] = utxosScript.filter((x:UTxO)=>
        //(x.datum != null) || (x.datum == plutusVersionOperationType));
       // && (x.datum.operation != null)
        //&& x.datum.operation.getOperationType != openOperationType.getOperationType);

   // console.log("filteredUtxos: ");
    //console.log(filteredUtxos);
    //console.log(plutusVersionOperationType);
    const tx = await tontineApplication
        .newTx()
        .collectFrom(
            utxosScript,
            rdm
        )
        .attachSpendingValidator(tontineScript)
        .payToContract(
            tontieAddress,
            {inline : datumData},
            { lovelace: amount }
        )
        .complete({
            change:{
                address: addr
            }
        });
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash
}

console.log(utxosScript);

//console.log(typeof utxosScript);

console.log(await closeTontine(1200000n));
// 5820c5a113a072169e8f4258da6b548ddc79f8a3500a5def6076ebb2a85707297249
