import { RequestHandler } from 'express';
import Products from '../class/Products';

// Obtener todos los productos o uno por su id
export const getProduct: RequestHandler  = async (req, resp) => {
    try {
        if (req.query.id) {
            // Devuelve un producto según su id
            // const { id } = req.params;
    
            const data = await Products.getById(parseInt(req.query.id as string));
    
            return resp.json(data);
    
        } else {
            // Devuelve todos los productos
            const dataAll = await Products.getAll();
    
            return resp.json(dataAll);
        }
    } catch (error) {
        console.log(`Error al obtener producto ${error}`);
    }
};

// Recibe y agrega un producto
export const addProduct: RequestHandler = async (req, resp) => {
    const { admin, ...data } = req.body;

    try {
        const product = await Products.gerateProduct(data);

        return resp.json(product);
    } catch (error) {
        console.log(`Error al agregar producto ${error}`);
    }
};

// Recibe y actualiza un producto según su id
export const updateProduct: RequestHandler = async (req, resp) => {
    const { id } = req.params;
    const { admin, ...data } = req.body;

    try {
        const product = await Products.updateProduct(parseInt(id), data);

        return resp.json(product);
    } catch (error) {
        console.log(`Error al actualizar producto ${error}`);
    }
}

// Elimina un producto según su id
export const deleteProduct: RequestHandler = async (req, resp) => {
    const { id } = req.params;
    const { admin } = req.body;

    try {
        await Products.deleteById(parseInt(id));

        resp.json({ removed: `${id}` });
    } catch (error) {
        console.log(`Error al eliminar producto ${error}`);
    }
};