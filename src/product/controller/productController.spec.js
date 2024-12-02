import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './productController.js';
import { createProduct as create, getProduct as get, updateProduct as update, deleteProduct as del, listProducts as list } from '../service/productService.js';
import { Product } from '../models/product.js';

// Mock the service methods
jest.mock('../service/productService.js');

describe('Product Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });



    it('should fetch a product by ID and return 200 status', async () => {
        const product = new Product('1', 'Product A', 100, 25.99);

        // Mock the get service response
        get.mockResolvedValue(product);

        const req = { params: { id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(product);
        expect(get).toHaveBeenCalledWith('1');
    });

    it('should return 404 if product not found', async () => {
        // Mock the get service to return null (product not found)
        get.mockResolvedValue(null);

        const req = { params: { id: '999' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should update a product and return 200 status', async () => {
        const updatedProduct = new Product('1', 'Product A Updated', 120, 29.99);

        // Mock the update service response
        update.mockResolvedValue(updatedProduct);

        const req = { params: { id: '1' }, body: { name: 'Product A Updated', amount: 120, price: 29.99 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedProduct);
        expect(update).toHaveBeenCalledWith('1', { name: 'Product A Updated', amount: 120, price: 29.99 });
    });

    it('should delete a product and return 200 status', async () => {
        // Mock the delete service response
        del.mockResolvedValue({ message: 'Product deleted successfully' });

        const req = { params: { id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
        expect(del).toHaveBeenCalledWith('1');
    });

    it('should list all products and return 200 status', async () => {
        const products = [
            new Product('1', 'Product A', 100, 25.99),
            new Product('2', 'Product B', 50, 15.99),
        ];

        // Mock the list service response
        list.mockResolvedValue(products);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await listProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(products);
        expect(list).toHaveBeenCalled();
    });
});
