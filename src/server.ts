//server.ts
import express from 'express'
import { agendamentosRoutes } from './routes/agendamentos.routes.js'
import { logRequests } from './middlewares/logger.js'

const app = express()

app.use(express.json())

app.use(logRequests)

app.use(agendamentosRoutes)

export interface Agendamento {
  id: string
  nome: string
  servico: string
  data: string
  hora: string
}

export let agendamentos: Agendamento[] = []
export const servicos = ['corte', 'barba', 'sobrancelha']

export function AtualizarAgendamentos(novaLista: Agendamento[]) {
  agendamentos = novaLista
}

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
