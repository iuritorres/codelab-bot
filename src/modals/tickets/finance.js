import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildFinanceModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketFinanceModal')
    .setTitle('Financeiro');

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Mensagem')
    .setPlaceholder('Insira sua dúvida ou solicitação.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(actionRow);

  return modal;
}

export { buildFinanceModal };
