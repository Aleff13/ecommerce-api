import express from 'express'
import { ErrorCallback } from 'typescript';
import { Log } from '../../models/log';
import { Product } from '../../models/product'
import logRepository from '../../repositories/logRepository';
import productRepository from '../../repositories/productRepository'

const productRouter = express.Router();

productRouter.get('/product', (req, res) => {
    console.log(req)
    productRepository.getAllProducts((products) => {
        res.status(200).json(products)
    })
})

productRouter.post('/product', (req, res) => {
    // if (!req.body) {
    //     logRepository.newLog(` --- requisição sem body --- `, () => {
    //         res.status(406).json()
    //     })
    // }

    console.log(req.body)

    const products: Product[] = req.body
    
    products.forEach(product => {
        if(!product.name || !product.price || !product.stock || !product.image){
            console.log('vazio')
            return
        }
        productRepository.createProduct(product, (id) => {
            console.log(id)
        })

    })

    res.status(201).json(products)

})

export default productRouter;