import {
  ActionRowBuilder,
  Colors,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription(
    'Cria um chat ao vivo para ter suporte humanizado diretamente com a administração do servidor. :D.'
  );

async function execute(interaction) {
  // Verify if the user already has a ticket
  const ticket = interaction.guild.channels.cache.find(
    (channel) =>
      channel.name === `ticket-${interaction.user.username.toLowerCase()}`
  );

  if (ticket) {
    interaction.reply({
      content: `Ei! você já tem um ticket aberto! 👉🏽 <#${ticket.id}>`,
      ephemeral: true,
    });

    return;
  }

  // Verify if the guild has a role named "Support Team"
  const supportRole = interaction.guild.roles.cache.find(
    (role) => role.name === 'Support Team'
  );

  if (!supportRole) {
    interaction.guild.roles
      .create({
        name: 'Support Team',
        color: Colors.Blue,
        reason: 'The BOT needs a role to manage the support tickets',
      })
      .catch(console.error);
  }

  // Verify if the guild has a category named "tickets"
  const ticketCategory = interaction.guild.channels.cache.find((channel) =>
    channel.name.toLowerCase().includes('tickets')
  );

  if (!ticketCategory) {
    interaction.reply({
      content:
        'A categoria de tickets não foi encontrada! 😢, aguarde a administração do servidor criar uma.',
      ephemeral: true,
    });

    return;
  }

  const modal = new ModalBuilder()
    .setCustomId('ticketModal')
    .setTitle('Ticket de Suporte');

  const reportReasonInput = new TextInputBuilder()
    .setCustomId('reportReasonInput')
    .setLabel('Motivo do ticket')
    .setPlaceholder('Digite o motivo do ticket aqui...')
    .setStyle(TextInputStyle.Short)
    .setMinLength(10)
    .setMaxLength(100)
    .setRequired(true);

  const descriptionInput = new TextInputBuilder()
    .setCustomId('descriptionInput')
    .setLabel('Descrição')
    .setPlaceholder('Descreva o problema ou dúvida que você tem...')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(1000)
    .setRequired(true);

  const actionRow1 = new ActionRowBuilder().addComponents(reportReasonInput);
  const actionRow2 = new ActionRowBuilder().addComponents(descriptionInput);

  modal.addComponents(actionRow1, actionRow2);

  await interaction.showModal(modal);
}

export { data, execute };
