const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buy items from the shop')
		.addStringOption(option =>
			option.setName('shop-item')
				.setDescription('shopItem')
        .setRequired(true)
				.setAutocomplete(true))
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('amount')
        .addChoices()
        .setMinValue(0)
        .setMaxValue(100)
        .setRequired(true)),
  
	async execute(interaction) {
    
    const focusedOption = interaction.options.getFocused(true);
		let choices;

    console.log("SDFSDFDSFDSD");
		if (focusedOption.name === 'shop-item') {
			choices = ['Draw Ticket x1 [500 Coins]'];
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