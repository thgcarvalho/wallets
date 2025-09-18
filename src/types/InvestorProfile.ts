export interface QuestionAnswer {
  questionId: number;
  answerId: number;
  points: number;
}

export interface InvestorProfile {
  profile: 'Conservador' | 'Moderado' | 'Agressivo' | 'Degenerado';
  score: number;
  answers: QuestionAnswer[];
  createdAt: string;
}

export interface Answer {
  id: number;
  text: string;
  points: number;
  info?: string;
  nextQuestionId?: number;
}

export interface Question {
  id: number;
  text: string;
  info?: string;
  answers: Answer[];
}

export const INVESTOR_QUESTIONS: Question[] = [
  // Pergunta-Filtro (Ponto de Entrada)
  {
    id: 0,
    text: "Você já investiu em criptomoedas antes?",
    info: "Esta pergunta determina qual trilha de perguntas você seguirá - iniciante ou experiente.",
    answers: [
      { 
        id: 1, 
        text: "Sim, já tenho experiência.", 
        points: 0,
        nextQuestionId: 10,
        info: "Você seguirá a trilha para investidores experientes, focada em seu comportamento passado."
      },
      { 
        id: 2, 
        text: "Não, sou completamente novo.", 
        points: 0,
        nextQuestionId: 20,
        info: "Você seguirá a trilha para iniciantes, focada em intenções e mentalidade."
      }
    ]
  },
  
  // TRILHA EXPERIENTE (IDs 10-13)
  {
    id: 10,
    text: "Pense na pior queda de mercado que você já vivenciou. O que você fez na prática?",
    info: "Esta pergunta avalia como você reagiu a situações de stress real no mercado.",
    answers: [
      { 
        id: 1, 
        text: "Vendi uma parte ou tudo no prejuízo para limitar as perdas.", 
        points: 1,
        nextQuestionId: 11,
        info: "Reação de proteção de capital. Indica baixa tolerância ao risco em situações extremas."
      },
      { 
        id: 2, 
        text: "Não fiz nada. Segurei as posições (HOLD).", 
        points: 2,
        nextQuestionId: 11,
        info: "Abordagem equilibrada. Mantém posições mesmo em situações difíceis, seguindo estratégia de longo prazo."
      },
      { 
        id: 3, 
        text: "Comprei mais, aproveitando os preços baixos.", 
        points: 3,
        nextQuestionId: 11,
        info: "Mentalidade de 'comprar na queda'. Aproveita oportunidades em momentos de stress do mercado."
      },
      { 
        id: 4, 
        text: "Nem senti. Já operei alavancado, estou acostumado.", 
        points: 4,
        nextQuestionId: 11,
        info: "Alta tolerância ao risco. Acostumado com volatilidade extrema e operações complexas."
      }
    ]
  },
  {
    id: 11,
    text: "Quais destes produtos ou estratégias DeFi você já utilizou ativamente?",
    info: "Esta pergunta avalia seu nível de sofisticação técnica e experiência com produtos complexos.",
    answers: [
      { 
        id: 1, 
        text: "Apenas comprei e guardei em corretora (spot).", 
        points: 1,
        nextQuestionId: 12,
        info: "Estratégia básica e conservadora. Foco em compra e guarda sem produtos complexos."
      },
      { 
        id: 2, 
        text: "Já fiz staking de ativos como ETH, SOL, etc.", 
        points: 2,
        nextQuestionId: 12,
        info: "Conhecimento intermediário. Entende conceitos de participação e renda passiva."
      },
      { 
        id: 3, 
        text: "Já forneci liquidez em pools (ex: Uniswap, PancakeSwap).", 
        points: 3,
        nextQuestionId: 12,
        info: "Conhecimento avançado. Entende conceitos complexos como liquidez e impermanent loss."
      },
      { 
        id: 4, 
        text: "Já fiz 'yield farming' de alto risco ou operei com derivativos/alavancagem.", 
        points: 4,
        nextQuestionId: 12,
        info: "Nível especialista. Domina estratégias complexas e de alto risco."
      }
    ]
  },
  {
    id: 12,
    text: "Atualmente, qual a principal fonte para suas decisões de investimento?",
    info: "Esta pergunta revela sua abordagem à pesquisa e seleção de ativos.",
    answers: [
      { 
        id: 1, 
        text: "Análise fundamentalista de projetos 'blue chip'.", 
        points: 1,
        nextQuestionId: 13,
        info: "Abordagem conservadora e fundamentada. Foco em ativos estabelecidos e análise técnica sólida."
      },
      { 
        id: 2, 
        text: "Acompanho analistas de mercado e relatórios.", 
        points: 2,
        nextQuestionId: 13,
        info: "Abordagem equilibrada. Combina análise própria com insights de especialistas."
      },
      { 
        id: 3, 
        text: "Busco 'narrativas' e tendências em redes sociais (X, etc.).", 
        points: 3,
        nextQuestionId: 13,
        info: "Abordagem dinâmica. Foca em tendências emergentes e momentum de mercado."
      },
      { 
        id: 4, 
        text: "Grupos alfa, 'sniping' de tokens e momentum de curto prazo.", 
        points: 4,
        nextQuestionId: 13,
        info: "Abordagem agressiva. Foca em oportunidades de curto prazo e informações privilegiadas."
      }
    ]
  },
  {
    id: 13,
    text: "Que porcentagem do seu patrimônio total você se sente confortável em manter alocado em cripto?",
    info: "Esta pergunta mede sua confiança no setor e tolerância ao risco de alocação.",
    answers: [
      { 
        id: 1, 
        text: "Até 10%.", 
        points: 1,
        info: "Alocação conservadora. Cripto como diversificação marginal do portfólio."
      },
      { 
        id: 2, 
        text: "Entre 10% e 30%.", 
        points: 2,
        info: "Alocação moderada. Cripto como componente significativo mas não dominante."
      },
      { 
        id: 3, 
        text: "Entre 30% e 60%.", 
        points: 3,
        info: "Alta confiança no setor. Cripto como componente majoritário do portfólio."
      },
      { 
        id: 4, 
        text: "Acima de 60%.", 
        points: 4,
        info: "Exposição extrema. Cripto como estratégia principal de investimento."
      }
    ]
  },
  
  // TRILHA INICIANTE (IDs 20-23)
  {
    id: 20,
    text: "Imagine que você investiu 1.000€. Após uma semana, seu saldo é 700€. Qual sua principal linha de pensamento?",
    info: "Esta pergunta avalia sua tolerância à volatilidade e reação a perdas.",
    answers: [
      { 
        id: 1, 
        text: "Resgataria os 700€ para não perder mais.", 
        points: 1,
        nextQuestionId: 21,
        info: "Reação de proteção. Indica baixa tolerância ao risco e preferência por preservação de capital."
      },
      { 
        id: 2, 
        text: "Manteria, pois entendo que a volatilidade faz parte.", 
        points: 2,
        nextQuestionId: 21,
        info: "Abordagem equilibrada. Entende a natureza volátil do mercado e mantém posições."
      },
      { 
        id: 3, 
        text: "Investiria mais para baixar o preço médio.", 
        points: 3,
        nextQuestionId: 21,
        info: "Mentalidade de 'comprar na queda'. Aproveita oportunidades em momentos de stress."
      }
    ]
  },
  {
    id: 21,
    text: "Qual seu principal objetivo ao pensar em investir em cripto?",
    info: "Esta pergunta revela seus objetivos financeiros e nível de risco desejado.",
    answers: [
      { 
        id: 1, 
        text: "Proteger meu dinheiro da inflação com algo mais sólido.", 
        points: 1,
        nextQuestionId: 22,
        info: "Foco em preservação de capital. Estratégias conservadoras para proteção contra inflação."
      },
      { 
        id: 2, 
        text: "Construir patrimônio a longo prazo de forma consistente.", 
        points: 2,
        nextQuestionId: 22,
        info: "Crescimento sustentável. Abordagem equilibrada entre risco e retorno."
      },
      { 
        id: 3, 
        text: "Buscar altos retornos, mesmo que o risco seja alto.", 
        points: 3,
        nextQuestionId: 22,
        info: "Busca por retornos elevados. Aceita riscos maiores por potencial de ganho superior."
      },
      { 
        id: 4, 
        text: "Tentar uma aposta que pode mudar minha vida (100x ou nada).", 
        points: 4,
        nextQuestionId: 22,
        info: "Estratégia de alto risco/alta recompensa. Foco em oportunidades especulativas."
      }
    ]
  },
  {
    id: 22,
    text: "Quanto tempo você planeja dedicar para estudar e acompanhar seus investimentos?",
    info: "Esta pergunta avalia seu nível de envolvimento e disponibilidade para gestão ativa.",
    answers: [
      { 
        id: 1, 
        text: "O mínimo possível, quero algo que 'funcione sozinho'.", 
        points: 1,
        nextQuestionId: 23,
        info: "Perfil passivo. Prefere estratégias que não requerem monitoramento constante."
      },
      { 
        id: 2, 
        text: "Algumas horas por semana para entender o básico.", 
        points: 2,
        nextQuestionId: 23,
        info: "Envolvimento moderado. Dedica tempo regular para aprender e acompanhar."
      },
      { 
        id: 3, 
        text: "Pretendo estudar diariamente para tomar boas decisões.", 
        points: 3,
        nextQuestionId: 23,
        info: "Envolvimento ativo. Dedicação intensa para gestão ativa dos investimentos."
      }
    ]
  },
  {
    id: 23,
    text: "Se o dinheiro investido fosse perdido, isso impactaria seu padrão de vida?",
    info: "Esta pergunta mede o conceito de 'dinheiro que se pode perder' e sua capacidade financeira.",
    answers: [
      { 
        id: 1, 
        text: "Sim, seria um problema financeiro significativo.", 
        points: 1,
        info: "Capital essencial. Recomenda-se máxima cautela e estratégias de baixo risco."
      },
      { 
        id: 2, 
        text: "Seria um incômodo, mas não mudaria meu dia a dia.", 
        points: 2,
        info: "Capital importante mas não essencial. Permite risco moderado e calculado."
      },
      { 
        id: 3, 
        text: "Não faria quase nenhuma diferença.", 
        points: 3,
        info: "Capital dispensável. Permite maior flexibilidade para assumir riscos elevados."
      }
    ]
  }
];

