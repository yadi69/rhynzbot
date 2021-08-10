let pajak = 0.10
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let fail = `perintah ini buat ngasih uang ke pengguna lain\n\ncontoh:\n${usedPrefix + command} @6282261637676 10\natau balas pesan doi dengan perintah: ${usedPrefix + command} 10`
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.chat
    if (!who) {
        conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6282261637676@s.whatsapp.net'] } })
        throw false
    }
    if (typeof global.db.data.users[who] == "undefined") {
        global.db.data.users[who] = {
            exp: 0,
			uang:0,
            limit: 10,
            lastclaim: 0,
			lastgift: 0,
			lastmining: 0,
			lastgacha: 0,
            registered: false,
            name: conn.getName(m.sender),
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            banned: false,
            level: 0,
            call: 0,
            role: 'Bronze',
            autolevelup: false,
            pc: 0,
        }
    }
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) {
        conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6282261637676@s.whatsapp.net'] } })
        throw false
    }
    if (isNaN(txt)) throw 'Hanya angka'
    let duit = parseInt(txt)
    let uang = duit
    let pjk = Math.ceil(duit * pajak)
    uang += pjk
    if (uang < 1) throw 'minimal 1'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'uang tidak mencukupi untuk mentransfer, ada pajaknya juga'
    users[m.sender].uang -= uang
    users[who].uang += duit

    m.reply(`(${-duit} uang) + (${-pjk} uang (Pajak 2%)) = ( ${-uang} uang)`)
    conn.fakeReply(m.chat, `+${duit} uang`, who, m.text)
}
handler.help = ['gift']
handler.tags = ['xp','premium']
handler.command = /^gift$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false
handler.limit = false

module.exports = handler

