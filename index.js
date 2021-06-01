const Discord = require("discord.js");
const fs = require("fs")
const client = new Discord.Client();

const config = require("./config.json");
const color = require("./color.json")
const prefix = config.prefix;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
      client.user.setActivity('Valorant Community', { type: "WATCHING"})
});

client.on('guildMemberAdd', member => {
  member.roles.add(member.guild.roles.cache.get(config.member))
  console.log(member.user.username + "Joined")
  const welcomeEmbed = new Discord.MessageEmbed()
  .setColor(color.blue)
  .setTitle( member.user.username + "Welcome to Valorant Community")
  .setThumbnail(member.user.displayAvatarURL())

  const welcome = member.guild.channels.cache.get(config.welcomechannel)
  welcome.send(welcomeEmbed)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
 
/* LOAD COMMAND FILES */
fs.readdir('./commands/', (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if (jsfile.length <= 0) {
    console.log("[WARNING]: Command folder is empty, No files loaded!")
    return;
  }


  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`Command ${f}`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
  })

  setTimeout(function() {
  }, 1000)
})
    /* COMMANDS */

  client.on("message", async message => {

    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(commandName.slice(prefix.length)) || client.commands.get(client.aliases.get(commandName.slice(prefix.length)));
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (commandfile) commandfile.run(client, message, args);
  })

client.login(config.token);
