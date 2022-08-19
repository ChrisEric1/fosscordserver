const path = require("path");
const fs = require("fs");
const { env } = require("process");
const { execSync } = require("child_process");
const { argv, stdout, exit } = require("process");

const { execIn, getLines, parts } = require("./utils");

let lines = fs.readFileSync(path.join(__dirname, "..", "..", "util", "src","util","Rights.ts")).toString()
let lines2 = lines.split("\n");
let lines3 = lines2.filter(y=>y.includes(": BitFlag("));
let lines4 = lines3.map(x=>x.split("//")[0].trim())

function BitFlag(int) {
    return 1n << eval(`${int}n`);
}

let rights = []
let maxRights = 0n;
lines4.forEach(x=>{
    maxRights += eval(`rights.${x.replace(':'," = ").replace(",",";")}`)
})
//max rights...
console.log(`Maximum rights: ${maxRights}`);
//discord rights...
discordRights = maxRights;
discordRights -= rights.SEND_BACKDATED_EVENTS;
discordRights -= rights.MANAGE_GUILD_DIRECTORY;
discordRights -= rights.CREDITABLE;
discordRights -= rights.BYPASS_RATE_LIMITS;
discordRights -= rights.ADD_MEMBERS;
discordRights -= rights.MANAGE_RATE_LIMITS;
discordRights -= rights.OPERATOR;
console.log(`Discord-like rights: ${discordRights}`);

//1760002018 rights...
discordRights = maxRights;
discordRights -= rights.SEND_BACKDATED_EVENTS;
discordRights -= rights.MANAGE_GUILD_DIRECTORY;
discordRights -= rights.CREDITABLE;
discordRights -= rights.BYPASS_RATE_LIMITS;
discordRights -= rights.ADD_MEMBERS;
discordRights -= rights.MANAGE_RATE_LIMITS;
discordRights -= rights.OPERATOR;

//start 1760002018
discordRights -= rights.SELF_ADD_DISCOVERABLE;
discordRights -= rights.SELF_DELETE_DISABLE;
discordRights -= rights.DEBTABLE;
discordRights -= rights.POGGERS;
discordRights -= rights.SELF_EDIT_NAME;
//end 1760002018

console.log(`1760002018-like rights: ${discordRights}`);
