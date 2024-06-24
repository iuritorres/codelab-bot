import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildQuestionModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketQuestionModal')
    .setTitle('Dúvida ou Problema');

  const questionInput = new TextInputBuilder()
    .setCustomId('questionInput')
    .setLabel('Dúvida ou Problema')
    .setPlaceholder('Descreva sua dúvida ou problema.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(questionInput);
  modal.addComponents(actionRow);

  return modal;
}

export { buildQuestionModal };
