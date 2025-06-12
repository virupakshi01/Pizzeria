/* jshint esversion: 8 */
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    tname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('ingredients',ingredientSchema);