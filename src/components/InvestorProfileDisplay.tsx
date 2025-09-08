'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvestorProfile, PROFILE_DESCRIPTIONS } from '@/types/InvestorProfile';
import { getPortfolioHealth, getRebalanceSuggestions, REBALANCE_STRATEGIES, formatValueWithCurrency } from '@/data/mockData';
import { useCurrency } from '@/contexts/CurrencyContext';

interface InvestorProfileDisplayProps {
  profile: InvestorProfile;
  onRetakeQuestionnaire: () => void;
}

export default function InvestorProfileDisplay({ profile, onRetakeQuestionnaire }: InvestorProfileDisplayProps) {
  const profileInfo = PROFILE_DESCRIPTIONS[profile.profile];
  const createdDate = new Date(profile.createdAt).toLocaleDateString('pt-BR');
  const { selectedCurrency } = useCurrency();
  
  // Obter dados do portfólio atual
  const portfolioHealth = getPortfolioHealth();
  
  // Mapear perfil para estratégia de rebalanceamento
  const getStrategyKey = (profileType: string): keyof typeof REBALANCE_STRATEGIES => {
    switch (profileType) {
      case 'Conservador': return 'CONSERVATIVE';
      case 'Moderado': return 'MODERATE';
      case 'Agressivo': return 'AGGRESSIVE';
      case 'Degenerado': return 'AGGRESSIVE'; // Degenerado usa estratégia agressiva
      default: return 'MODERATE';
    }
  };
  
  const strategyKey = getStrategyKey(profile.profile);
  const rebalanceData = getRebalanceSuggestions(strategyKey);

  const getProfileColor = (profileType: string) => {
    switch (profileType) {
      case 'Conservador':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderado':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Agressivo':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Degenerado':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProfileIcon = (profileType: string) => {
    switch (profileType) {
      case 'Conservador':
        return '🛡️';
      case 'Moderado':
        return '⚖️';
      case 'Agressivo':
        return '🚀';
      case 'Degenerado':
        return '🔥';
      default:
        return '📊';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className={`${getProfileColor(profile.profile)} border-2 bg-white dark:bg-gray-800`}>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">
            {getProfileIcon(profile.profile)}
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {profileInfo.title}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Pontuação: {profile.score} pontos • Criado em {createdDate}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Grid com duas colunas principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Coluna Esquerda - Seu Perfil Atual */}
        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Seu Perfil Atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Descrição do Perfil</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {profileInfo.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Estratégia Recomendada</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {profileInfo.strategy}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tolerância ao Risco</h4>
                  <div className="space-y-2">
                    {profile.profile === 'Conservador' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Baixa - Foco em preservação de capital</p>
                    )}
                    {profile.profile === 'Moderado' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Média - Equilíbrio entre risco e retorno</p>
                    )}
                    {profile.profile === 'Agressivo' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Alta - Busca por crescimento acelerado</p>
                    )}
                    {profile.profile === 'Degenerado' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Extrema - Máximo risco, máximo potencial</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Horizonte de Investimento</h4>
                  <div className="space-y-2">
                    {profile.profile === 'Conservador' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Longo prazo - Estratégias de acumulação</p>
                    )}
                    {profile.profile === 'Moderado' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Médio a longo prazo - Diversificação equilibrada</p>
                    )}
                    {profile.profile === 'Agressivo' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Flexível - Aproveitamento de oportunidades</p>
                    )}
                    {profile.profile === 'Degenerado' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Muito curto prazo - Trading e especulação</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sugestões */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Sugestões</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Recomendações baseadas no seu perfil e portfólio atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Estratégia de Rebalanceamento */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Estratégia de Rebalanceamento
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    {rebalanceData.strategy.description}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded">
                      Cripto: {rebalanceData.strategy.cryptoTarget}%
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded">
                      Caixa: {rebalanceData.strategy.cashTarget}%
                    </span>
                  </div>
                </div>

                {/* Sugestões de Ação */}
                {rebalanceData.suggestions.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ações Recomendadas</h4>
                    {rebalanceData.suggestions.map((suggestion, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        suggestion.priority === 'high' 
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-400' 
                          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
                      }`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {suggestion.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      ✅ Seu portfólio está bem balanceado para o seu perfil!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - Alocação Atual */}
        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Alocação Atual</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Distribuição atual do seu portfólio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Criptomoedas */}
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                      Criptomoedas
                    </h4>
                    <span className="text-lg font-bold text-orange-900 dark:text-orange-100">
                      {portfolioHealth.cryptoPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${portfolioHealth.cryptoPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-orange-800 dark:text-orange-200 mt-2">
                    Valor: {selectedCurrency === 'HIDDEN' ? '••••••' : `$${portfolioHealth.cryptoValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </p>
                </div>

                {/* Caixa */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">
                      Caixa (STABLECOIN)
                    </h4>
                    <span className="text-lg font-bold text-green-900 dark:text-green-100">
                      {portfolioHealth.cashPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${portfolioHealth.cashPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                    Valor: {selectedCurrency === 'HIDDEN' ? '••••••' : `$${portfolioHealth.cashValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </p>
                  <div className="mt-2 p-2 bg-green-100 dark:bg-green-800/50 rounded text-xs text-green-700 dark:text-green-300">
                    <strong>Observação:</strong> Inclui USDC, USDT e outras stablecoins que mantêm valor estável em relação ao dólar
                  </div>
                </div>

                {/* Resumo */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Valor Total:</span>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCurrency === 'HIDDEN' ? '••••••' : `$${portfolioHealth.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Ativos Únicos:</span>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {portfolioHealth.uniqueAssets}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análise Detalhada */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Análise Detalhada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Respostas do Questionário</h4>
                  <div className="space-y-2">
                    {profile.answers.map((answer, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Pergunta {answer.questionId}:</span> {answer.points} pontos
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onRetakeQuestionnaire}
          variant="outline"
          className="px-8"
        >
          Refazer Questionário
        </Button>
        <Button
          onClick={() => window.location.href = '/dashboard'}
          className="px-8"
        >
          Ir para Dashboard
        </Button>
      </div>
    </div>
  );
}
