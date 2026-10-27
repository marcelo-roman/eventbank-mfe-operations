import { type Locale } from './locale';

const en = {
  errors: {
    generic: 'Something failed. Try again.',
    sessionEnded: 'Your session ended. Sign in again.',
    forbidden: 'You are not allowed to do this.',
    status: (status: number) => `The server answered ${status}.`,
    codes: {
      not_found: 'This was not found.',
      forbidden: 'You are not allowed to do this.',
      concurrency_conflict: 'Someone changed this at the same time. Try again.',
    } as Record<string, string>,
  },
  projections: {
    title: 'Projections',
    lede: 'Each service follows its own event store with checkpointed subscriptions. Rebuilding a read model deletes it and replays every event from the start; the screens fill up again as the checkpoint moves.',
    services: {
      customers: 'Customers service',
      accounts: 'Accounts service',
      transfers: 'Transfers service',
      cards: 'Cards service',
    },
    purposes: {
      'read-models': 'Projects events into the tables the screens read.',
      'integration-events': 'Turns events into messages for the other service, through RabbitMQ.',
    } as Record<string, string>,
    checkpoint: 'Checkpoint',
    position: (position: number, head: number) => `${position} of ${head}`,
    behind: 'Behind',
    caughtUp: 'Caught up',
    eventsBehind: (lag: number) => `${lag} events`,
    lastMoved: 'Last moved',
    rebuilding: 'Rebuilding…',
    rebuild: 'Rebuild from events',
  },
};

export type Messages = typeof en;

const ptBR: Messages = {
  errors: {
    generic: 'Algo deu errado. Tente de novo.',
    sessionEnded: 'Sua sessão terminou. Entre novamente.',
    forbidden: 'Você não tem permissão para fazer isso.',
    status: (status: number) => `O servidor respondeu ${status}.`,
    codes: {
      not_found: 'Não encontrado.',
      forbidden: 'Você não tem permissão para fazer isso.',
      concurrency_conflict: 'Alguém alterou isto ao mesmo tempo. Tente de novo.',
    },
  },
  projections: {
    title: 'Projeções',
    lede: 'Cada serviço acompanha o próprio event store com assinaturas que guardam checkpoint. Reconstruir um read model apaga a tabela e reproduz todos os eventos desde o início; as telas voltam a se preencher conforme o checkpoint avança.',
    services: {
      customers: 'Serviço de clientes',
      accounts: 'Serviço de contas',
      transfers: 'Serviço de transferências',
      cards: 'Serviço de cartões',
    },
    purposes: {
      'read-models': 'Projeta os eventos nas tabelas que as telas leem.',
      'integration-events': 'Transforma eventos em mensagens para os outros serviços, pelo RabbitMQ.',
    },
    checkpoint: 'Checkpoint',
    position: (position: number, head: number) => `${position} de ${head}`,
    behind: 'Atraso',
    caughtUp: 'Em dia',
    eventsBehind: (lag: number) => `${lag} eventos`,
    lastMoved: 'Último avanço',
    rebuilding: 'Reconstruindo…',
    rebuild: 'Reconstruir a partir dos eventos',
  },
};

export const messages: Record<Locale, Messages> = { en, 'pt-BR': ptBR };
