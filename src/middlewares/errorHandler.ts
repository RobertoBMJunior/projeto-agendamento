// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client' // Importa os tipos de erro do Prisma

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Mostra o erro real no terminal do servidor para você debugar
  console.error('🚨 Erro capturado pelo Middleware Global:', error)

  // 2. Se o erro veio especificamente do Prisma (ex: erro de validação ou banco fora do ar)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Código P2025: Registro não encontrado (comum no delete/update)
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ erro: 'O registro solicitado não foi encontrado no banco.' })
    }

    // Código P2002: Violação de campo único (Unique constraint)
    if (error.code === 'P2002') {
      return res
        .status(400)
        .json({ erro: 'Já existe um registro com estes dados únicos.' })
    }
  }

  // 3. Resposta genérica segura para o cliente (Status 500)
  return res.status(500).json({
    erro: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  })
}
