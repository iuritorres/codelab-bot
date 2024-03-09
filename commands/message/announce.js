import {
  ChannelType,
  SlashCommandBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  ChannelSelectMenuBuilder,
  TextInputStyle,
  bold,
  italic,
  ModalBuilder,
} from "discord.js";

const data = new SlashCommandBuilder()
  .setName("announce")
  .setDescription("Allows you to announce something with style! ;)")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Channel to send the announce into")
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  );

async function execute(interaction) {
  const channel = interaction.options.getChannel("channel");

  const modal = new ModalBuilder()
    .setCustomId("announceModal")
    .setTitle("Fill with announce's data");

  const titleInput = new TextInputBuilder()
    .setCustomId("titleInput")
    .setLabel("Title")
    .setPlaceholder("Type your title here...")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const contentInput = new TextInputBuilder()
    .setCustomId("contentInput")
    .setLabel("Content")
    .setPlaceholder("Type the announce content here...")
    .setStyle(TextInputStyle.Paragraph);

  const actionRow1 = new ActionRowBuilder().addComponents(titleInput);
  const actionRow2 = new ActionRowBuilder().addComponents(contentInput);

  modal.addComponents(actionRow1, actionRow2);

  await interaction.showModal(modal);

  // await interaction.reply({
  //   content: "The message was sent!",
  //   ephemeral: true,
  // });

  // channel.send({
  //   content: `
  //     ${bold(italic(title))}

  //     ${content}

  //     channel ID = ${channel}
  //   `,
  // });
}

export { data, execute };
