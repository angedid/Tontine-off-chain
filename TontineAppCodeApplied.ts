import {
    Lucid,
    Blockfrost,
    Address,
    MintingPolicy,
    PolicyId,
    UTxO,
    Unit,
    Datum,
    TxHash,
    Redeemer,
    fromText,
    Data,
    getAddressDetails,
    applyParamsToScript,
    SpendingValidator
} from "https://deno.land/x/lucid@0.9.1/mod.ts"
import { secretSeed } from "./seed.ts"

// set blockfrost endpoint
const lucid: Lucid = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewvu8DskOxmI7v8fdVawmZ6pfUorB2spJ6"
    ),
    "Preview"
);

// load local stored seed as a wallet into lucid
lucid.selectWalletFromSeed(secretSeed);
const addr: Address = await lucid.wallet.address();
console.log("own address: " + addr);

const tontineKeyHash: string = getAddressDetails(addr).paymentCredential?.hash || "";
console.log("own pubkey hash: " + tontineKeyHash);

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
    payPubKeyHash: [tontineKeyHash],
    openClosePubKeyHash: [tontineKeyHash],
    membres:[fromText("raoul"),fromText("ntet")]
}
console.log(parametre);
const matchingNumberScript: SpendingValidator = {
    type: "PlutusV2",
    script: applyParamsToScript<Params>(
        "590dad590daa010000323232323233223232323232323232332232332232323232323232323232323232323232323232322232323223232232325335323232323235005222350032350082235002253353302400101c153355335533533024004026103a13357389210d4d61757661697320446174756d00039153355008103a13357389211a566f7573206e276574657320706173207369676e617461697265000391039103a133573892012a546f6e74696e652064656a61206f7576657274652e20496d706f737369626c652064276f7576726972210003915335330240010261533553353302400401c150081039103a13357389212a546f6e74696e652064656a61204665726d65652e20496d706f737369626c65206465206665726d657221000391533533024001488107544f4e54494e45001533553353302400401c15335333573466e20cccd54c06c48005408488cdc000099980d1a801111100181381399aa980e8900091a800910009aa8049111111111110062400066e00ccc060d54024888888888888024094094d405c88880100e40e84ccd54c06c48004c8cd408c88ccd400c88008008004d40048800448cc004894cd400840f440040e8c090008d405c888800440e440e440e84cd5ce2481564d657263692064652076657269666965722071756520766f7573206176657a20737566666973616d656e7420646520666f6e64206f7520717565206c6120746f6e74696e65206573742064656a61206f757665727465000391533533024001488103504159001533553353302400402615335333573466e20cd54078c06c48004ccd54c08c48004894cd4cc06d402c0084cd40b8008004400540b4d405c888800d200203903a15335333573466e24d405c8888010ccc060d4d4d54cd4d402888d4008888888888888cccd4034940f8940f8940f88ccd54c0a84800540a48d4004894cd54cd4ccd5cd19b8f3500222002350042200204c04b1333573466e1cd400888004d40108800413012c412c4d410800c541040348448c00400858800488004888800c0940940e80e440e84cd5ce2491c4d696e696d756d20416d6f756e74206e6f74207265737065637465640003910391039103a1335738920134566f7573206e276176657a20706173206c65732064726f697473206465207061796572206c652062656e6566696369616972652100039133573892011b4572726f72203430342e20416374696f6e20696e636f6e6e7565210003915335333573466e20cd54058c04c48004ccd54c06c48004894cd4cc04d400c0084cd409800800440054094d403c88880092002031032103213357389201124d617576616973207369676e61746169726500031135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40b00b4d5d0a80619a8160169aba1500b33502c02e35742a014666aa060eb940bcd5d0a804999aa8183ae502f35742a01066a0580726ae85401cccd540c00e9d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd4111d69aba150023045357426ae8940088c98c8128cd5ce02582502409aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a8223ad35742a004608a6ae84d5d1280111931902519ab9c04b04a048135573ca00226ea8004d5d09aba2500223263204633573808e08c08826aae7940044dd50009aba1500533502c75c6ae854010ccd540c00d88004d5d0a801999aa8183ae200135742a00460706ae84d5d1280111931902119ab9c043042040135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a00860506ae84d5d1280211931901a19ab9c0350340323333573466e1cd55cea8032400046644246600200600460626ae854018dd71aba135744a00c464c6406666ae700d00cc0c4cccd5cd19b8735573aa012900011999110919980080200180118181aba1500932323333573466e1cd55cea800a40004642460020046eb8d5d09aab9e500223263203533573806c06a06626ea8004d5d0a804191919191999ab9a3370e6aae75400d2000233322212333001004003002375c6ae85400cdd71aba15002375c6ae84d5d1280111931901b99ab9c038037035135744a00226aae7940044dd50009aba135744a010464c6406466ae700cc0c80c040c44c98c80c4cd5ce24810350543500031135573ca00226ea80044d55cf280089baa001135744a00226aae7940044dd500091119191800802990009aa8159119a800a4000446a00444a66a666ae68cdc78010048160158980380089803001990009aa8151119a800a4000446a00444a66a666ae68cdc7801003815815080089803001911a801111111111111299a999aa980809000a8079299a999ab9a3371e01c00206005e26a04c0022a04a00842060205c266a01044a66a004420062002a02a640026aa0484422444a66a00226a012006442666a01800a6008004666aa600e2400200a0080029101044f50454e00320013550222211225335001150142213350153004002335530061200100400111223333550023233500722333500700300100235004001500522337000029001000a4000246a00244002246a00244004266a0024446006600400240022442466002006004640026aa0384422444a66a00220044426600a004666aa600e2400200a00800244666ae68cdc780100080c00ba44100488105434c4f5345001232230023758002640026aa032446666aae7c004940288cd4024c010d5d080118019aba2002019232323333573466e1cd55cea80124000466442466002006004601c6ae854008c014d5d09aba2500223263201933573803403202e26aae7940044dd50009191919191999ab9a3370e6aae75401120002333322221233330010050040030023232323333573466e1cd55cea80124000466442466002006004602e6ae854008cd403c058d5d09aba2500223263201e33573803e03c03826aae7940044dd50009aba150043335500875ca00e6ae85400cc8c8c8cccd5cd19b875001480108c84888c008010d5d09aab9e500323333573466e1d4009200223212223001004375c6ae84d55cf280211999ab9a3370ea00690001091100191931901019ab9c02102001e01d01c135573aa00226ea8004d5d0a80119a805bae357426ae8940088c98c8068cd5ce00d80d00c09aba25001135744a00226aae7940044dd5000899aa800bae75a224464460046eac004c8004d5405888c8cccd55cf80112804119a8039991091980080180118031aab9d5002300535573ca00460086ae8800c05c4d5d080088910010910911980080200189119191999ab9a3370ea002900011a80398029aba135573ca00646666ae68cdc3a801240044a00e464c6402a66ae7005805404c0484d55cea80089baa0011212230020031122001232323333573466e1d400520062321222230040053007357426aae79400c8cccd5cd19b875002480108c848888c008014c024d5d09aab9e500423333573466e1d400d20022321222230010053007357426aae7940148cccd5cd19b875004480008c848888c00c014dd71aba135573ca00c464c6402666ae7005004c04404003c0384d55cea80089baa001232323333573466e1cd55cea80124000466442466002006004600a6ae854008dd69aba135744a004464c6401e66ae7004003c0344d55cf280089baa0012323333573466e1cd55cea800a400046eb8d5d09aab9e500223263200d33573801c01a01626ea80048c8c8c8c8c8cccd5cd19b8750014803084888888800c8cccd5cd19b875002480288488888880108cccd5cd19b875003480208cc8848888888cc004024020dd71aba15005375a6ae84d5d1280291999ab9a3370ea00890031199109111111198010048041bae35742a00e6eb8d5d09aba2500723333573466e1d40152004233221222222233006009008300c35742a0126eb8d5d09aba2500923333573466e1d40192002232122222223007008300d357426aae79402c8cccd5cd19b875007480008c848888888c014020c038d5d09aab9e500c23263201633573802e02c02802602402202001e01c26aae7540104d55cf280189aab9e5002135573ca00226ea80048c8c8c8c8cccd5cd19b875001480088ccc888488ccc00401401000cdd69aba15004375a6ae85400cdd69aba135744a00646666ae68cdc3a80124000464244600400660106ae84d55cf280311931900799ab9c01000f00d00c135573aa00626ae8940044d55cf280089baa001232323333573466e1d400520022321223001003375c6ae84d55cf280191999ab9a3370ea004900011909118010019bae357426aae7940108c98c8030cd5ce00680600500489aab9d50011375400224464646666ae68cdc3a800a40084244400246666ae68cdc3a8012400446424446006008600c6ae84d55cf280211999ab9a3370ea00690001091100111931900699ab9c00e00d00b00a009135573aa00226ea80048c8cccd5cd19b8750014800880148cccd5cd19b8750024800080148c98c8024cd5ce00500480380309aab9d37540022440042440024646666ae68cdc39aab9d5001480008c848c004008dd71aba135573ca004464c6400a66ae7001801400c4dd5000a4c240029210350543100112323001001223300330020020011",
        [parametre],
        Params)
};
const tontineaddr: Address = lucid.utils.validatorToAddress(matchingNumberScript);
console.log(tontineaddr);

