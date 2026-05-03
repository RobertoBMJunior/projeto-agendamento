import express from 'express'
import crypto from 'crypto'

const app = express()

app.use(express.json())

let agendamentos = []

const servicos = ['corte', 'barba', 'sobrancelha']

// Criar
app.post('/agendamentos', (req, res) => {
  const { nome, servico, data, hora } = req.body

  if (!servico || !data || !hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' })
  }

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome inválido' })
  }

  if (!servicos.includes(servico)) {
    return res.status(400).json({ erro: 'Serviço inválido' })
  }

  const existe = agendamentos.find(
    (item) => item.data === data && item.hora === hora
  )

  if (existe) {
    return res.status(400).json({ erro: 'Horário já ocupado' })
  }

  const novo = {
    id: crypto.randomUUID(),
    nome,
    servico,
    data,
    hora,
  }

  agendamentos.push(novo)

  res.status(201).json(novo)
})

// Listar todos
app.get('/agendamentos', (req, res) => {
  res.json(agendamentos)
})

// Buscar por ID
app.get('/agendamentos/:id', (req, res) => {
  const { id } = req.params

  const registro = agendamentos.find((item) => item.id === id)

  if (!registro) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  res.json(registro)
})

// Atualizar
app.put('/agendamentos/:id', (req, res) => {
  const { id } = req.params
  const dados = req.body

  const index = agendamentos.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  const atual = agendamentos[index]
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
})

// Deletar
app.delete('/agendamentos/:id', (req, res) => {
  const { id } = req.params

  agendamentos = agendamentos.filter((item) => item.id !== id)

  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
