const Discord = require("discord.js");
const MySQL = require("mysql");
const Database = require("./DBConnection/DB.js");
const Config = require("./config.json");
const Commands = require("./Commands/commands.js")
const Listeners = require("./Listeners/listeners.js");
const Client = new Discord.Client();

let Events = {
  ready: "ready",
  message: "message"
}

Client.on(Events.ready, () => {
  console.log(Config.readymessage);
})

Client.on(Events.message, (message) => {
  if (message.guild != null) {
    Commands.init(Config, MySQL, Database);
    Listeners.init(Config, MySQL, Database);
    Commands.rank(message);
    Listeners.levelListener(message);
  }
})
Client.login(Config.token)
