const Discord = require("discord.js");
const client = new Discord.Client();

const Discordlogs = require("discord-logs");

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

const config = require("./config.json");

var WelcomeChannel = 819754154796646430
var Action = 820062322542379019

client.on("guildBannerAdd", (guild, bannerURL) => {
  let actionchannel = client.channels.cache.get(Action)
  actionchannel.send(guild.name+" has a banner now!")
});

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

client.login(config.token);
