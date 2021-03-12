const Discord = require("discord.js");
const client = new Discord.Client();

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

const config = require("./config.json");
//const help = new Discord.MessageEmbed()
//  .setColor('#0099ff')
//  .setTitle('Help Command')
//  .setDescription('This bot is in BETA. Valorant Manager controls the private VC function. This bot will have more functions soon.')
//  .setTimestamp()
//  .setFooter('This bot was coded by Darkknight#3011');

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
      client.user.setActivity('Valorant Commuity', { type: "WATCHING"})
  });

tempChannels.registerChannel("819685336598577172", {
    childCategory: "819383472644423691",
    childAutoDeleteIfEmpty: true,
    childAutoDeleteIfOwnerLeaves: true,
    childMaxUsers: 5,
    childBitrate: 64000,
    childFormat: (member, count) => `#${count} | ${member.user.username}'s VC`
});

client.login(config.token);