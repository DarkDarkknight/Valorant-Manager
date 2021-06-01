const Discord = require("discord.js");
const client = new Discord.Client();

const Discordlogs = require("discord-logs");

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

const config = require("./config.json");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
      client.user.setActivity('Valorant Community', { type: "WATCHING"})
});

tempChannels.registerChannel("819685336598577172", {
    childCategory: "819383472644423691",
    childAutoDeleteIfEmpty: true,
    childAutoDeleteIfOwnerLeaves: true,
    childMaxUsers: 5,
    childBitrate: 64000,
    childFormat: (member, count) => `#${count} | ${member.user.username}'s VC`
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
