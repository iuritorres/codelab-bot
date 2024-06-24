import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('fecharticket')
  .setDescription('Fecha o ticket de suporte atual.');

async function execute(interaction) {
  const channelName = interaction.channel.name;

  if (!channelName.startsWith('ticket-')) {
    await interaction.reply({
      content: 'Esse comando só pode ser usado em tickets!',
      ephemeral: true,
    });

    return;
  }

  await interaction.channel.delete();
}

export { data, execute };
