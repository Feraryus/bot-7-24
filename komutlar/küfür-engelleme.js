const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send('aç yada kapat yazmalısın! Örnek: küfür-engel aç')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
 
  if (args[0] == 'aç') {
    db.updateText(`kufur_${message.guild.id}`, 'acik').then(i => {
      message.channel.send(':white_check_mark: Küfur Engel başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların küfürü engellenmicektir.')
    })
  }
  if (args[0] == 'kapat') {
    db.updateText(`kufur_${message.guild.id}`, 'kapali').then(i => {
      message.channel.send(':white_check_mark: Küfür Engel başarıyla kapatıldı! Artık herkes küfür yazabilir.')
    })
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfür'],
  permLevel: 0
};

exports.help = {
  name: 'küfür-engelleme',
  description: '[Admin Komutu]',
  usage: 'küfür-engelleme'
};