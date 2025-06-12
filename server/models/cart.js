// let mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     pizza:{
//         // type:mongoose.Schema.Types.id,
//         // ref:'pizzas',
//         type:Array,
//         required:true
//     },
//     quantity:{
//         type:Number,
//         required: true,
//         min:1
//     },
//     ingredients:{
//         type:Array,
//     },
//     totalPrice:{
//         type:Number,
//         required:true
//     }
// });

// module.exports = mongoose.model('CartItem',cartSchema);


/* jshint esversion: 8 */

const mongoose = require('mongoose');
 
const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    // enum: ['veg', 'non-veg'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  topping: {
    type: Array,
    required: true
  },
  qty:{
    type:Number,
    required:true,
    default: 1
  }
});
 
module.exports = mongoose.model('cartlist', cartSchema);
 