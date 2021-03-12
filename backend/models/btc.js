const mongoose = require('mongoose');

const btcSchema = mongoose.Schema({
  time:{type:String,require:true},
  price:{type:Number,require:true}
})

module.exports = mongoose.model('Btn',btcSchema);
