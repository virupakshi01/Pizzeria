/* jshint esversion: 8 */
const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array
    },
    topping:{
        type:Array
    }
    
});

module.exports = mongoose.model('pizzas',pizzaSchema);