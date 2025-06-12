/* jshint esversion: 8 */
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const pizza = require('./models/pizzas');
const ingredients = require('./models/ingredients');
const cartlist = require('./models/cart');
const ingreCart = require('./models/ingreCart');
const pizzas = require('./models/pizzas');
const bcrypt = require('bcrypt');
const user = require('./models/user');

let route = express.Router();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));

route.get("/", (req, res) => {
  res.send("Pizzeria App");
});

// Get all pizzas data from database
route.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await pizza.find({});
    if (!pizzas) {
      res.json({ message: "data not coming", err });
    }
    res.json(pizzas);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get all ingredients data from database
route.get('/ingredients', async (req, res) => {
  try {
    const ingre = await ingredients.find({});

    if (!ingre) {
      res.json({ message: "Error" });
    }
    res.json(ingre);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

// Get one pizza by id
route.get('/pizzas/:id', async (req, res) => {
  try {
    const pizzas = await pizza.find({ id: req.params.id });
    console.log("not found id", pizzas);
    if (!pizzas) {
      return res.json({ success: false, message: 'Pizza not found' });
    }
    res.json(pizzas);
    // res.json({ success: true, message: 'Pizza added to cart' });
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

// Get one Ingredient by id
route.get('/ingredients/:ingredientId', async (req, res) => {
  let ingredients = req.body;
  try {
    const ingredient = await ingredients.find({ id: req.params.ingredientId });
    if (!ingredient) {
      return res.json({ success: false, message: 'Ingredient not found' });
    }
    res.json({ success: true, message: 'Ingredient added to cart' });
  } catch (err) {
    res.json({ success: false, message: err });
  }
});



//Api for insert ingredients in database
route.post('/ingadd', async (req, res) => {
  try {
    const ingredients = req.body; // array of ingredients
    const savedIngredients = await ingreCart.insertMany(ingredients); // Save array of objects
    console.log("Ingredients added to database:");
    res.json(savedIngredients);
  } catch (err) {
    console.error("Error adding ingredients to database:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Api for get Ingredients in cart from database
route.get('/cartIngre', async (req, res) => {
  try {
    const ingredients = await ingreCart.find({}); // Fetch all ingredients from the collection
    res.json(ingredients);
  } catch (err) {
    console.error("Error getting ingredients from database:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Api for insert cartlist in database
route.post('/cart', async (req, res) => {
  try {
    const cartlistItem = new cartlist(req.body);
    await cartlistItem.save();
    res.json({ message: 'Item added to cart successfully', cartlistItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});


//Api for get Ingredients in cart from database
route.get('/cartitem', async (req, res) => {
  try {
    const cartItems = await cartlist.find({});
    if (!cartItems) {
      return res.json({ messge: 'Item not found' });
    }
    res.status(200).send(cartItems);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
});

//delete pizza item in cart
route.delete('/deleteItem', async (req, res) => {
  const itemId = req.body.pizzaid;
  try {
    await cartlist.deleteOne({ _id: itemId });
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.json({ error: 'Failed to remove item from cart' });
  }
});

//delete ingredients item in cart  
route.delete('/deleteIngre', async (req, res) => {
  const itemId = req.body.igreId;
  
  try {
    await ingreCart.deleteOne({ _id: itemId });
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.json({ error: 'Failed to remove item from cart' });
  }
});

// Increment quantity
route.put('/increment', async (req, res) => {
  try {
    const itemId = req.body.pizzaid;
    console.log("increment api",itemId);
    const incQty = await cartlist.findOne({_id:itemId});
    if (!incQty) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    incQty.qty += 1;
    await incQty.save();
    console.log("in api .qty",incQty);
    res.json(incQty);
  } catch (err) {
    console.error("Error incrementing quantity:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Decrement quantity
route.put('/decrement', async (req, res) => {
  const dataId = req.body.pizzaid;
  try {
    const decQty = await cartlist.findOne({_id:dataId});
    if (!decQty) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    if (decQty.qty > 1) {
      decQty.qty -= 1;
      await decQty.save();
    }
    res.json(decQty);
  } catch (err) {
    console.error("Error decrementing quantity:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Register User
route.post("/register",async(req,res)=>{
  const {username, password} = req.body;
  try {
    // console.log("in api",{username, password});
    const hashedPassword = await bcrypt.hash(password,10);
    const userData = new user({username,password:hashedPassword});
    console.log("in api hash",userData);
    await userData.save();
    res.status(200).json({message:'User registered Successfully'});
  } catch (error) {
    res.status(500).json({message:'error in registering',error});
  }
})

//login api
route.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // console.log(req.body);
    const userData = await user.findOne({ username: username });
    console.log("userdata ", userData);
    
    if (!userData) {
      return res.status(401).json({ message: 'Invalid username and password' });
    }
    
    const validPass = await bcrypt.compare(password, userData.password);
    
    console.log("valid pass ", validPass);
    
    if (!validPass) {
      return res.status(401).json({ message: 'Invalid username and password' });
    }
    
    console.log("in login api", userData, validPass);
    res.status(200).json({ message: 'Login Successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error });
  }
});



module.exports = route;

