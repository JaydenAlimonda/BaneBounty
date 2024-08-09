const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bountySchema = new Schema({
    firstName: String,
    lastName: String,
    alive:Boolean,
    bountyPrice: Number,
    type: String
  });

module.exports = mongoose.model("bountyDb", bountySchema)