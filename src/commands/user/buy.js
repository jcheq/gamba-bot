const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buy items from the shop')
		.addStringOption(option =>
			option.setName('shop-item')
				.setDescription('shopItem')
        .setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('amt')
        .setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
    
    const focusedOption = interaction.options.getFocused(true);
		let choices;

    console.log("sdfsdfs");

		if (focusedOption.name === 'shop-item') {
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
//   name: 'buy',
//   description: 'Buy items from the shop',
//   // devOnly: Boolean,
//   // testOnly: true,
//   options: [
//     {
//       name: 'shop-item',
//       description: 'shopItem',
//       required: true,
//       type: ApplicationCommandOptionType.String,
      
//     },
//     {
//       name: 'amount',
//       description: 'amount',
//       required: true,
//       type: ApplicationCommandOptionType.String,
//     },
//   ],
//   // deleted: Boolean,

//   callback: (client, interaction) => {
//     interaction.reply(`Buying...`);
//   },
// };