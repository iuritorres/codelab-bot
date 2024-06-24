import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildSuggestionModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketSuggestionModal')
    .setTitle('Sugestão');

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Sugestão')
    .setPlaceholder('Descreva sua sugestão.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(actionRow);

  return modal;
}

export { buildSuggestionModal };
