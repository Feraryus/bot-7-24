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
  log(`${files.length} komut y�klenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Y�klenen komut: ${props.help.name}.`);
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
			msg.author.sendMessage('AS Ho�geldin'); 
		} else {
		msg.reply('AS Ho�geldin');
		}
	}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espriyap") {
    var sans = ["Ge�en g�n ge�mi� g�nlerimi arad�m ama me�guld�.", "Ya�mur ya�m�� kar peynir", "D�nya d�nermi� ay da k�fte�", "Bu erikson ba�ka erik yok.", "Y�kanan Ton a ne denir Washington", "Hadi oyun oynayal�m. Vazge�tim oymadan oynayal�m!", "Ge�en g�n kamyonu s�rd�m Leonardo da Vinci.", "Do�umdan sonra �ok kilo ald�m. Do�du�umda 2 kiloydum �imdi 62.", "Adam 7 g�n boyunca nezle olmu�. S�k�lm�� bug�n de Petek le olay�m demi�.", "Yarasa yararl� bir hayvand�r. Yararl� bir hayvan olmasayd� yaramasa derlerdi.", " Benim neden karde�im yok baba  Seni g�r�nce ikincisine cesaret edemedik.", "Osmanl�da kimseye bor� takam�yordun mesela sikke sikke �d�yodun�", "Tatl� yiyip, tatl� konu�uluyorsa bundan sonra mant� yiyip mant�kl� konu�aca��z.", "Babam� sahura kald�rmay� unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde k�za elin nas�l dedim. Ojeli dedi. Ben �oka girdim. O Migrosa.", "Can�m s�kk�n kanka sonra gel", "Can bedenden ��kmazsa nolur? \n+Matamatik dersine ge� kal�r.", "Adam�n biri televizyona ��km�� indirememi�ler.", "Bir roman� 7 k�z yazarsa nolur? \n-  seven k�z�n roman�."];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    return message.channel.send(sonuc);
}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "yaz�-tura") {
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
      .setDescription('Yaz�.')
      .setThumbnail('https://i.imgur.com/54JPj7Z.jpg')
      message.channel.send(embed);
    }
}});

client.on("message", msg => {
 
 
  db.fetchObject(`kufur_${msg.guild.id}`).then(i => {
    if (i.text == 'acik') {
        const kufur = ["o�", "amk", "anan� sikiyim", "anan�skm", "", "amk", "amsk", "sikim", "sikiyim", "", " kurusu", "kahpe", "", "mal", "sik", "", "am", "", "am�k", "", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('K�f�r etmemelisin! :warning:').then(msg => msg.delete(3000));
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
    const kanal = member.guild.channels.find('name', 'giri�-��k��')

    var embed = new Discord.RichEmbed()
      .setColor('#00FF00')
      .setAuthor(member.user.tag + ' Sunucuya giri� yapt�', member.user.displayAvatarURL)
      .setDescription(`:) Sunucumuza ho�geldin ${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL)
      return kanal.send(embed);
});

client.on('guildMemberRemove', member => {
    const kanal = member.guild.channels.find('name', 'giri�-��k��')

    var embed = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setAuthor(member.user.tag + '  Sunucudan ��k�� yapt�', member.user.displayAvatarURL)
      .setDescription(`?? G�r���r�z ${member.user.tag} ?? `)
      .setThumbnail(member.user.displayAvatarURL)
      return kanal.send(embed);
});

client.on('message', async message => {
  if (message.content.toLowerCase() === prefix + 'd�viz') {
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
      .setFooter(`${message.author.username} taraf�ndan istendi.`, message.author.avatarURL)
      .addField(" D�viz", `** Dolar: **${info.buying} TL\n** Euro: **${euro.buying} TL`)
    
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
  let joinRole = guild.roles.find('name', '�ye');
  member.addRole(joinRole);

  const channel = member.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(' | Sunucuya kat�ld�!')
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
  .setTitle(' | Sunucudan ayr�ld�')
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