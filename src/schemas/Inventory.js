const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    balance: {
        type: Number,
    },
    
  });
  
  module.exports = mongoose.model('CardInventory', InventorySchema);