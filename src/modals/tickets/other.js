import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildOtherModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketOtherModal')
    .setTitle('Outro');

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Mensagem')
    .setPlaceholder('Insira sua solicitação de suporte.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(actionRow);

  return modal;
}

export { buildOtherModal };