export const PROFILE_DESCRIPTIONS = {
  Conservador: {
    title: "Perfil Conservador",
    description: "Prefere segurança e previsibilidade. A maior parte do portfólio em BTC e ETH. Estratégia de DCA e participação de baixo risco. Ideal para quem está a começar e não quer fortes emoções.",
    strategy: "Foco em Bitcoin e Ethereum com estratégias de DCA (Dollar Cost Averaging) e participação de baixo risco. Evita criptomoedas alternativas voláteis e mantém uma abordagem cautelosa."
  },
  Moderado: {
    title: "Perfil Moderado",
    description: "Topa algum risco por retornos melhores. Mix de BTC, ETH e criptomoedas alternativas estabelecidas (SOL, AVAX, LINK). Faz participação e eventualmente entra em pools de liquidez seguras. Bom para quem já entende o mercado um pouco melhor.",
    strategy: "Diversificação entre BTC, ETH e criptomoedas alternativas estabelecidas. Participa em participação e pools de liquidez com risco moderado. Mantém equilíbrio entre segurança e crescimento."
  },
  Agressivo: {
    title: "Perfil Agressivo",
    description: "O objetivo é multiplicar o capital. Foco em criptomoedas alternativas, narrativas (AI, RWA, Layer 2) e até mesmo memecoins. Participa de DCA, plataformas de lançamento e cultivo com APY mais altos. Exige conhecimento técnico e controlo emocional.",
    strategy: "Foco em criptomoedas alternativas e narrativas emergentes. Participa em plataformas de lançamento, cultivo de alto APY e estratégias de crescimento agressivo. Requer conhecimento técnico avançado."
  },
  Degenerado: {
    title: "Perfil Degenerado",
    description: "O famoso Degen. Vive no limite. Compra tokens com capitalização de mercado de $150k e liquidez de $500. Faz \"caça\" em novos tokens, entra em fazendas com 12,000% de APR. Geralmente, 90% emoção, 10% razão. Potencial de 100x ou zero em uma semana.",
    strategy: "Estratégias extremas com tokens de baixa capitalização e alta volatilidade. Caça de novos tokens e cultivo de APR extremo. Alto risco, alto potencial de retorno."
  }
};

