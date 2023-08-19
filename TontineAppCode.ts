import {
    Lucid,
    Blockfrost,
    Address,
    UTxO,
    AddressDetails,
    Datum,
    TxHash,
    Redeemer,
    fromText,
    Data,
    applyParamsToScript, SpendingValidator
} from "https://deno.land/x/lucid@0.9.1/mod.ts"
import { secretSeed} from "./seed.ts";
const tontineApplication = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewAiQH6B0Rcvef02CHU5T3x74QgLysWKbj"
    ), "Preview",
);

// Associer un porte-monnaie electronique
tontineApplication.selectWalletFromSeed(secretSeed);
const applicationWalletAddress = await tontineApplication.wallet.address();
const applicationAddressDetails : AddressDetails = tontineApplication.utils.getAddressDetails(applicationWalletAddress);

const applicationWalletPaymentKeyHash = applicationAddressDetails.paymentCredential.hash
//Creation du script de la tontine

// Define the tontine plutus script

//Here i define my Params
const ParamsData = Data.Object({
    minimumAmount: Data.BigInt,
    payPubKeyHash: [Data.String],
    openClosePubKeyHash: [Data.String],
    membres: [Data.String]
});
type ParamsData = Data.Static<typeof ParamsData>;

const Params = Data.Tuple([ParamsData]);
type Params = Data.Static<typeof Params>;

const parametre: ParamsData = {
    minimumAmount: 300000000n,
    payPubKeyHash: [applicationWalletPaymentKeyHash],
    openClosePubKeyHash: [applicationWalletPaymentKeyHash],
    membres:[fromText("raoul"),fromText("igor")]
}
console.log(parametre);

