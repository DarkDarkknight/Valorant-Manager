const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json");


module.exports.run = async (client, message, args,) => {

    const couldntfinduser = new Discord.MessageEmbed()
    .setTitle("❌ Couldn't find user")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Please double check you are ping the user you want to ban")
    .setColor('36393e')

    const supplyreason = new Discord.MessageEmbed()      
    .setTitle("❌ You must supply a reason")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant ban a member with a reason " + config.prefix + "ban @user {reason}")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    const cantbanthem = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Only a Admin can use this commmand")
    .setFooter("Your permission level is 1, you must have a permission level of 3 to use this command")
    .setColor('36393e')

    const samelevelofpower = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant ban a person that has the same level of power as you")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(cantbanthem);
    let toban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toban) return message.reply(couldntfinduser);
    if(toban.hasPermission("BAN_MEMBERS")) return message.reply(samelevelofpower);
    let reason = args.slice(1).join(" ");
    if(!reason) return message.reply(supplyreason);

    let mod = message.author
    let taggedUser = message.mentions.users.first();
    const member = message.mentions.members.first();
    const bancolor = color.red

    member.unban();

    const banneduser = new Discord.MessageEmbed()      
    .setTitle("✓ Successfully banned")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Successfully banned user " + `${toban}`)
    .addField("Reason", reason)
    .setTimestamp()
    .setColor(bancolor)
    message.channel.send(banneduser)
    const userbanned = new Discord.MessageEmbed()      
    .setTitle("You have been Banned")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You have been Banned" + `${toban}`)
    .addField("Banned in", message.channel)
    .addField("Reason", reason)
    .addField("Moderator", mod)
    .setTimestamp()
    .setColor(bancolor)
    
    try{
        await toban.send(userbanned)
      }catch(e){
        console.log(toban + " does not have there dms open")
      }    

    const actionlog = new Discord.MessageEmbed()
    .setTitle("Action Log")
    .addField("Member", `${toban} ` + `**(` + toban + `)**`)
    .addField("Action", "Banned", true)
    .addField("Reason", reason, true)
    .addField("Modernator", mod, true)
    .setThumbnail(taggedUser.displayAvatarURL())
    .setTimestamp()
    .setColor(bancolor)

    let actionchannel = client.channels.cache.get(config.actionchannel)
    actionchannel.send(actionlog)
}

module.exports.help = {
    name: 'ban',
    aliases: ['b']
  }