const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json")

module.exports.run = async (client, message, args) => {

    const supplynumber = new Discord.MessageEmbed()      
    .setTitle("❌ You must supply a number")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant kick a member with a reason " + config.prefix + "slowmode {number in seconds}")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    const cantslow = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Only a Admin can use this commmand")
    .setFooter("Your permission level is 1, you must have a permission level of 3 to use this command")
    .setColor('36393e')

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cantslow);
    let time = message.content.split(' ').slice(1).join(' ')
    if(!time) return message.reply(supplynumber);

    message.channel.setRateLimitPerUser(time)

    const slowmode = new Discord.MessageEmbed()
    .setTitle("✓ Successfully set slowmode")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`slowmode set in ${message.channel}`)
    .setFooter("Duration " + time + " seconds • Modernator " + message.author.username)
    .setColor(color.blue)
    .setTimestamp()

    message.channel.send(slowmode)
}

module.exports.help = {
    name: 'slowmode',
    aliases: ['sm']
  }