const tontineScript: SpendingValidator = {
    type: "PlutusV2",
    script: applyParamsToScript<Params>(
        "590e10590e0d0100003232323232332232323232323232323322323322323232323232323232323232323232323232323223232323223232322323223232533532323232323235005222350032350082235002253353302900102115335533553353302900402b103f13357389210d4d61757661697320446174756d0003e153355008103f13357389211a566f7573206e276574657320706173207369676e6174616972650003e103e103f133573892012a546f6e74696e652064656a61206f7576657274652e20496d706f737369626c652064276f7576726972210003e153353302900102b1533553353302900402115008103e103f13357389212a546f6e74696e652064656a61204665726d65652e20496d706f737369626c65206465206665726d6572210003e1533533029001488107544f4e54494e45001533553353302900402115335333573466e20cccd54c08048005409888cdc000099980f9a801111100181601619aa98110900091a800910009aa8049111111111110062400066e00ccc074d540248888888888880240a80a8d403488880100f80fc4ccd54c08048004c8cd40a088ccd400c88008008004d40048800448cc004894cd4008410840040fcc0a4008d4034888800440f840f840fc4cd5ce2481564d657263692064652076657269666965722071756520766f7573206176657a20737566666973616d656e7420646520666f6e64206f7520717565206c6120746f6e74696e65206573742064656a61206f7576657274650003e1533533029001488103504159001533553353302900402b15335333573466e20cd5408cc08048004ccd54c0a048004894cd4cc081402c0084cd40cc008004400540c8d4034888800d200203e03f15335333573466e24d40348888010ccc074d4d4d54cd4d402888d4008888888888888cccd40349410c9410c9410c8ccd54c0bc4800540b88d4004894cd54cd4ccd5cd19b8f350022200235004220020510501333573466e1cd400888004d40108800414414041404d411c00c541180348448c00400858800488004888800c0a80a80fc0f840fc4cd5ce2491c4d696e696d756d20416d6f756e74206e6f74207265737065637465640003e103e103e103f1335738920134566f7573206e276176657a20706173206c65732064726f697473206465207061796572206c652062656e656669636961697265210003e133573892011b4572726f72203430342e20416374696f6e20696e636f6e6e7565210003e15335333573466e20cd5406cc06048004ccd54c08048004894cd4cc061400c0084cd40ac008004400540a8d401488880092002036037103713357389201124d617576616973207369676e61746169726500036135001220023333573466e1cd55cea802a4000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40c40c8d5d0a80619a8188191aba1500b33503103335742a014666aa06aeb940d0d5d0a804999aa81abae503435742a01066a06207c6ae85401cccd540d40fdd69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd4125d69aba15002304a357426ae8940088c98c813ccd5ce02802782689aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a824bad35742a00460946ae84d5d1280111931902799ab9c05004f04d135573ca00226ea8004d5d09aba2500223263204b33573809809609226aae7940044dd50009aba1500533503175c6ae854010ccd540d40ec8004d5d0a801999aa81abae200135742a004607a6ae84d5d1280111931902399ab9c048047045135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a00a605a6ae84d5d1280291931901c99ab9c03a0390373333573466e1cd55cea803a4000466442466002006004606c6ae85401cdd71aba135744a00e464c6407066ae700e40e00d8cccd5cd19b8735573aa0149000119991109199800802001801181a9aba1500a32323333573466e1cd55cea800a40004642460020046eb8d5d09aab9e500223263203a33573807607407026ea8004d5d0a804991919191999ab9a3370e6aae75400d2000233322212333001004003002375c6ae85400cdd71aba15002375c6ae84d5d1280111931901e19ab9c03d03c03a135744a00226aae7940044dd50009aba135744a012464c6406e66ae700e00dc0d4cccd5cd19b8735573aa01c90001199991110919998008028020018011bad35742a01c66a040eb8d5d0a80699a8103ae35742a01866a040eb8d5d09aba2500c23263203633573806e06c068206a264c6406a66ae712410350543500035135573ca00226ea80044d55cf280089baa001135744a00226aae7940044dd500089aba25001135744a00226aae7940044dd500091119191800802990009aa8159119a800a4000446a00444a66a666ae68cdc78010048160158980380089803001990009aa8151119a800a4000446a00444a66a666ae68cdc7801003815815080089803001911a801111111111111299a999aa980809000a8079299a999ab9a3371e01c00206005e26a04c0022a04a00842060205c266a01044a66a004420062002a02a640026aa0484422444a66a00226a012006442666a01800a6008004666aa600e2400200a0080029101044f50454e00320013550222211225335001150142213350153004002335530061200100400111223333550023233500722333500700300100235004001500522337000029001000a4000246a00244002246a00244004266a0024446006600400240022442466002006004640026aa0384422444a66a00220044426600a004666aa600e2400200a00800244666ae68cdc780100080c00ba44100488105434c4f5345001232230023758002640026aa032446666aae7c004940288cd4024c010d5d080118019aba2002019232323333573466e1cd55cea80124000466442466002006004601c6ae854008c014d5d09aba2500223263201933573803403202e26aae7940044dd50009191919191999ab9a3370e6aae75401120002333322221233330010050040030023232323333573466e1cd55cea80124000466442466002006004602e6ae854008cd403c058d5d09aba2500223263201e33573803e03c03826aae7940044dd50009aba150043335500875ca00e6ae85400cc8c8c8cccd5cd19b875001480108c84888c008010d5d09aab9e500323333573466e1d4009200223212223001004375c6ae84d55cf280211999ab9a3370ea00690001091100191931901019ab9c02102001e01d01c135573aa00226ea8004d5d0a80119a805bae357426ae8940088c98c8068cd5ce00d80d00c09aba25001135744a00226aae7940044dd5000899aa800bae75a224464460046eac004c8004d5405888c8cccd55cf80112804119a8039991091980080180118031aab9d5002300535573ca00460086ae8800c05c4d5d080088910010910911980080200189119191999ab9a3370ea002900011a80398029aba135573ca00646666ae68cdc3a801240044a00e464c6402a66ae7005805404c0484d55cea80089baa0011212230020031122001232323333573466e1d400520062321222230040053007357426aae79400c8cccd5cd19b875002480108c848888c008014c024d5d09aab9e500423333573466e1d400d20022321222230010053007357426aae7940148cccd5cd19b875004480008c848888c00c014dd71aba135573ca00c464c6402666ae7005004c04404003c0384d55cea80089baa001232323333573466e1cd55cea80124000466442466002006004600a6ae854008dd69aba135744a004464c6401e66ae7004003c0344d55cf280089baa0012323333573466e1cd55cea800a400046eb8d5d09aab9e500223263200d33573801c01a01626ea80048c8c8c8c8c8cccd5cd19b8750014803084888888800c8cccd5cd19b875002480288488888880108cccd5cd19b875003480208cc8848888888cc004024020dd71aba15005375a6ae84d5d1280291999ab9a3370ea00890031199109111111198010048041bae35742a00e6eb8d5d09aba2500723333573466e1d40152004233221222222233006009008300c35742a0126eb8d5d09aba2500923333573466e1d40192002232122222223007008300d357426aae79402c8cccd5cd19b875007480008c848888888c014020c038d5d09aab9e500c23263201633573802e02c02802602402202001e01c26aae7540104d55cf280189aab9e5002135573ca00226ea80048c8c8c8c8cccd5cd19b875001480088ccc888488ccc00401401000cdd69aba15004375a6ae85400cdd69aba135744a00646666ae68cdc3a80124000464244600400660106ae84d55cf280311931900799ab9c01000f00d00c135573aa00626ae8940044d55cf280089baa001232323333573466e1d400520022321223001003375c6ae84d55cf280191999ab9a3370ea004900011909118010019bae357426aae7940108c98c8030cd5ce00680600500489aab9d50011375400224464646666ae68cdc3a800a40084244400246666ae68cdc3a8012400446424446006008600c6ae84d55cf280211999ab9a3370ea00690001091100111931900699ab9c00e00d00b00a009135573aa00226ea80048c8cccd5cd19b8750014800880148cccd5cd19b8750024800080148c98c8024cd5ce00500480380309aab9d37540022440042440024646666ae68cdc39aab9d5001480008c848c004008dd71aba135573ca004464c6400a66ae7001801400c4dd5000a4c240029210350543100112323001001223300330020020011",
        [parametre],
        Params
    )
};

