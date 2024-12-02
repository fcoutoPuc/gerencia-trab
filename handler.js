import AWS from 'aws-sdk'
import express from 'express'
import serverless from 'serverless-http'

import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './src/product/controller/productController.js'
const app = express();



app.use(express.json());


app.post('/products', createProduct);

// Route to get a product by ID
app.get('/products/:id', getProduct);

// Route to update a product by ID
app.put('/products/:id', updateProduct);

// Route to delete a product by ID
app.delete('/products/:id', deleteProduct);


// Route to list all products
app.get('/products', listProducts);

// app.get('/products', async (req, res) => {
//     // const { name, amount, price } = req.body;
//     return res.status(200).json({ productCreated: `vaii` })
// })


app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

export const handler = serverless(app);