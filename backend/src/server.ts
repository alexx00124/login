import express from 'express'
import cors from 'cors'
import { UserController } from './controllers/userController'

const app = express()

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))

app.use(express.json())

const PORT = process.env.PORT || 3000

app.post('/register', UserController.register)
app.post('/login', UserController.login)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
  console.log(`Frontend URL permitido: http://localhost:5173`)
})