const express = require('express')

const app = express()

app.use(express.json())

let agendamentos = []

// Criar
app.post('/agendamentos', (req, res) => {
  const { id, nome, servico, data, hora } = req.body

  if (!id || !nome || !servico || !data || !hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' })
  }

  const existe = agendamentos.find((a) => a.data === data && a.hora === hora)

  if (existe) {
    return res.status(400).json({ erro: 'Horário já ocupado' })
  }

  const novo = { id, nome, servico, data, hora }

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

  const registro = agendamentos.find((item) => item.id === Number(id))

  if (!registro) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  res.json(registro)
})

// Atualizar
app.put('/agendamentos/:id', (req, res) => {
  const { id } = req.params
  const dados = req.body

  let encontrado = false

  agendamentos = agendamentos.map((item) => {
    if (item.id === Number(id)) {
      encontrado = true
      return { ...item, ...dados }
    }
    return item
  })

  if (!encontrado) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }

  res.json({ mensagem: 'Atualizado com sucesso' })
})

// Deletar
app.delete('/agendamentos/:id', (req, res) => {
  const { id } = req.params

  agendamentos = agendamentos.filter((item) => item.id !== Number(id))

  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Servidor rodando')
})
