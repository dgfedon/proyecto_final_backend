import { RequestHandler } from 'express';
import { Cart, User } from '../daos';
import { Product } from '../daos';
import { ICart } from '../types/cart';
import { sendMail } from '../utils/sendMail';
import { sendSMS, sendWhatsApp } from '../utils/twilio';

export const createCart: RequestHandler = async (req, res) => {
  try {
    const cart = await Cart.createCart();

    return res.status(200).json({ cartId: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    await Cart.delete(req.params.id);

    return res.status(200).json({
      message: `Cart with ID: ${req.params.id} deleted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getCartProducts: RequestHandler = async (req, res) => {
  try {
    const cart = await Cart.getById(req.params.id);

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // @ts-ignore
    cart.products = await Promise.all(
      // @ts-ignore
      cart?.products.map(async (id: string) => {
        const product = await Product.getById(id);
        return product;
      })
    );

    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const addProductToCart: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const product = await Product.getById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    console.log(id, productId);

    const cart = await Cart.addProductToCart(id, productId);

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const removeProductFromCart: RequestHandler = async (req, res) => {
  const { id, productId } = req.params;

  try {
    await Cart.deleteProductFromCart(id, productId);

    return res.status(200).json({
      message: `Product with ID: ${productId} removed from cart with ID: ${id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const processCartOrder: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'No user' });
  const { cart } = req.body;

  if (!cart) return res.status(400).json({ message: 'No cart' });

  try {
    //   @ts-expect-error
    const fullUser = await User.getById(req.user.id);

    if (!fullUser) throw new Error();

    // Twilio no me deja sacar un numero, no se porque ya les escribi pero no obtuve respuesta todavia
    await sendSMS({
      body: 'Ya recibimos tu pedido y estamos procesandolo!',
      from: process.env.TEL!,
      to: fullUser.tel,
    });

    await sendWhatsApp({
      body: JSON.stringify(cart),
      to: process.env.ADMIN_TEL!,
      from: process.env.WAPP_TEL!,
    });

    await sendMail({
      to: process.env.DEST_EMAIL,
      from: 'Server',
      text: JSON.stringify(cart),
    });

    return res.json({
      cart,
      message: 'Order created',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo salio mal' });
  }
};
