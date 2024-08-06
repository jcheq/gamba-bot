const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
  // if (!interaction.isChatInputCommand()) return;
  if (!interaction.isAutocomplete() == 'amount') return;
  const localCommands = getLocalCommands();


  // console.log(interaction.commandName);


  if (interaction.isAutocomplete()) {
    const focusedOption = interaction.options.getFocused(true);
    if(focusedOption.name === 'shop-item') {
      choices = ['Draw Ticket x1 [500 Coins]'];
      const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
        
      );
      return;
    }
    if (focusedOption.name === 'item-index') {
      choices = ['Draw Ticket x1 [500 Coins]'];
      const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
        
      );
      return;
    }
    

    
    
    // const focusedOption = interaction.options.getFocused(true);
    // let choices;

    // if (focusedOption.name === 'shop-item') {
    //   choices = ['Draw Ticket x1 [500 Coins]'];
    // }

    // const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
    // await interaction.respond(
    //   filtered.map(choice => ({ name: choice, value: choice })),
      
    // );
    

  }


  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }
    

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};