// liste des UTXOS de mon script
const utxosTontine: UTxO[] =  await lucid.utxosAt(tontineaddr);

//Here're my datums definitions
const OperationType = Data.Object({
    getOperationType: Data.String
});
type OperationType = Data.Static<typeof OperationType>;

const Transactor = Data.Object({
    name: Data.String
});
type Transactor = Data.Static<typeof Transactor>;

const Member = Data.Object({
    identifier: Data.String,
    mane: Data.String,
    phonenumber: Data.String,
});
type Member = Data.Static<typeof Member>;

const TontineDatum = Data.Object({
    operation: OperationType,
    transactor: Transactor,
    member: Member,
});
type TontineDatum = Data.Static<typeof TontineDatum>;

//Here're my Redeemers definitions
const RedeemerData = Data.Object({
    operationType: OperationType,
    for: Data.String,
});
type RedeemerData = Data.Static<typeof RedeemerData>;

const optClose: OperationType = {getOperationType: fromText("CLOSE")};
const optOpen: OperationType = {getOperationType: fromText("OPEN")};
const optTontine: OperationType = {getOperationType: fromText("TONTINE")};
const optPay: OperationType = {getOperationType: fromText("PAY")};

//Here're my redeemer
const redeemClose : RedeemerData = {operationType: optClose, for: fromText("TONTINE")};
const redeemOpen : RedeemerData = {operationType: optOpen, for: fromText("TONTINE")};
const redeemTontine : RedeemerData = {operationType: optTontine, for: fromText("raoul")};
const redeemPay : RedeemerData = {operationType: optPay, for: fromText("BENEFICIAIRE")};

