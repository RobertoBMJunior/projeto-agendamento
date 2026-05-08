//agendamentos.ts
export interface Agendamento {
  id: string
  nome: string
  servico: string
  data: string
  hora: string
}

export let agendamentos: Agendamento[] = []

export const servicos = ['corte', 'barba', 'sobrancelha']

export function atualizarAgendamentos(novaLista: Agendamento[]) {
  agendamentos = novaLista
}
