import {
  ActionRowBuilder,
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
  const modal = new ModalBuilder()
    .setCustomId('ticketModal')
    .setTitle('Ticket de Suporte');

  const reportReasonInput = new TextInputBuilder()
    .setCustomId('reportReasonInput')
    .setLabel('Motivo do ticket')
    .setPlaceholder('Digite o motivo do ticket aqui...')
    .setStyle(TextInputStyle.Short)
    .setMinLength(10)
    .setRequired(true);

  const descriptionInput = new TextInputBuilder()
    .setCustomId('descriptionInput')
    .setLabel('Descrição')
    .setPlaceholder('Descreva o problema ou dúvida que você tem...')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setRequired(true);

  const actionRow1 = new ActionRowBuilder().addComponents(reportReasonInput);
  const actionRow2 = new ActionRowBuilder().addComponents(descriptionInput);

  modal.addComponents(actionRow1, actionRow2);

  await interaction.showModal(modal);
}

export { data, execute };
