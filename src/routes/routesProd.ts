import { addProduct, deleteProduct, getProduct, updateProduct } from '../use/useProducts';
import { accesoAdmin } from '../use/useAcceso';
import { Router } from 'express';

const routerProd = Router();

routerProd.get('/:id?', getProduct);
routerProd.post('/', accesoAdmin, addProduct);
routerProd.put('/:id', accesoAdmin, updateProduct);
routerProd.delete('/:id', accesoAdmin, deleteProduct);

export { routerProd };