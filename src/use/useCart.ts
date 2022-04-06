import { RequestHandler } from 'express';
import Cart from '../class/Cart';
import Products from '../class/Products';

// Crea un carrito y devuelve su id
export const addCart: RequestHandler = async (req, resp) => {
    try {
        const data = await Cart.createCart();

        return resp.json({ data })
    } catch (error) {
        return resp.json({
            error: `Error al agregar carrito ${error}`,
        });
    }
};

// Vacía un carrito y lo elimina
export const deleteCartAll: RequestHandler = async (req, resp) => {
    try {
        // const { id } = req.params;
        await Cart.deleteById(parseInt(req.params.id));

        return resp.json({ removed: `${req.params.id}` });
    } catch (error) {
        return resp.json({
            error: `Error al eliminar carrito ${error}`,
        });
    }
};

// Todos los productos guardados en el carrito
export const getCartAll: RequestHandler = async (req, resp) => {
    try {
        // const { id } = req.params;
        const dataCart = await Cart.getById(parseInt(req.params.id));

        return resp.json({ products: dataCart?.products });
    } catch (error) {
        return resp.json({
            error: `Error al obtener productos del carrito ${error}`,
        });
    }
};

// Incorporar productos al carrito por su id
export const addToCart: RequestHandler = async (req, resp) => {
    const { id } = req.params;
    const { prodId } = req.body;

    try {
        const product = await Products.getById(prodId);

        if (!product) return resp.json({ error: 'Error al encontrar producto' });

        const dataCart = await Cart.addProdToCart(parseInt(id), product!);

        return resp.json(dataCart);
    } catch (error) {
        return resp.json({
            error: `Error al incorporar productos al carrito ${error}`,
        });
    }
};

// Eliminar un producto del carrito por su id 
export const deleteToCart: RequestHandler = async (req, resp) => {
    try {
        const { id, prodId } = req.params;

        const dataCart = await Cart.deleteProdToCart(parseInt(id), parseInt(prodId));

        return resp.json(dataCart)
    } catch (error) {
        return resp.json({
            error: `Error al eliminar producto del carrito ${error}`,
        });
    }
};