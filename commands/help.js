const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json")

module.exports.run = async (client, message, args) => {

    const memberhelp = new Discord.MessageEmbed()
    .setTitle(" **Commands** ")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .addField(prefix + "clip", "Share a clip in the highlights channel")
    .addField(prefix + "info", "Get info using the discord-api -coming soon")
    .setColor(color.white)

    const adminhelp = new Discord.MessageEmbed()
    .setTitle(" **Commands** ")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .addField(prefix + "ban", "ban a member")
    .addField(prefix + "kick", "kick a member")
    .addField(prefix + "warn", "warn a member")
    .addField(prefix + "mute", "coming")
    .addField(prefix + "tempmute", "coming soon")
    .addField(prefix + "unmute", "reject a user form")
    .addField(prefix + "lockdown", "coming soon")
    .setColor(color.white)

    const Dmchecker = new Discord.MessageEmbed()
    .setTitle(` **Check your DMs** ${message.author.username}`)
    .setColor(color.white)

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send(memberhelp); + message.channel.send(Dmchecker);
    message.author.send(adminhelp);
    message.channel.send(Dmchecker);
}

module.exports.help = {
  name: 'help',
  aliases: ['h']
}