const tontineAddress: Address = tontineApplication.utils.validatorToAddress(tontineScript);
console.log(tontineAddress);

// define a function that converts a string to hex


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

const RedeemerData = Data.Object({
    operationType:OperationTypeData,
    for: Data.String
});
type RedeemerData = Data.Static<typeof RedeemerData>;

// Data construction

const openOptype: OperationTypeData = {
    getOperationType: fromText("OPEN")
};

const closeOptype: OperationTypeData = {
    getOperationType: fromText("CLOSE")
};

const tontinerOptype: OperationTypeData = {
    getOperationType: fromText("TONTINE")
};

const payerOptype: OperationTypeData = {
    getOperationType: fromText("PAY")
};

const openRedeemer: RedeemerData = {
    operationType: openOptype,
    for: fromText("OPEN")
};

const closeRedeemer: RedeemerData = {
    operationType: closeOptype,
    for: fromText("CLOSE")
};

const tontinerRedeemer: RedeemerData = {
    operationType: tontinerOptype,
    for: fromText("raoul")
};

const payRedeemer: RedeemerData = {
    operationType: payerOptype,
    for: fromText("BENEFICIAIRE")
};

const closeDatum : TontineDatumData ={
    operation: closeOptype,
    transactor: {name:fromText("SECRETAIRE")},
    member: {
        identifier:fromText("a1e347fbc98"),
        mane:fromText("NKALLA EHAWE"),
        phonenumber:fromText("+237691179158")
    }
} ;

const openDatum : TontineDatumData ={
    operation: openOptype,
    transactor: {name:fromText("SECRETAIRE")},
    member: {
        identifier:fromText("a1e347fbc98"),
        mane:fromText("NKALLA EHAWE"),
        phonenumber:fromText("+237691179158")
    }
} ;

async function initilizeTontine(): Promise<TxHash>{
    const aCloseDatum : Datum = Data.to<TontineDatumData>(closeDatum, TontineDatumData);
    const tx = await tontineApplication
        .newTx()
        .payToContract(tontineAddress, { inline: aCloseDatum }, { lovelace: 1500000n})
        .complete();
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash
}

async function openTontine():Promise<TxHash>{
    const aCloseDatum : Datum = Data.to<TontineDatumData>(closeDatum, TontineDatumData);
    const aOpenDatum : Datum = Data.to<TontineDatumData>(openDatum, TontineDatumData);
    const aOpenRedeemmer: Redeemer = Data.to<RedeemerData>(openRedeemer, RedeemerData);
    const utxoAtScript: UTxO[] = await tontineApplication.utxosAt(tontineAddress);
    const filteredUtxo: UTxO[] = utxoAtScript.filter((utxo)=>utxo.datum == aCloseDatum);

    if (filteredUtxo && filteredUtxo.length > 0){
        const tx = await tontineApplication
            .newTx()
            .collectFrom(
                filteredUtxo,
                aOpenRedeemmer
            )
            .attachSpendingValidator(tontineScript)
            .payToContract(
                tontineAddress,
                {inline : aOpenDatum},
                { lovelace: 1500000n }
            )
            .addSignerKey(applicationWalletPaymentKeyHash)
            .complete({
                change:{
                    address: applicationWalletAddress
                }
            });
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash
    }else return "No UTxO's found that can be used to open tontine";
}

