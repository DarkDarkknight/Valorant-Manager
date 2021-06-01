const Discord = require('discord.js');
const config = require("../config.json");
const color = require("../color.json")

 module.exports.run = async (client, message, args) => {

  const clipquestion = new Discord.MessageEmbed()
  .setTitle(" **Share your clip** ")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Submit a link to go to the `Highlands` Channel")
  .setColor(color.blue)
  .setFooter("Due not reaspone to cancal")
  .setTimestamp()

  const clip = new Discord.MessageEmbed()
  .setTitle(" **Highlight** ")
  .setThumbnail(message.author.displayAvatarURL())
  .setDescription("Clip posted by " + message.author.username + "")
  .setColor(color.blue)
  .setTimestamp()

  let highlightchannel = client.channels.cache.get(config.highlightchannel)

    message.channel.send(clipquestion).then(() => {
    const filter = m => message.author.id === m.author.id;

    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
      .then((messages) => {
        highlightchannel.send(clip)
        highlightchannel.send(`${messages.first().content}`);
      })
      .catch(() => {
        message.author.send('Timeout');
      });
  });


 }

module.exports.help = {
  name: 'clip',
  aliases: ['Clip']
}