const trans: Transactor = {name: fromText("raoul")};
const memb: Member = {identifier: fromText("ntet"), mane: fromText("ntet"), phonenumber: fromText("+237689009854")};

const datumTontineInit: TontineDatum = {operation: optClose, transactor: trans, member: memb};
const datumTontineClose: TontineDatum = {operation: optClose, transactor: trans, member: memb};
const datumTontineOpen: TontineDatum = {operation: optOpen, transactor: trans, member: memb};


//fonction pour initialiser la tontine
async function tontineInit(): Promise<TxHash> {
    const dtmIni: Datum = Data.to<TontineDatum>(datumTontineInit,TontineDatum);
    const tx = await lucid
        .newTx()
        .payToContract(tontineaddr,{inline: dtmIni},{lovelace: 1500000n},)
        .complete();

    const signedTx = await tx.sign().complete();
    return await signedTx.submit();
}

//fonction pour ouvrir la tontine

async function tontineOuvre(): Promise<TxHash> {
    const dtmOpen: Datum = Data.to<TontineDatum>(datumTontineOpen,TontineDatum);
    const dtmClose: Datum = Data.to<TontineDatum>(datumTontineClose,TontineDatum);
    const rdmOpen: Redeemer = Data.to<RedeemerData>(redeemOpen,RedeemerData);
    const utxosDatumClose: UTxO[] = utxosTontine.filter(utxo => utxo.datum == dtmClose);

    if (utxosDatumClose && utxosDatumClose.length > 0)
    {
        const tx = await lucid
            .newTx()
            .collectFrom(utxosDatumClose,rdmOpen)
            .attachSpendingValidator(matchingNumberScript)
            .addSignerKey(tontineKeyHash)
            .payToContract(tontineaddr,{inline: dtmOpen},{lovelace: 1500000n},)
            .complete();

        const signedTx = await tx.sign().complete();
        const txhash = await signedTx.submit();
        return txhash;
    }else{
        return "No UTXO found"
    }
}

