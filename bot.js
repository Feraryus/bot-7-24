const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('AS Hoþgeldin'); 
		} else {
		msg.reply('AS Hoþgeldin');
		}
	}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espriyap") {
    var sans = ["Geçen gün geçmiþ günlerimi aradým ama meþguldü.", "Yaðmur yaðmýþ kar peynir", "Dünya dönermiþ ay da köfte…", "Bu erikson baþka erik yok.", "Yýkanan Ton a ne denir Washington", "Hadi oyun oynayalým. Vazgeçtim oymadan oynayalým!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doðumdan sonra çok kilo aldým. Doðduðumda 2 kiloydum þimdi 62.", "Adam 7 gün boyunca nezle olmuþ. Sýkýlmýþ bugün de Petek le olayým demiþ.", "Yarasa yararlý bir hayvandýr. Yararlý bir hayvan olmasaydý yaramasa derlerdi.", " Benim neden kardeþim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlýda kimseye borç takamýyordun mesela sikke sikke ödüyodun…", "Tatlý yiyip, tatlý konuþuluyorsa bundan sonra mantý yiyip mantýklý konuþacaðýz.", "Babamý sahura kaldýrmayý unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kýza elin nasýl dedim. Ojeli dedi. Ben Þoka girdim. O Migrosa.", "Caným sýkkýn kanka sonra gel", "Can bedenden çýkmazsa nolur? \n+Matamatik dersine geç kalýr.", "Adamýn biri televizyona çýkmýþ indirememiþler.", "Bir romaný 7 kýz yazarsa nolur? \n-  seven kýzýn romaný."];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    return message.channel.send(sonuc);
}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "yazý-tura") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('')
      .setDescription('Tura.')
      .setThumbnail('https://i.imgur.com/iUaWmhg.jpg')
      message.channel.send(embed);
    } else if (result == 2) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('')
      .setDescription('Yazý.')
      .setThumbnail('https://i.imgur.com/54JPj7Z.jpg')
      message.channel.send(embed);
    }
}});

client.on("message", msg => {
 
 
  db.fetchObject(`kufur_${msg.guild.id}`).then(i => {
    if (i.text == 'acik') {
        const kufur = ["oç", "amk", "ananý sikiyim", "ananýskm", "", "amk", "amsk", "sikim", "sikiyim", "", " kurusu", "kahpe", "", "mal", "sik", "", "am", "", "amýk", "", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Küfür etmemelisin! :warning:').then(msg => msg.delete(3000));
            }             
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i.text == 'kapali') {
      
    }
    if (!i.text) return;
  })
    });

client.on('guildMemberAdd', member => {
    const kanal = member.guild.channels.find('name', 'giriþ-çýkýþ')

    var embed = new Discord.RichEmbed()
      .setColor('#00FF00')
      .setAuthor(member.user.tag + ' Sunucuya giriþ yaptý', member.user.displayAvatarURL)
      .setDescription(`:) Sunucumuza hoþgeldin ${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL)
      return kanal.send(embed);
});

client.on('guildMemberRemove', member => {
    const kanal = member.guild.channels.find('name', 'giriþ-çýkýþ')

    var embed = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setAuthor(member.user.tag + '  Sunucudan çýkýþ yaptý', member.user.displayAvatarURL)
      .setDescription(`?? Görüþürüz ${member.user.tag} ?? `)
      .setThumbnail(member.user.displayAvatarURL)
      return kanal.send(embed);
});

client.on('message', async message => {
  if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) {
      var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) {
      var euro = JSON.parse(body);

      let doviz = new Discord.RichEmbed()
  .setColor("#36393F")
      .setFooter(`${message.author.username} tarafýndan istendi.`, message.author.avatarURL)
      .addField(" Döviz", `** Dolar: **${info.buying} TL\n** Euro: **${euro.buying} TL`)
    
      message.channel.send(doviz);
}
})
  }
})
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 0;
  if (message.author.id === ayarlar.sahip) permlvl = 0;
  return permlvl;
};

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Üye');
  member.addRole(joinRole);

  const channel = member.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(' | Sunucuya katýldý!')
  .setTimestamp()
  channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(' | Sunucudan ayrýldý')
  .setTimestamp()
  channel.sendEmbed(embed);
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(ayarlar.token);