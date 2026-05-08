//server.ts
import express from 'express'
import { agendamentosRoutes } from './routes/agendamentos.routes'
import { logRequests } from './middlewares/logger'

const app = express()

app.use(express.json())

app.use(logRequests)

app.use('/agendamentos', agendamentosRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