// Constantes das trilhas para normalização
export const TRILHA_CONSTANTS = {
  INICIANTE: {
    minPoints: 4, // 1+1+1+1
    maxPoints: 12, // 3+4+3+3
    questionIds: [20, 21, 22, 23]
  },
  EXPERIENTE: {
    minPoints: 4, // 1+1+1+1
    maxPoints: 16, // 4+4+4+4
    questionIds: [10, 11, 12, 13]
  }
};

export const getProfileFromScore = (score: number, answers: QuestionAnswer[]): 'Conservador' | 'Moderado' | 'Agressivo' | 'Degenerado' => {
  // Identifica qual trilha o usuário seguiu
  const isExperiente = answers.some(answer => answer.questionId >= 10 && answer.questionId <= 13);
  const isIniciante = answers.some(answer => answer.questionId >= 20 && answer.questionId <= 23);
  
  let percentual: number;
  
  if (isExperiente) {
    // Trilha Experiente: 4-16 pontos
    percentual = ((score - TRILHA_CONSTANTS.EXPERIENTE.minPoints) / 
                  (TRILHA_CONSTANTS.EXPERIENTE.maxPoints - TRILHA_CONSTANTS.EXPERIENTE.minPoints)) * 100;
  } else if (isIniciante) {
    // Trilha Iniciante: 4-12 pontos
    percentual = ((score - TRILHA_CONSTANTS.INICIANTE.minPoints) / 
                  (TRILHA_CONSTANTS.INICIANTE.maxPoints - TRILHA_CONSTANTS.INICIANTE.minPoints)) * 100;
  } else {
    // Fallback para sistema antigo
    if (score >= 9 && score <= 14) return 'Conservador';
    if (score >= 15 && score <= 21) return 'Moderado';
    if (score >= 22 && score <= 28) return 'Agressivo';
    return 'Degenerado';
  }
  
  // Mapeia o percentual para o perfil
  if (percentual >= 0 && percentual <= 25) return 'Conservador';
  if (percentual >= 26 && percentual <= 50) return 'Moderado';
  if (percentual >= 51 && percentual <= 75) return 'Agressivo';
  return 'Degenerado';
};