// @ts-ignore
async function closeTontine():Promise<TxHash>{
    const aCloseRedeemer: Redeemer = Data.to<RedeemerData>(closeRedeemer, RedeemerData);
    const aCloseDatum : Datum = Data.to<TontineDatumData>(closeDatum, TontineDatumData);
    const aOpenDatum : Datum = Data.to<TontineDatumData>(openDatum, TontineDatumData);
    const utxoAtScript: UTxO[] = await tontineApplication.utxosAt(tontineAddress);
    const filteredUtxo: UTxO[] = utxoAtScript.filter((utxo)=>utxo.datum == aOpenDatum);

    //const aOpenRedeemmer: Redeemer = Data.to<RedeemerData>(openRedeemer, RedeemerData);

    if (filteredUtxo && filteredUtxo.length > 0){
        const tx = await tontineApplication
            .newTx()
            .collectFrom(
                filteredUtxo,
                aCloseRedeemer
            )
            .attachSpendingValidator(tontineScript)
            .payToContract(
                tontineAddress,
                {inline : aCloseDatum},
                { lovelace: 1500000n }
            )
            .addSignerKey(applicationWalletPaymentKeyHash)
            .complete({
                change:{
                    address: applicationWalletAddress
                }
            });
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash
    }else return "No UTxO's found that can be used to close tontine";
}


// @ts-ignore
async function tontiner(amount:BigInt):Promise<TxHash>{
    const aTontinerRedeemer: Redeemer = Data.to<RedeemerData>(tontinerRedeemer, RedeemerData);
    const aCloseDatum : Datum = Data.to<TontineDatumData>(closeDatum, TontineDatumData);
    const aOpenDatum : Datum = Data.to<TontineDatumData>(openDatum, TontineDatumData);

    const utxoAtScript: UTxO[] = await tontineApplication.utxosAt(tontineAddress);
    const filteredUtxo: UTxO[] = utxoAtScript.filter((utxo)=>utxo.datum == aOpenDatum);
    //const filteredUtxo100: UTxO[] = utxoAtScript.filter((utxo)=>utxo.assets.lovelace.valueOf() == 100000000n);

    //const aOpenRedeemmer: Redeemer = Data.to<RedeemerData>(openRedeemer, RedeemerData);
    //filteredUtxo.push(filteredUtxo100);
    console.log(filteredUtxo);
    if (filteredUtxo && filteredUtxo.length > 0){
        const tx = await tontineApplication
            .newTx()
            .collectFrom(
                filteredUtxo,
                aTontinerRedeemer
            )
            .attachSpendingValidator(tontineScript)
            .payToContract(
                tontineAddress,
                {inline : aOpenDatum},
                { lovelace: 1500000n }
            )
            .payToContract(
                tontineAddress,
                {inline : aCloseDatum},
                { lovelace: amount }
            )
            //.addSignerKey(applicationWalletPaymentKeyHash)
            .complete({
                change:{
                    address: applicationWalletAddress
                }
            });
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash
    }else return "No UTxO's found that can be used to titiner tontine";
}


async function payer(beneficiaryAddress:Address):Promise<TxHash>{
    const aPayerRedeemer: Redeemer = Data.to<RedeemerData>(payRedeemer, RedeemerData);
    const aCloseDatum : Datum = Data.to<TontineDatumData>(closeDatum, TontineDatumData);
    //const aOpenDatum : Datum = Data.to<TontineDatumData>(openDatum, TontineDatumData);
    const utxoAtScript: UTxO[] = await tontineApplication.utxosAt(tontineAddress);
    const filteredUtxo: UTxO[] = utxoAtScript.filter((utxo)=>utxo.datum == aCloseDatum && utxo.assets.lovelace.valueOf() == 200000000n);
    //const aOpenRedeemmer: Redeemer = Data.to<RedeemerData>(openRedeemer, RedeemerData);

    if (filteredUtxo && filteredUtxo.length > 0){
        let amount:BigInt = BigInt(0);
        for (var i = 0; i<filteredUtxo.length; i++)
            amount = amount + filteredUtxo[i].assets.lovelace.valueOf();
        //amount += 100000000;//amount += filteredUtxo[i].assets.lovelace;
        const tx = await tontineApplication
            .newTx()
            .collectFrom(
                filteredUtxo,
                aPayerRedeemer
            )
            .attachSpendingValidator(tontineScript)
            .payToAddress(
                beneficiaryAddress,
                //{inline : aOpenDatum},
                { lovelace: amount }
            )
            .addSignerKey(applicationWalletPaymentKeyHash)
            .attachMetadata(1, { msg: "Nous associons nos benediction et celles de nos ancetres."})
            .complete({
                change:{
                    address: applicationWalletAddress
                }
            });
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash
    }else return "No UTxO's found that can be used to titiner tontine";
}

//console.log(await initilizeTontine());
//console.log(await openTontine());
//console.log(await closeTontine());
console.log(await tontiner(300000000n));
//addr_test1vp5mucfd6c2zt7xjwu9kh4v60u9axherz04l6wvu4mtxgccjykncw
//console.log(await payer("addr_test1vp7qvzv9qnnqtcjhz7wcdz3th898csetqaerl56whwkl0xg5dpcxs"));

