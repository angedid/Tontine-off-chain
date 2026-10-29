"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Blockfrost, Lucid } from "https://deno.land/x/lucid@0.10.6/mod.ts"; Deno
var lucid_cardano_1 = require("lucid-cardano"); // NPM
var seed_ts_1 = require("./seed.ts");
var lucid = await lucid_cardano_1.Lucid.new(new lucid_cardano_1.Blockfrost("https://cardano-preview.blockfrost.io/api/v0", "previewAPIKey"), "Preview");
lucid.selectWalletFromSeed(seed_ts_1.secretSeed);
var addr = await lucid.wallet.address();
console.log(addr);
