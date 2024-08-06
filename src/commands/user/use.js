const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require('discord.js');


  module.exports = {
    data: new SlashCommandBuilder()
      .setName('use')
      .setDescription('Use item from inventory')
      .addStringOption(option =>
        option.setName('item-index')
          .setDescription('item')
          .setRequired(true)
          .setAutocomplete(true))
      .addIntegerOption(option =>
        option.setName('amount')
           .setDescription('amount')
           .addChoices()
           .setRequired(true)),
    async execute(interaction) {
      
      const focusedOption = interaction.options.getFocused(true);
      let choices;
  
      // console.log(focusedOption);
  
      if (focusedOption.name === 'item-index') {
        choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
      }
  
      if (focusedOption.name === 'amount') {
        choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
      }
  
      const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
      );
    },
    
  };



// module.exports = {
//     name: 'use',
//     description: 'Use item from inventory',
//     // devOnly: Boolean,
//     testOnly: true,
//     autocomplete: true,
//     options: [
//         {
//           name: 'item-index',
//           description: 'item',
//           required: true,
//           type: ApplicationCommandOptionType.String,
//         },
//         {
//           name: 'amount',
//           description: 'amount',
//           required: true,
//           type: ApplicationCommandOptionType.String,
//         },
//       ],
//     // deleted: Boolean,
  
//     callback: (client, interaction) => {
//       interaction.reply(`Use...`);
//     },
//   };