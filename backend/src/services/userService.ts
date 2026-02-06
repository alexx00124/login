import { PrismaClient } from '../../generated/prisma/index'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

export class UserService {
  static async registerUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos')
    }

    if (!email.includes('@')) {
      throw new Error('Email inválido')
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('El usuario ya existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...userWithoutPassword } = newUser

    return userWithoutPassword
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}