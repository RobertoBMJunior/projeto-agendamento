//agendamentos.routes.ts
import { Router } from 'express'
import {
  atualizarAgendamento,
  buscarPorId,
  criarAgendamento,
  deletarAgendamento,
  listarAgendamentos,
} from '../controllers/agendamentos.controller'

export const agendamentosRoutes = Router()

// Criar
agendamentosRoutes.post('/', criarAgendamento)

// Listar todos
agendamentosRoutes.get('/', listarAgendamentos)

// Buscar por ID
agendamentosRoutes.get('/:id', buscarPorId)

// Atualizar
agendamentosRoutes.put('/:id', atualizarAgendamento)

// Deletar
agendamentosRoutes.delete('/:id', deletarAgendamento)
