const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json");


module.exports.run = async (client, message, args,) => {
  
    const couldntfinduser = new Discord.MessageEmbed()
    .setTitle("❌ Couldn't find user")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Please double check you are ping the user you want to warn")
    .setColor('36393e')
    .setFooter("Share a link of your best highlights")

    const supplyreason = new Discord.MessageEmbed()      
    .setTitle("❌ You must supply a reason")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant warn a member with a reason " + config.prefix + "warn @user {reason}")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    const cantwarnthem = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Only a Admin can use this commmand")
    .setFooter("Your permission level is 1, you must have a permission level of 3 to use this command")
    .setColor('36393e')

    const samelevelofpower = new Discord.MessageEmbed()      
    .setTitle("🔒 You dont have permission")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You cant warn a person that has the same level of power as you")
    .setFooter("Your permission level is 3")
    .setColor('36393e')

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cantwarnthem);
    let towarn = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!towarn) return message.reply(couldntfinduser);
    if(towarn.hasPermission("MANAGE_MESSAGES")) return message.reply(samelevelofpower);
    let reason = args.slice(1).join(" ");
    if(!reason) return message.reply(supplyreason);

    let mod = message.author
    let taggedUser = message.mentions.users.first();
    const warncolor = color.green
    
    const warneduser = new Discord.MessageEmbed()      
    .setTitle("✓ Successfully warned")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Successfully warned user " + `${towarn}`)
    .addField("Reason", reason)
    .setTimestamp()
    .setColor(warncolor)
    message.channel.send(warneduser)
    const userwarned = new Discord.MessageEmbed()      
    .setTitle("You have been warned")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You have been warned " + `${towarn}`)
    .addField("Warned in", message.channel)
    .addField("Reason", reason)
    .addField("Moderator", mod)
    .setTimestamp()
    .setColor(warncolor)
    
    try{
        await towarn.send(userwarned)
      }catch(e){
        console.log(`${towarn}` + towarn + " does not have there dms open")
      }    

    const actionlog = new Discord.MessageEmbed()
    .setTitle("Action Log")
    .addField("Member", `${towarn} ` + `**(` + towarn + `)**`)
    .addField("Action", "Warned", true)
    .addField("Reason", reason, true)
    .addField("Modernator", mod, true)
    .setThumbnail(taggedUser.displayAvatarURL())
    .setTimestamp()
    .setColor(warncolor)

    let actionchannel = client.channels.cache.get(config.actionchannel)
    actionchannel.send(actionlog)
    
    
     
    
    

}

module.exports.help = {
    name: 'warn',
    aliases: ['Warn']
  }