const free = 5000
const prem = 10000
let handler = async (m, { isPrems }) => {
  let user = global.db.data.users[m.sender]
  let time = user.lastmining + 86400000
  if (new Date - user.lastmining < 86400000) throw `Kamu sudah menambang hari ini\ntunggu selama ${msToTime(time - new Date())} lagi`
  user.exp += isPrems ? prem * user.level : free * user.level
  m.reply(`+${isPrems ? prem * user.level : free * user.level} XP\n\nsemakin tinggi level, semakin tinggi juga uang yang didapat`)
  user.lastmining = new Date * 1
  
}
handler.help = ['mining']
handler.tags = ['xp']
handler.command = /^mining$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false
handler.limit = false
handler.uang = 0

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit"
}