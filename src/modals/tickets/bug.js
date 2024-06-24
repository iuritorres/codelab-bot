import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildBugModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketBugModal')
    .setTitle('Bug');

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Mensagem')
    .setPlaceholder('Descreva o bug de forma detalhada.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(actionRow);

  return modal;
}

export { buildBugModal };
