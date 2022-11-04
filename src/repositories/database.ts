import sqlite3 from 'sqlite3'
const DBSOURCE = 'db.sqlite'

const SQL_PRODUCT_CREATE = `
    CREATE TABLE product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        stock INTEGER,
        image TEXT
    )`

const SQL_CLIENT_CREATE = `
    CREATE TABLE client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
    )
`

const SQL_LOG_CREATE = `
    CREATE TABLE log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT
    )
`

const SQL_SALE_CREATE = `
    CREATE TABLE client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart INTEGER
    )
`

const SQL_ACTIONS = [SQL_CLIENT_CREATE, SQL_PRODUCT_CREATE, SQL_LOG_CREATE]

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        SQL_ACTIONS.forEach((sql, index) => {
            database.run(sql, (err) => {
                if (err) {
                    console.error(err)
                    // Possivelmente a tabela já foi criada
                } else {
                    console.log(`Tabela ${index} criada com sucesso.`)
                }
            })
        })

    }
})

export default database