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

export interface Question {
  id: number;
  text: string;
  answers: {
    id: number;
    text: string;
    points: number;
  }[];
}

export const INVESTOR_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual a sua tolerância ao risco?",
    answers: [
      { id: 1, text: "Aguento uma queda de 30% num dia sem vender tudo.", points: 3 },
      { id: 2, text: "Já lidei com volatilidade antes.", points: 2 },
      { id: 3, text: "Fico no banho de sangue da montanha russa.", points: 4 },
      { id: 4, text: "Dorme tranquilo com a carteira em vermelho?", points: 1 }
    ]
  },
  {
    id: 2,
    text: "Qual o seu horizonte de investimento?",
    answers: [
      { id: 1, text: "Curto prazo (semanas/meses).", points: 4 },
      { id: 2, text: "Médio prazo (1-2 anos).", points: 2 },
      { id: 3, text: "Longo prazo (4+ anos, o famoso HODL mesmo?).", points: 1 }
    ]
  },
  {
    id: 3,
    text: "Qual o seu objetivo com os investimentos?",
    answers: [
      { id: 1, text: "Proteção contra inflação de moeda fiduciária.", points: 1 },
      { id: 2, text: "Ganhos rápidos (trading, altcoins).", points: 4 },
      { id: 3, text: "Renda passiva (Staking, Farming).", points: 2 },
      { id: 4, text: "Aposentadoria crypto-style.", points: 3 }
    ]
  },
  {
    id: 4,
    text: "Se o Bitcoin caísse 50% amanhã, o que você faria?",
    answers: [
      { id: 1, text: "Venderia tudo para salvar o que restou.", points: 1 },
      { id: 2, text: "Manteria minha posição (HODL) e esperaria a recuperação.", points: 2 },
      { id: 3, text: "Compraria mais, aproveitando a \"promoção\".", points: 3 },
      { id: 4, text: "Venderia a casa para comprar mais.", points: 4 }
    ]
  }
];

export const PROFILE_DESCRIPTIONS = {
  Conservador: {
    title: "Perfil Conservador",
    description: "Prefere segurança e previsibilidade. A maior parte do portfólio em BTC e ETH. Estratégia de DCA e staking de baixo risco. Ideal para quem está a começar e não quer fortes emoções.",
    strategy: "Foco em Bitcoin e Ethereum com estratégias de DCA (Dollar Cost Averaging) e staking de baixo risco. Evita altcoins voláteis e mantém uma abordagem cautelosa."
  },
  Moderado: {
    title: "Perfil Moderado",
    description: "Topa algum risco por retornos melhores. Mix de BTC, ETH e altcoins estabelecidas (SOL, AVAX, LINK). Faz staking e eventualmente entra em pools de liquidez seguras. Bom para quem já entende o mercado um pouco melhor.",
    strategy: "Diversificação entre BTC, ETH e altcoins estabelecidas. Participa em staking e pools de liquidez com risco moderado. Mantém equilíbrio entre segurança e crescimento."
  },
  Agressivo: {
    title: "Perfil Agressivo",
    description: "O objetivo é multiplicar o capital. Foco em altcoins, narrativas (AI, RWA, Layer 2) e até mesmo memecoins. Participa de DCA, launchpads e farming com APY mais altos. Exige conhecimento técnico e controlo emocional.",
    strategy: "Foco em altcoins e narrativas emergentes. Participa em launchpads, farming de alto APY e estratégias de crescimento agressivo. Requer conhecimento técnico avançado."
  },
  Degenerado: {
    title: "Perfil Degenerado",
    description: "O famoso Degen. Vive no limite. Compra tokens com market cap de $150k e liquidez de $500. Faz \"sniping\" em novos tokens, entra em farms com 12,000% de APR. Geralmente, 90% emoção, 10% razão. Potencial de 100x ou zero em uma semana.",
    strategy: "Estratégias extremas com tokens de baixa capitalização e alta volatilidade. Sniping de novos tokens e farming de APR extremo. Alto risco, alto potencial de retorno."
  }
};

export const getProfileFromScore = (score: number): 'Conservador' | 'Moderado' | 'Agressivo' | 'Degenerado' => {
  if (score >= 4 && score <= 6) return 'Conservador';
  if (score >= 7 && score <= 10) return 'Moderado';
  if (score >= 11 && score <= 13) return 'Agressivo';
  return 'Degenerado';
};
