'use client';

import React, { useState, useEffect } from 'react';
import { getPortfolioHealth, getRebalanceSuggestions, REBALANCE_STRATEGIES, convertToCurrency, formatCurrency } from '../../data/mockData';
import { useCurrency } from '../../contexts/CurrencyContext';
import CurrencyToggle from '../../components/CurrencyToggle';
import Breadcrumb from '../../components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, BarChart3, Shield, Zap } from 'lucide-react';

export default function RebalancePage() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [selectedStrategy, setSelectedStrategy] = useState<keyof typeof REBALANCE_STRATEGIES>('CONSERVATIVE');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const health = isClient ? getPortfolioHealth() : {
    cryptoPercentage: 0,
    cashPercentage: 0,
    diversificationScore: 0,
    concentrationRisk: 'Baixo',
    volatilityScore: 0,
    uniqueAssets: 0,
    maxAssetAllocation: 0,
    totalValue: 0,
    cryptoValue: 0,
    cashValue: 0
  };
  
  const rebalanceData = isClient ? getRebalanceSuggestions(selectedStrategy) : {
    strategy: REBALANCE_STRATEGIES.CONSERVATIVE,
    currentHealth: health,
    suggestions: [],
    isBalanced: true
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getHealthIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'sell': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'diversify': return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'rebalance': return <Target className="h-4 w-4 text-orange-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!isClient) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Carregando dados de rebalanciamento...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                Rebalanciamento de Carteira
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Estratégias inteligentes para otimizar sua alocação de ativos
              </p>
            </div>
            <CurrencyToggle 
              selectedCurrency={selectedCurrency} 
              onCurrencyChange={setSelectedCurrency} 
            />
          </div>
        </div>

        {/* Perfil Atual da Carteira */}
        <Card className="mb-8 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Seu Perfil Atual
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Baseado na alocação atual da sua carteira
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">
                    {health.cryptoPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Criptomoedas</div>
                </div>
                <div className="text-2xl text-gray-400">+</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {health.cashPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Caixa</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {health.cryptoPercentage >= 80 ? 'Perfil Agressivo' :
                   health.cryptoPercentage >= 60 ? 'Perfil Moderado' : 'Perfil Conservador'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {health.cryptoPercentage >= 80 ? 'Alta exposição ao risco' :
                   health.cryptoPercentage >= 60 ? 'Exposição equilibrada' : 'Baixa exposição ao risco'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Indicadores de Saúde */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-colors duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diversificação</CardTitle>
              {getHealthIcon(health.diversificationScore)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className={getHealthColor(health.diversificationScore)}>
                  {health.diversificationScore.toFixed(0)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {health.uniqueAssets} ativos únicos
              </p>
            </CardContent>
          </Card>

          <Card className="transition-colors duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concentração</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className={health.concentrationRisk === 'Baixo' ? 'text-green-500' : 
                                health.concentrationRisk === 'Médio' ? 'text-yellow-500' : 'text-red-500'}>
                  {health.maxAssetAllocation.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Risco: {health.concentrationRisk}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-colors duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Criptomoedas</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {health.cryptoPercentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(convertToCurrency(health.cryptoValue, selectedCurrency), selectedCurrency)}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-colors duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Caixa</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {health.cashPercentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(convertToCurrency(health.cashValue, selectedCurrency), selectedCurrency)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Estratégias de Rebalanciamento */}
          <Card className="transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Estratégias Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(REBALANCE_STRATEGIES).map(([key, strategy]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedStrategy === key
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedStrategy(key as keyof typeof REBALANCE_STRATEGIES)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {strategy.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {strategy.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${strategy.color}`}></div>
                  </div>
                  
                  {/* Barras de progresso para mostrar alocação atual vs target */}
                  <div className="mt-3 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Criptomoedas</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 dark:text-white">
                            {health.cryptoPercentage.toFixed(1)}%
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {strategy.cryptoTarget}%
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        {/* Barra atual */}
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(health.cryptoPercentage, 100)}%` }}
                        ></div>
                        {/* Linha de target */}
                        <div 
                          className="absolute top-0 w-0.5 h-3 bg-blue-600 dark:bg-blue-400 border-l-2 border-white dark:border-gray-800"
                          style={{ left: `${strategy.cryptoTarget}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {health.cryptoPercentage > strategy.cryptoTarget 
                          ? `Vender ${(health.cryptoPercentage - strategy.cryptoTarget).toFixed(1)}%`
                          : `Comprar ${(strategy.cryptoTarget - health.cryptoPercentage).toFixed(1)}%`
                        }
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Caixa</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 dark:text-white">
                            {health.cashPercentage.toFixed(1)}%
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {strategy.cashTarget}%
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        {/* Barra atual */}
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(health.cashPercentage, 100)}%` }}
                        ></div>
                        {/* Linha de target */}
                        <div 
                          className="absolute top-0 w-0.5 h-3 bg-green-600 dark:bg-green-400 border-l-2 border-white dark:border-gray-800"
                          style={{ left: `${strategy.cashTarget}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {health.cashPercentage > strategy.cashTarget 
                          ? `Vender ${(health.cashPercentage - strategy.cashTarget).toFixed(1)}%`
                          : `Comprar ${(strategy.cashTarget - health.cashPercentage).toFixed(1)}%`
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sugestões de Ação */}
          <Card className="transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Sugestões de Ação
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Baseado na estratégia {rebalanceData.strategy.name}
              </p>
            </CardHeader>
            <CardContent>
              {rebalanceData.isBalanced ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Carteira Balanceada!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sua carteira está alinhada com a estratégia selecionada.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rebalanceData.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        suggestion.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                        suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                        'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getActionIcon(suggestion.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority === 'high' ? 'Alta' : 
                               suggestion.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {suggestion.asset}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {suggestion.message}
                          </p>
                          {suggestion.amount > 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Valor estimado: {formatCurrency(
                                convertToCurrency(
                                  (suggestion.amount / 100) * health.totalValue, 
                                  selectedCurrency
                                ), 
                                selectedCurrency
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumo da Estratégia Atual */}
        <Card className="mt-8 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Resumo da Estratégia {rebalanceData.strategy.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Alocação Atual vs Target
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Criptomoedas</span>
                      <span className="text-gray-900 dark:text-white">
                        {health.cryptoPercentage.toFixed(1)}% → {rebalanceData.strategy.cryptoTarget}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${health.cryptoPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Caixa</span>
                      <span className="text-gray-900 dark:text-white">
                        {health.cashPercentage.toFixed(1)}% → {rebalanceData.strategy.cashTarget}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${health.cashPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Valores em {selectedCurrency}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total do Portfólio:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(convertToCurrency(health.totalValue, selectedCurrency), selectedCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Criptomoedas:</span>
                    <span className="font-semibold text-blue-500">
                      {formatCurrency(convertToCurrency(health.cryptoValue, selectedCurrency), selectedCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Caixa:</span>
                    <span className="font-semibold text-green-500">
                      {formatCurrency(convertToCurrency(health.cashValue, selectedCurrency), selectedCurrency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
