import { RequestHandler } from 'express';
import { Product } from '../daos';

export const getProducts: RequestHandler = async (req, res) => {
  try {
    if (req.query.id) {
      const product = await Product.getById(req.query.id as string);

      return res.status(200).json(product);
    } else {
      const products = await Product.getAll();

      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const addProduct: RequestHandler = async (req, res) => {
  const { admin, ...data } = req.body;

  try {
    const product = Product.create(data);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { admin, ...data } = req.body;
  console.log(id);

  try {
    const products = await Product.update(id, data);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    await Product.delete(id);

    return res.status(200).json({ message: `Product with ID: ${id} deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
