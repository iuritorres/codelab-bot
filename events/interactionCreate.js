import {
  ChannelType,
  Events,
  PermissionFlagsBits,
  bold,
  codeBlock,
} from 'discord.js';

const name = Events.InteractionCreate;

async function execute(interaction) {
  if (interaction.isChatInputCommand()) handleChatInputCommand(interaction);
  if (interaction.isModalSubmit()) handleModalSubmit(interaction);
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

    const ticketCategory = interaction.guild.channels.cache.find(
      (channel) => channel.name.toLowerCase() === 'tickets'
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
          .concat(`> ${description}`)
          .concat('\n\n')
          .concat(
            codeBlock(
              'fix',
              'Aguarde um membro da equipe responder!  🕐 \n'.concat(
                'Responderemos o mais rápido possível!  🚀'
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

export { execute, name };
