const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});
const prefix = "c.";
bot.on("ready", async () => {
  console.log("Online");
  bot.user.setActivity(`Segítségért írj nekem privát üzenetben!`,{type: "LISTENING"});
});
bot.on("message", async message => {
    if(message.author.bot) return;
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription(`${message.author.tag} üzenetet írt a botnak!`)
    .addField(`Üzenet:`, message.content, true)
    .addField(`ID-je:`, message.author.id, true)
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .addField(`Üzenet neki:`, `${prefix}vá [ID-je] [válasz]`, true)
    .setTimestamp();
    if(message.channel.type == "dm") {
      let bototletcsatorna = bot.channels.cache.find(channel => channel.id == "745759349376548904");
      bototletcsatorna.send("@here");
      bototletcsatorna.send(embed);
      message.author.send(`Üzeneted az Admin Team felé: **${message.content}**\nKérlek várj türelmesen, valaki hamarosan válaszolni fog!`);
    }
});
bot.on("message", async message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if(cmd == `${prefix}va` || cmd == `${prefix}vá` || cmd == `${prefix}valasz` ||cmd == `${prefix}válasz`) {
    if(!message.member.roles.cache.find(muterole => muterole.id === `748816135029391413`)) return message.channel.send(`<a:x_:736342460522823768> Nem tartozol az Admin Team-be!`);
    let user = bot.users.cache.find(user => user.id == `${args[0]}`);
    let szoveg = message.content.split(' ').slice(2).join(' ');
    if(!user) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek elküldjem az üzenetet! (**${prefix}vá [id] [szöveg]**)`);
    if(!szoveg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szöveget, amit elküldjek az adott felhasználónak! (**${prefix}vá [id] [szöveg]**)`);
    user.send(`Szia, **${message.author.tag}** válaszolt neked! Üzenete:\n**${szoveg}**`);
    message.channel.send(`<a:pipa:736339378372214915> Sikeresen elküldtem **${user.tag}**-nak/nek az üzenetet! Üzenet:\n**${szoveg}**`);
  }
});
bot.login(process.env.BOT_TOKEN);
