import express, { Response } from 'express';
import cors from 'cors';
import database from './repositories/database';
import productRouter from './routes/api/productRouter';

const db = database;

const PORT = 4000
const HOSTNAME = 'http://localhost'

const app = express()

app.get('/', (req, res: Response) => {
    res.send('Bem vindo!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/api/', productRouter)

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Porta ${PORT}`)
})