//agendamentos.controller.ts
import { Request, Response } from 'express'
import {
  Agendamento,
  agendamentos,
  atualizarAgendamentos,
  servicos,
} from '../database/agendamentos'
import { prisma } from '../lib/prisma'

export async function criarAgendamento(req: Request, res: Response) {
  const { nome, servico, data, hora } = req.body as Agendamento

  if (!servico || !data || !hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' })
  }

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome inválido' })
  }

  if (!servicos.includes(servico)) {
    return res.status(400).json({ erro: 'Serviço inválido' })
  }

  const existe = await prisma.agendamento.findFirst({
    where: {
      data,
      hora,
    },
  })

  if (existe) {
    return res.status(400).json({ erro: 'Horário já ocupado' })
  }

  const novo = await prisma.agendamento.create({
    data: {
      nome,
      servico,
      data,
      hora,
    },
  })

  res.status(201).json(novo)
}

export function listarAgendamentos(req: Request, res: Response) {
  res.json(agendamentos)
}

export function buscarPorId(req: Request, res: Response) {
  const { id } = req.params

  const registro = agendamentos.find((item) => item.id === id)

  if (!registro) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  res.json(registro)
}

export function atualizarAgendamento(req: Request, res: Response) {
  const { id } = req.params
  const dados = req.body

  const index = agendamentos.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  const atual = agendamentos[index]!
  const atualizado = { ...atual, ...dados }

  // valida nome
  if (atualizado.nome && atualizado.nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome inválido' })
  }

  // valida serviço
  if (atualizado.servico && !servicos.includes(atualizado.servico)) {
    return res.status(400).json({ erro: 'Serviço inválido' })
  }

  // valida conflito de horário
  const conflito = agendamentos.find(
    (item) =>
      item.data === atualizado.data &&
      item.hora === atualizado.hora &&
      item.id !== id
  )

  if (conflito) {
    return res.status(400).json({ erro: 'Horário já ocupado' })
  }

  agendamentos[index] = atualizado

  res.json(atualizado)
}

export function deletarAgendamento(req: Request, res: Response) {
  const { id } = req.params

  const novaLista = agendamentos.filter((item) => item.id !== id)

  atualizarAgendamentos(novaLista)

  res.status(204).send()
}
