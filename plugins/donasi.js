let handler = async m => m.reply(`
┌〔 Donasi • Pulsa 〕
├ THREE [0895400244287]
└────

┌〔 Donasi • Emoney 〕
├ OVO, Dana, Gopay [082261637676]
└────

Dukung Rhynz hanya dengan membuka link dibawah ini, dan ikuti tujuannya
`.trim())
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
