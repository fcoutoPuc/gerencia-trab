
import { createProduct as create, getProduct as get, updateProduct as update, deleteProduct as del, listProducts as list } from '../service/productService.js';
import { Product } from '../models/product.js'

export const createProduct = async (req, res) => {
    try {
        const { name, amount, price } = req.body;
        const newProduct = new Product(Date.now().toString(), name, amount, price);
        const createdProduct = await create(newProduct);
        return res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Error creating product' });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await get(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Error fetching product' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await update(id, updatedData);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Error updating product' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await del(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Error deleting product' });
    }
};

export const listProducts = async (req, res) => {
    try {
        const products = await list();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error listing products:', error);
        return res.status(500).json({ error: 'Error listing products' });
    }
};
