import AWS from 'aws-sdk'
import express from 'express'
import serverless from 'serverless-http'

import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './src/product/controller/productController.js'
const app = express();



app.use(express.json());


app.post('/products', createProduct);


app.get('/products/:id', getProduct);

app.put('/products/:id', updateProduct);

app.delete('/products/:id', deleteProduct);


app.get('/products', listProducts);

// app.get('/teste/products', async (req, res) => {
//     return res.status(200).json({
//         name: 'Hello',
//     });
// });

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

export const handler = serverless(app);