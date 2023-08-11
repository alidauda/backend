import express from 'express';
import { addToCart, deleteCart, getCart } from '../handlers/cart';

const proctectedCart = express.Router();

//create cart for a user

proctectedCart.post('/create_cart', addToCart);

// Update a cart's information
proctectedCart.post('/update_cart', addToCart);

//delete cart
proctectedCart.delete('/delete_cart', deleteCart);

//get cart
proctectedCart.get('/get_cart', getCart);

export default proctectedCart;
