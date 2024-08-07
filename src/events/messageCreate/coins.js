const Inventory = require('../../schemas/InventorySchema');

module.exports = async (client, message) => {
    const PREFIX = '.'; // Command prefix
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'coins' || command === 'c') {

        const userInventory = await Inventory.findOne({ userID: message.author.id });

        if (!userInventory) {
            return message.reply(`You have not registered yet. Do /register.`);
        }

        message.reply(`You have ${userInventory.balance} coins.`);
        console.log("test");
        
    }
};