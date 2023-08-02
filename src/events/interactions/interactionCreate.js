const { getSettings } = require("@schemas/Guild");
const { commandHandler, contextHandler, statsHandler, suggestionHandler, ticketHandler } = require("@src/handlers");
const { InteractionType } = require("discord.js");
const User = require("@root/src/models/User.js");
const Guild = require("@schemas/Guild");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').BaseInteraction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.guild) {
    return interaction
      .reply({ content: "Command can only be executed in a discord server", ephemeral: true })
      .catch(() => {});
  }

  // Slash Commands
  if (interaction.isChatInputCommand()) {
    await commandHandler.handleSlashCommand(interaction);
  }

  // Premium
  let user = client.userSettings.get(interaction.author.id);
  // If there is no user, create it in the Database as "newUser"
  if (!user) {
    const findUser = await User.findOne({ Id: interaction.author.id });
    if (!findUser) {
      const newUser = await User.create({ Id: interaction.author.id });
      client.userSettings.set(interaction.author.id, newUser);
      user = newUser;
    } else return;
  }
  else if (Guild.premium && user && !user.isPremium) {
    return interaction.reply({
      content: `> \`${interaction.author.username}\` You are Not Premium User`,
    });
  }
  // Context Menu
  else if (interaction.isContextMenuCommand()) {
    const context = client.contextMenus.get(interaction.commandName);
    if (context) await contextHandler.handleContext(interaction, context);
    else return interaction.reply({ content: "An error has occurred", ephemeral: true }).catch(() => {});
  }

  // Buttons
  else if (interaction.isButton()) {
    switch (interaction.customId) {
      case "TICKET_CREATE":
        return ticketHandler.handleTicketOpen(interaction);

      case "TICKET_CLOSE":
        return ticketHandler.handleTicketClose(interaction);

      case "SUGGEST_APPROVE":
        return suggestionHandler.handleApproveBtn(interaction);

      case "SUGGEST_REJECT":
        return suggestionHandler.handleRejectBtn(interaction);

      case "SUGGEST_DELETE":
        return suggestionHandler.handleDeleteBtn(interaction);
    }
  }

  // Modals
  else if (interaction.type === InteractionType.ModalSubmit) {
    switch (interaction.customId) {
      case "SUGGEST_APPROVE_MODAL":
        return suggestionHandler.handleApproveModal(interaction);

      case "SUGGEST_REJECT_MODAL":
        return suggestionHandler.handleRejectModal(interaction);

      case "SUGGEST_DELETE_MODAL":
        return suggestionHandler.handleDeleteModal(interaction);
    }
  }

  const settings = await getSettings(interaction.guild);

  // track stats
  if (settings.stats.enabled) statsHandler.trackInteractionStats(interaction).catch(() => {});
};
