const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json");


module.exports.run = async (client, message, args,) => {

    const couldntfinduser = new Discord.MessageEmbed()
    .setTitle("❌ Couldn't find user")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Please double check you are ping the user you want to kick")
    .setColor('36393e')

    const supplyreason = new Discord.MessageEmbed()      
    .setTitle("❌ You must supply a reason")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant kick a member with a reason " + config.prefix + "kick @user {reason}")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    const cantkickthem = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Only a Admin can use this commmand")
    .setFooter("Your permission level is 1, you must have a permission level of 3 to use this command")
    .setColor('36393e')

    const samelevelofpower = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant kick a person that has the same level of power as you")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cantkickthem);
    let tokick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tokick) return message.reply(couldntfinduser);
    if(tokick.hasPermission("MANAGE_MESSAGES")) return message.reply(samelevelofpower);
    let reason = args.slice(1).join(" ");
    if(!reason) return message.reply(supplyreason);

    let mod = message.author
    let taggedUser = message.mentions.users.first();
    const member = message.mentions.members.first();
    const kickcolor = color.orange

    const kickeduser = new Discord.MessageEmbed()      
    .setTitle("✓ Successfully kicked")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Successfully kicked user " + `${tokick}`)
    .addField("Reason", reason)
    .setTimestamp()
    .setColor(kickcolor)
    message.channel.send(kickeduser)
    const userkicked = new Discord.MessageEmbed()      
    .setTitle("You have been kicked")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You have been kicked" + `${tokick}`)
    .addField("Kicked in", message.channel)
    .addField("Reason", reason)
    .addField("Moderator", mod)
    .setTimestamp()
    .setColor(kickcolor)
    
    try{
        await tokick.send(userkicked)
      }catch(e){
        console.log(tokick + " does not have there dms open")
      }    

      member.kick();

    const actionlog = new Discord.MessageEmbed()
    .setTitle("Action Log")
    .addField("Member", `${tokick} ` + `**(` + tokick + `)**`)
    .addField("Action", "Kicked", true)
    .addField("Reason", reason, true)
    .addField("Modernator", mod, true)
    .setThumbnail(taggedUser.displayAvatarURL())
    .setTimestamp()
    .setColor(kickcolor)

    let actionchannel = client.channels.cache.get(config.actionchannel)
    actionchannel.send(actionlog)
}

module.exports.help = {
    name: 'kick',
    aliases: ['k']
  }
