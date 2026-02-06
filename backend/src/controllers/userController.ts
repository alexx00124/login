import { Request, Response } from 'express'
import { UserService } from '../services/userService'

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const newUser = await UserService.registerUser(email, password)

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser
      })
    } catch (error: any) {
      const status = error.message.includes('ya existe') ? 409 : 400
      res.status(status).json({
        message: error.message || 'Error al registrar usuario'
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email y contraseña son requeridos'
        })
      }

      const user = await UserService.getUserByEmail(email)

      if (!user) {
        return res.status(401).json({
          message: 'Credenciales inválidas'
        })
      } 

      const isValidPassword = await UserService.verifyPassword(password, user.password)

      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Credenciales inválidas'
        })
      }

      const { password: _, ...userWithoutPassword } = user

      res.json({
        message: 'Login exitoso',
        user: userWithoutPassword
      })
    } catch (error: any) {
      res.status(500).json({
        message: 'Error en el servidor'
      })
    }
  }
}