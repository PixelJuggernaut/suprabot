const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()

    let bot = new Discord.RichEmbed()
        .setAuthor("PixelJuggernaut","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setTitle("Supra - Quick Links")
        .setColor(`#FF0062`)
        .addField(`Website`,`[Website](https://suprabot.vercel.app/)`, true)
        .addField(`GitHub`,`[Github](https://github.com/PixelJuggernaut/suprabot-informations)`, true)
        .addField(`Discord`,`[Discord](https://discord.gg/pk8Ve68UEH)`, true)
        .setFooter(`© Supra Bot | Owned by PixelJuggernaut | Developed by PixelJuggernaut\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    message.channel.send(bot)
}