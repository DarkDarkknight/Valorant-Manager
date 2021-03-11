const Discord = require("discord.js");
const client = new Discord.Client();

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

// Register a new main channel
tempChannels.registerChannel("819685336598577172", {
    childCategory: "819383472644423691",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 5,
    childFormat: (member, count) => `#${count} | ${member.user.username}'s lounge`
});

client.login("NzU5MjE2NDE4MjY0NDQ5MDM0.X26RYw.1wYyMtruXoseEtsQIUOYUR58TXA")