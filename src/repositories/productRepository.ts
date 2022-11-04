import { Product } from "../models/product";
import database from "./database";

const productRepository = {
    getAllProducts: (callback: (product: Product[]) => void) => {
        const sql = 'SELECT * FROM product limit 10';
        database.all(sql, (err, rows) => callback(rows))
    },

    createProduct: (product: Product, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO product (name, price, stock, image) VALUES (?, ?, ?, ?)'
        const params = [product.name, product.price, product.stock, product.image]
        database.run(sql, params, function (err) {
            callback(this?.lastID)
        })
    },

    getProductById: (id: number, callback: (product: Product) => void) => {
        const sql = 'SELECT * FROM product WHERE id = ?'
        const params = [id]
        database.get(sql, params, (err, row) => callback(row))
    },

    deleteProductById: (id: number, callback: (err: any) => void) => {
        const sql = 'DELETE FROM product WHERE id = ?'
        const params = [id]
        database.run(sql, params, (err) => callback(err))
    },

    updateProductById: (product: Product, callback: (id?: number) => void) => {
        const sql = 'UPDATE product SET name = ?, price = ?, stock = ? WHERE id = ? '
        const params = [product.name, product.price, product.stock]
        database.run(sql, params, function (err){
            callback(this?.lastID)
        })
    }
}

export default productRepository