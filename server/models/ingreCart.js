/* jshint esversion: 8 */
let mongoose  = require('mongoose');

const IngredientCartSchema = new mongoose.Schema({
    
    checked: {
        type:Boolean
    },
    id: {
        type:Number,
        required:true
    },
    image: {
        type:String
    },
    price: {
        type:Number
    },
    tname : {
        type:String
    },
    qty:{
        type:Number,
        required:true,
        default:1
    }
  });


module.exports = mongoose.model('ingreCart', IngredientCartSchema);