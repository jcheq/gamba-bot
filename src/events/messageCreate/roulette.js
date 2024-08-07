const Inventory = require('../../schemas/InventorySchema');

module.exports = async (client, message) => {
    const PREFIX = '.'; // Command prefix
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'roulette') {
       
    }
};