const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pizzas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pizzas'
  }]
});

module.exports = mongoose.model('allCart', cartSchema);



//////////////////////////////////////////////////////////////
//apis
// Get cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('pizzas');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add pizza to cart
router.post('/:userId/add', async (req, res) => {
  const { pizzaId } = req.body;
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId });

    // Check if cart exists for the user, if not create a new one
    if (!cart) {
      const newCart = new Cart({ userId, pizzas: [pizzaId] });
      await newCart.save();
      res.status(201).json(newCart);
    } else {
      // Check if the pizza is already in the cart
      if (cart.pizzas.includes(pizzaId)) {
        return res.status(400).json({ message: 'Pizza already in the cart' });
      }

      cart.pizzas.push(pizzaId);
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove pizza from cart
router.delete('/:userId/remove/:pizzaId', async (req, res) => {
  const userId = req.params.userId;
  const pizzaId = req.params.pizzaId;

  try {
    const cart = await Cart.findOne({ userId });

    // Check if cart exists for the user
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the pizza is in the cart
    const index = cart.pizzas.indexOf(pizzaId);
    if (index === -1) {
      return res.status(404).json({ message: 'Pizza not found in the cart' });
    }

    // Remove the pizza from the cart
    cart.pizzas.splice(index, 1);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

