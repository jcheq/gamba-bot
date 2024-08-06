const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require('discord.js');
  const User = require('../../schemas/UserSchema');
  const Inventory = require('../../schemas/InventorySchema');


  module.exports = {
    data: new SlashCommandBuilder()
      .setName('register')
      .setDescription('Use item from inventory'),
    async execute(interaction) {
      // console.log(interaction.user.id);
      const member = await User.findOne({userID: interaction.user.id});
      if(!member) {
        const newUser = await User.create({
          userID: interaction.user.id,
          power: 0,
          guildName: "", 

        });

        const newInven = await Inventory.create({
          userID: interaction.user.id,
          balance: 10000,
        });

        
        console.log("Created new user");
      } else {
        console.log("Already in database");
      }
      
    
    },
    
  };