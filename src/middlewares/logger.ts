//logger.ts
import { Request, Response, NextFunction } from 'express'

export function logRequests(req: Request, res: Response, next: NextFunction) {
  const { method, url } = req

  // Exemplo de saída: [POST] /agendamentos
  console.log(`[${method}] ${url}`)

  // IMPORTANTE: Chamar o next() para a requisição não ficar travada!
  next()
}
