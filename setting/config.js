const fs = require('fs')

/* #pengembang rissxd
youtube : https://youtube.com/@rissmdbotz

HAPUS WM INI DOSA BESAR LU NJIR 
TAMBAHIN NAMALU AJA KALO LU NGEMBANGIN
NIH SC

[ ! ] JANGAN DIJUAL ANJENG LU NGAK NGEHARGAIN GW NAMANYA
*/

// Setting Utama
// GANTI NOMOR OWNER JUGA DI START/LIB/DATABASE/OWNER.JSON
global.owner = "6283188798484" //owner number
global.namabot = "KAYNA"
global.ownername = "MADZ"
// Watermark
global.footer = "_MADZ-ORION_" //footer section
global.packname = "Sticker By"
global.author = "KAYNA A.I"

// Mode Bot
global.status = false //"self/public" section of the bot

// Saluran Whatsapp
global.idsaluran = "120363229775721572@newsletter"
global.namasaluran = "KAYNA by ©MADZ"

// Image
global.thumbnail = 'https://i.postimg.cc/Bvbq9S20/Picsart-24-10-15-18-30-54-377.jpg'

//database 
global.urldb = ''; // kosongin aja tapi kalo mau pake database mongo db isi url mongo
global.themeemoji = '🔥'
global.mess = {
ingroup: "It's not funny, this feature is only for groups💢",
admin: "not funny, only group admins use this feature💢",
owner: "Wow! You're not my owner🗣️",
premium: "you are not a premium user",
seller: "You don't have access as a seller yet",
wait: "please just wait ngab",
daftar: "kamu belum terdaftar\nsilahkan ketik .daftar nama.umur"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
