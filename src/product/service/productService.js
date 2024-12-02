import AWS from 'aws-sdk';
import { Product } from '../models/product.js';

const dynamoDB = new AWS.DynamoDB();
const tableName = process.env.PRODUCTS_TABLE;

export const createProduct = async (product) => {
    const params = {
        TableName: tableName,
        Item: product.toDynamoDB(),
    };

    try {
        await dynamoDB.putItem(params).promise();
        return product;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Unable to create product');
    }
};

export const getProduct = async (id) => {
    const params = {
        TableName: tableName,
        Key: {
            id: { S: id },
        },
    };

    try {
        const result = await dynamoDB.getItem(params).promise();
        if (!result.Item) return null;
        return Product.fromDynamoDB(result.Item);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Unable to fetch product');
    }
};

export const updateProduct = async (id, updatedData) => {
    const existingProduct = await getProduct(id);
    if (!existingProduct) {
        throw new Error('Product not found');
    }

    const updatedProduct = new Product(
        id,
        updatedData.name || existingProduct.name,
        updatedData.amount || existingProduct.amount,
        updatedData.price || existingProduct.price
    );

    const params = {
        TableName: tableName,
        Key: { id: { S: id } },
        UpdateExpression: 'SET #name = :name, amount = :amount, price = :price',
        ExpressionAttributeNames: {
            '#name': 'name',
        },
        ExpressionAttributeValues: {
            ':name': { S: updatedProduct.name },
            ':amount': { N: updatedProduct.amount.toString() },
            ':price': { N: updatedProduct.price.toString() },
        },
    };

    try {
        await dynamoDB.updateItem(params).promise();
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Unable to update product');
    }
};

export const deleteProduct = async (id) => {
    const params = {
        TableName: tableName,
        Key: { id: { S: id } },
    };

    try {
        await dynamoDB.deleteItem(params).promise();
        return { message: 'Product deleted' };
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Unable to delete product');
    }
};

export const listProducts = async () => {
    const params = {
        TableName: tableName,
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        const products = result.Items.map(item => Product.fromDynamoDB(item));
        return products;
    } catch (error) {
        console.error('Error listing products:', error);
        throw new Error('Unable to list products');
    }
};
