//server.ts
import express from 'express'
import { agendamentosRoutes } from './routes/agendamentos.routes'
import { logRequests } from './middlewares/logger'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json())

app.use(logRequests)

app.use('/agendamentos', agendamentosRoutes)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
