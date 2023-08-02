const {
    Message,
    PermissionFlagsBits,
    Client,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: "premiumlist",
    description: `show all premium users`,
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.SendMessages,
    category: "ADMIN",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {String} prefix
     */
    run: async (client, message) => {
      // Code
      if (message.author.id !== "846879863226368030") return;
  
      let data = client.userSettings
        .filter((data) => data?.isPremium === true)
        .map((data) => {
          return `<@${data.Id}> **Plan** : \`${
            data.premium.plan
          }\` **Expire At** :  <t:${Math.floor(
            data.premium.expiresAt / 1000
          )}:F> `;
        });
  
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`All Premium Users`)
            .setColor("Blurple")
            .setDescription(data.join("\n") || "No Premium User Found"),
        ],
      });
    },
  };