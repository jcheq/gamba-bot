const Inventory = require('../../schemas/InventorySchema');
const connectDB = require('../../config/db');
const cdManager = require('../../utils/cooldownManager');
const cooldownManager = require('../../utils/cooldownManager');


module.exports = async (client, message) => {
    const PREFIX = '.'; // Command prefix
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'cf' || command === 'coinflip') {
        const authorID = message.author.id;
        const timeLeft = cooldownManager.isOnCooldown(authorID);
        if (timeLeft) {
            const format = cdManager.formatTime(timeLeft);
            return message.channel.send(`You can play coinflip again in ${format}`);
        }


        const bet = parseInt(args[0], 10) || 1;
        const userInventory = await Inventory.findOne({ userID: message.author.id });


        if (bet < 0 || bet > 5000) {
           return message.channel.send(`The max bet is 5000`);
         }

         if (userInventory.balance < bet) {
           return message.channel.send(`You're literally too broke...`);
         }

        const outcome = Math.random() < 0.52 ? 'Heads' : 'Tails'; //change rate

        const member = message.guild.members.cache.get(message.author.id); //gets nickname

        const nickname = member.nickname || member.user.username;


        if (outcome == 'Heads') {
           const newBal = userInventory.balance + bet;
            // const collection = connectDB.collection('Inventory');
            
            await Inventory.updateOne(
                { userID: message.author.id }, // Filter
                { $set: { balance: newBal } }   // Update operation
            );
            message.channel.send(`<:coin:1270563564695846922>  ${nickname} **won** ` + bet + ' Coins <:arugood:1185091257345777664>');

        } else {
            message.channel.send(`<:coin:1270563564695846922> ${nickname} **lost** ` + bet + ' Coins <:arugdi:1270574136967561238>');


        }

        cooldownManager.setCooldown(authorID);
     }
  
  };