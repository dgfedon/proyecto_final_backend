import { Router } from 'express';
import {
  addProductToCart,
  createCart,
  deleteCart,
  getCartProducts,
  processCartOrder,
  removeProductFromCart,
} from '../controllers/cart';

const cartRoutes = Router();

// Crear carrito
cartRoutes.post('/', createCart);
// Borrar carrito
cartRoutes.delete('/:id', deleteCart);
// Listar productos del carrito
cartRoutes.get('/:id/products', getCartProducts);
// Agregar productos al carrito
cartRoutes.post('/:id/products', addProductToCart);
// Borrar productos del carrito
cartRoutes.delete('/:id/products/:productId', removeProductFromCart);

cartRoutes.post('/buy', processCartOrder);

export { cartRoutes };
