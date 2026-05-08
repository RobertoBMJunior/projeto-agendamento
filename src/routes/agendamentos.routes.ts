//agendamentos.routes.ts
import { Router } from 'express'
import {
  AtualizarAgendamento,
  BuscarPorId,
  CriarAgendamento,
  DeletarAgendamento,
  ListarAgendamentos,
} from '../controllers/agendamento.controller.js'

export const agendamentosRoutes = Router()


// Criar
agendamentosRoutes.post('/agendamentos', CriarAgendamento)

// Listar todos
agendamentosRoutes.get('/agendamentos', ListarAgendamentos)

// Buscar por ID
agendamentosRoutes.get('/agendamentos/:id', BuscarPorId)

// Atualizar
agendamentosRoutes.put('/agendamentos/:id', AtualizarAgendamento)

// Deletar
agendamentosRoutes.delete('/agendamentos/:id', DeletarAgendamento)
