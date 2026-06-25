//agendamentos.controller.ts
import { Request, Response } from 'express'
import { Agendamento, servicos } from '../database/agendamentos'
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

export async function listarAgendamentos(req: Request, res: Response) {
  const dados = await prisma.agendamento.findMany()

  res.json(dados)
}

export async function buscarPorId(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params

  const registro = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  })

  if (!registro) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  res.json(registro)
}

export async function atualizarAgendamento(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params
  const dados = req.body as Agendamento

  const agendamentoAtual = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  })

  if (!agendamentoAtual) {
    return res.status(404).json({ erro: 'Agendamento não encontrado' })
  }

  const atualizado = { ...agendamentoAtual, ...dados }

  // valida nome
  if (atualizado.nome && atualizado.nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome inválido' })
  }

  // valida serviço
  if (atualizado.servico && !servicos.includes(atualizado.servico)) {
    return res.status(400).json({ erro: 'Serviço inválido' })
  }

  // valida conflito de horário
  const conflito = await prisma.agendamento.findFirst({
    where: {
      data: atualizado.data,
      hora: atualizado.hora,
      id: {
        not: id,
      },
    },
  })

  if (conflito) {
    return res.status(400).json({ erro: 'Horário já ocupado' })
  }

  const registroAtualizado = await prisma.agendamento.update({
    where: { id },
    data: {
      nome: atualizado.nome.trim(),
      servico: atualizado.servico,
      data: atualizado.data,
      hora: atualizado.hora,
    },
  })

  res.json(registroAtualizado)
}

export async function deletarAgendamento(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params

  const existe = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  })

  if (!existe) {
    return res.status(404).json({ erro: 'Agendamento não encontrado' })
  }

  await prisma.agendamento.delete({
    where: {
      id,
    },
  })

  res.status(204).send()
}
