const mongoose = require("mongoose");

const CardInventorySchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    
    card: {
        type: String,
    },

    rarity: {
        type: String,
    },

    amount: {
        type: String,
    },
    
  });
  
  module.exports = mongoose.model('CardInventory', CardInventorySchema);