//foncton pour fermer la tontine
async function tontineFerme(): Promise<TxHash> {
    const dtmClose: Datum = Data.to<TontineDatum>(datumTontineClose,TontineDatum);
    const dtmOpen: Datum = Data.to<TontineDatum>(datumTontineOpen,TontineDatum);
    const rdmClose: Redeemer = Data.to<RedeemerData>(redeemClose,RedeemerData);
    const utxosDatumOpen: UTxO[] = utxosTontine.filter(utxo => utxo.datum == dtmOpen);

    const tx = await lucid
        .newTx()
        .collectFrom(utxosDatumOpen,rdmClose)
        .attachSpendingValidator(matchingNumberScript)
        .addSignerKey(tontineKeyHash)
        .payToContract(tontineaddr,{inline: dtmClose},{lovelace: 1500000n},)
        .complete();

    const signedTx = await tx.sign().complete();
    const txhash = await signedTx.submit();
    return txhash;
}

//fonction pour tontiner
async function tontineTontiner(amount: bigint): Promise<TxHash> {
    const dtmTontine: Datum = Data.to<TontineDatum>(datumTontineClose,TontineDatum);
    const dtmOpen: Datum = Data.to<TontineDatum>(datumTontineOpen,TontineDatum);
    const rdmTontine: Redeemer = Data.to<RedeemerData>(redeemTontine,RedeemerData);
    const utxosDatumTontine: UTxO[] = utxosTontine.filter(utxo => utxo.datum == dtmOpen);

    const tx = await lucid
        .newTx()
        .collectFrom(utxosDatumTontine,rdmTontine)
        .attachSpendingValidator(matchingNumberScript)
        .payToContract(tontineaddr,{inline: dtmTontine},{lovelace: amount},)
        .payToContract(tontineaddr,{inline: dtmOpen}, {lovelace: 1500000n},)
        .complete();

    const signedTx = await tx.sign().complete();
    const txhash = await signedTx.submit();
    return txhash;
}

// fonction pour payer le beneficiaire de la tontine
async function tontinePay(beneficiaire: string): Promise<TxHash> {
    const dtmClose: Datum = Data.to<TontineDatum>(datumTontineClose,TontineDatum);
    const rdmPay: Redeemer = Data.to<RedeemerData>(redeemPay,RedeemerData);
    const utxosDatumPay: UTxO[] = utxosTontine.filter(utxo => utxo.datum == dtmClose);
    let amount : bigint = BigInt(0);
    for (let i = 0; i<utxosDatumPay.length; i++ )
        amount += utxosDatumPay[i].assets.lovelace.valueOf();
    const tx = await lucid
        .newTx()
        .collectFrom(utxosDatumPay,rdmPay)
        .attachSpendingValidator(matchingNumberScript)
        .addSignerKey(tontineKeyHash)
        .payToAddress(beneficiaire, {lovelace: amount},)
        .complete();

    const signedTx = await tx.sign().complete();
    const txhash = await signedTx.submit();
    return txhash;
}

//console.log(tontineInit());
console.log(tontineOuvre());
//console.log(tontineFerme());
//console.log(tontineTontiner(200000000n));
//console.log(tontinePay("addr_test1qrfvl09vznmcqth7mdrvhlvj8rwyx4x22k7kgs7st7e9cmgeswxsf9fae0wj4e3st46hung22dfgaqytuw78z5el86cqrxs0d8"));

//console.log(utxosTontine);