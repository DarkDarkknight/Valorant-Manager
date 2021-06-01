const Discord = require("discord.js");
const ms = require("ms");
const config = require("../config.json");
const color = require("../color.json");

module.exports.run = async (client, message, args, i) => {

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

  const time = new Discord.MessageEmbed()      
  .setTitle("❌ You didn't specify a time")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Make sure you have the time")
  .setFooter("Your permission level is 3")
  .setColor('36393e')

  const cantmutethem = new Discord.MessageEmbed()      
  .setTitle("🔒 You dont have permission")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Only a Admin can use this commmand")
  .setFooter("Your permission level is 1, you must have a permission level of 3 to use this command")
  .setColor('36393e')

  const samelevelofpower = new Discord.MessageEmbed()      
  .setTitle("🔒 You dont have permission")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("You cant mute a person that has the same level of power as you")
  .setFooter("Your permission level is 3")
  .setColor('36393e')

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cantmutethem);
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(samelevelofpower);
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply(supplyreason);

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  const mutedcolor = color.orange

  const muteduser = new Discord.MessageEmbed()      
  .setTitle("✓ Successfully muted")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Successfully muted user " + `${tomute}`)
  .addField("Length", mutetime, true)
  .addField("Reason", reason)
  .setTimestamp()
  .setColor(mutedcolor)
  message.channel.send(muteduser)
  const usermuted = new Discord.MessageEmbed()      
  .setTitle("You have been muted")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("You have been muted " + `${tomute}`)
  .addField("Muted in", message.channel)
  .addField("Length", mutetime)
  .addField("Reason", reason)
  .addField("Moderator", mod)
  .setTimestamp()
  .setColor(mutedcolor)

  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply(time);

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(usermuted)
  }catch(e){
    console.log(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  const actionlog = new Discord.MessageEmbed()
  .setTitle("Action Log")
  .addField("Member", `${tomute} ` + `**(` + tomute + `)**`)
  .addField("Action", "Tempmuted", true)
  .addField("Length", mutetime)
  .addField("Reason", reason, true)
  .addField("Modernator", mod, true)
  .setThumbnail(taggedUser.displayAvatarURL())
  .setTimestamp()
  .setColor(mutedcolor)

  let actionchannel = client.channels.cache.get(config.actionchannel)
  actionchannel.send(actionlog)
  

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: 'tempmute',
  aliases: ['tm']
}