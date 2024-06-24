import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function buildReportModal() {
  const modal = new ModalBuilder()
    .setCustomId('ticketReportModal')
    .setTitle('Denúncia');

  const userInput = new TextInputBuilder()
    .setCustomId('userInput')
    .setLabel('Usuário sendo denunciado')
    .setPlaceholder('Insira o nome de usuário quem deseja denunciar.')
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(100)
    .setRequired(true);

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Mensagem')
    .setPlaceholder('Descreva a situação de forma detalhada.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(300)
    .setRequired(true);

  const actionRow1 = new ActionRowBuilder().addComponents(userInput);
  const actionRow2 = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(actionRow1, actionRow2);

  return modal;
}

export { buildReportModal };
