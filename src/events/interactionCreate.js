import {
  ActionRowBuilder,
  ChannelType,
  Events,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  bold,
  codeBlock,
} from 'discord.js';

import {
  buildBugModal,
  buildFinanceModal,
  buildOtherModal,
  buildQuestionModal,
  buildReportModal,
  buildSuggestionModal,
} from '../modals/tickets/index.js';

const name = Events.InteractionCreate;

async function execute(interaction) {
  if (interaction.isChatInputCommand())
    await handleChatInputCommand(interaction);
  if (interaction.isModalSubmit()) await handleModalSubmit(interaction);
  if (interaction.isStringSelectMenu())
    await handleStringSelectMenu(interaction);
  if (interaction.isButton()) await handleButton(interaction);
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
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
}

async function handleModalSubmit(interaction) {
  if (interaction.customId === 'announceModal') {
    const title = interaction.fields.getTextInputValue('titleInput');
    const content = interaction.fields.getTextInputValue('contentInput');

    try {
      await interaction.channel.send({
        content: `title: ${title}, content: ${content}`,
      });

      await interaction.reply({
        content: 'Your announce was submitted successfully!',
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (interaction.customId === 'ticketModal') {
    // Create the ticket channel and send the ticket message
    const reportReason =
      interaction.fields.getTextInputValue('reportReasonInput');
    const description =
      interaction.fields.getTextInputValue('descriptionInput');

    const permissionOverwrites = [
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
      {
        id: interaction.guild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel],
      },
    ];

    const ticketCategory = interaction.guild.channels.cache.find((channel) =>
      channel.name.toLowerCase().includes('tickets')
    );

    interaction.guild.channels
      .create({
        name: `ticket-${interaction.user.username}`,
        topic: reportReason,
        type: ChannelType.GuildText,
        parent: ticketCategory.id,
        permissionOverwrites,
      })
      .then(async (channel) => {
        const userId = interaction.user.id;
        const message = `${bold(`🪪  Ticket criado por <@${userId}>!`)}`
          .concat('\n')
          .concat(`${bold(`📆  Data:`)} ${new Date().toLocaleDateString()}`)
          .concat('\n\n')
          .concat(`> ${bold('MOTIVO DE ABERTURA:')} \n`)
          .concat(`> ${reportReason}`)
          .concat('\n\n')
          .concat(`> ${bold('DESCRIÇÃO:')} \n`)
          .concat(`> ${description.split('\n').join('\n> ')}`)
          .concat('\n\n')
          .concat(
            codeBlock(
              'fix',
              'Aguarde um membro da equipe responder!🕐 \n'.concat(
                'Responderemos o mais rápido possível!🚀'
              )
            ),
            'ㅤ'
          );

        channel.send(message).catch(console.error);

        interaction.reply({
          content: `O Ticket foi criado! 👉🏽 <#${channel.id}>`,
          ephemeral: true,
        });
      })
      .catch(console.error);
  }
}

async function handleStringSelectMenu(interaction) {
  if (interaction.customId !== 'ticket-select-menu') return;

  switch (interaction.values[0]) {
    case 'question':
      const questionModal = buildQuestionModal();
      await interaction.showModal(questionModal);

      console.log(interaction);
      break;

    case 'report':
      const reportModal = buildReportModal();
      await interaction.showModal(reportModal);

      break;

    case 'suggestion':
      const suggestionModal = buildSuggestionModal();
      await interaction.showModal(suggestionModal);
      break;

    case 'finance':
      const financeModal = buildFinanceModal();
      await interaction.showModal(financeModal);
      break;

    case 'bug':
      const bugModal = buildBugModal();
      await interaction.showModal(bugModal);
      break;

    case 'other':
      const otherModal = buildOtherModal();
      await interaction.showModal(other);
      break;

    default:
      break;
  }
}

async function handleButton(interaction) {
  // if (interaction.customId === 'closeTicket') {
  //   await interaction.channel.delete();
  // }

  if (interaction.customId === 'openTicket') {
    const options = [
      new StringSelectMenuOptionBuilder()
        .setLabel('Dúvidas')
        .setDescription('Caso tenha alguma dúvida ou problema.')
        .setEmoji('💬')
        .setValue('question'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Denúncias')
        .setDescription('Caso queira denunciar um membro.')
        .setEmoji('⛔')
        .setValue('report'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Sugestões')
        .setDescription('Caso tenha alguma sugestão para o servidor.')
        .setEmoji('💡')
        .setValue('suggestion'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Financeiro.')
        .setDescription('Caso queira falar sobre financeiro.')
        .setEmoji('💵')
        .setValue('finance'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Bug')
        .setDescription('Caso queira reportar um bug.')
        .setEmoji('🚧')
        .setValue('bug'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Outro')
        .setDescription('Caso não se encaixe em nenhuma das opções acima.')
        .setEmoji('🔄')
        .setValue('other'),
    ];

    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket-select-menu')
      .setPlaceholder('Clique para selecionar uma opção')
      .addOptions(...options);

    const menu = new ActionRowBuilder().addComponents(select);

    await interaction
      .reply({
        content: bold(`Escolha um tópico:`),
        ephemeral: true,
        components: [menu],
      })
      .catch(console.error);
  }
}

export { execute, name };
