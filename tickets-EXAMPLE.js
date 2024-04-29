const client = require("..")
const {
  InteractionType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js")

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ModalSubmit) return
  if (interaction.customId === "myModal") {
    const one = interaction.fields.getTextInputValue("nameoftheuser")
    const two = interaction.fields.getTextInputValue("reportreason")
    const three = interaction.fields.getTextInputValue("otherinfo")

    interaction.guild.channels
      .create(`ticket-${interaction.user.username}`, {
        parent: "1000116949805707284",
        topic: interaction.user.id,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
          },
          {
            id: "1000360930644852786",
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
        ],
        type: "text",
      })
      .then(async (channel) => {
        interaction.reply({
          content: `Ticket has ben created! <#${channel.id}>`,
          ephemeral: true,
        })
      })
  }
})
