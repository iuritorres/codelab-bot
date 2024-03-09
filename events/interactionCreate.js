import { Events } from "discord.js";

const name = Events.InteractionCreate;

async function execute(interaction) {
  if (interaction.isChatInputCommand()) handleChatInputCommand(interaction);
  if (interaction.isModalSubmit()) handleModalSubmit(interaction);
}

async function handleChatInputCommand(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}

async function handleModalSubmit(interaction) {
  if (interaction.customId === "announceModal") {
    const title = interaction.fields.getTextInputValue("titleInput");
    const content = interaction.fields.getTextInputValue("contentInput");

    try {
      await interaction.channel.send({
        content: `title: ${title}, content: ${content}`,
      });

      await interaction.reply({
        content: "Your announce was submitted successfully!",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export { execute, name };
