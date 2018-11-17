client.on('guildMemberAdd', uye =&gt; {
  // Belirli bir kanala mesaj atması için kod. Buna göre "#gelen-giden" kanalına mesaj atacak:
  const channel = uye.guild.channels.find('name', 'gelen-giden');
  // Eğer kanal yoksa, hiçbir şey yapma:
  if (!channel) return;
  // Üyeyi etiketleyerek "#gelen-giden" kanalına mesaj at:
  channel.send(`Sunucuya hoş geldin, ${uye}`);
});