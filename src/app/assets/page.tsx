'use client';

import React, { useState } from 'react';
import { getAssetAllocation, getGroupedAssets, getDetailedAssets, convertToCurrency, formatCurrency } from '../../data/mockData';
import { useCurrency } from '../../contexts/CurrencyContext';
import CurrencyToggle from '../../components/CurrencyToggle';
import Breadcrumb from '../../components/Breadcrumb';
import PieChart from '../../components/PieChart';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function AssetsPage() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grouped' | 'detailed'>('grouped');
  const [expandedAssets, setExpandedAssets] = useState<Set<string>>(new Set());
  
  const groupedAssets = getGroupedAssets();
  const detailedAssets = getDetailedAssets();
  const currentData = viewMode === 'grouped' ? groupedAssets : detailedAssets;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                Ativos do Portfólio
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Visualização detalhada de todos os ativos e suas alocações
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CurrencyToggle 
                selectedCurrency={selectedCurrency} 
                onCurrencyChange={setSelectedCurrency} 
              />
            </div>
          </div>
          
          {/* Toggle de Visualização */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grouped')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'grouped'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Agrupada
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'detailed'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Por Carteira
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {viewMode === 'grouped' 
                ? 'Ativos agrupados por símbolo' 
                : 'Ativos detalhados por carteira'
              }
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Tabela de Ativos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {viewMode === 'grouped' ? 'Ativos Agrupados' : 'Ativos por Carteira'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ativo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Alocação
                    </th>
                    {viewMode === 'detailed' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Carteira
                      </th>
                    )}
                    {viewMode === 'grouped' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Carteiras
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentData.map((asset, index) => (
                    <React.Fragment key={viewMode === 'grouped' ? asset.symbol : asset.uuid}>
                      <tr 
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 ${
                          selectedAsset === (viewMode === 'grouped' ? asset.symbol : asset.uuid) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => {
                          if (viewMode === 'grouped') {
                            setExpandedAssets(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(asset.symbol)) {
                                newSet.delete(asset.symbol);
                              } else {
                                newSet.add(asset.symbol);
                              }
                              return newSet;
                            });
                          } else {
                            setSelectedAsset(selectedAsset === asset.uuid ? null : asset.uuid);
                          }
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {asset.symbol.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {asset.symbol}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {asset.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {selectedCurrency === 'HIDDEN' ? '••••••' : (
                            viewMode === 'grouped' 
                              ? asset.totalQuantity.toLocaleString('en-US', { 
                                  minimumFractionDigits: 2, 
                                  maximumFractionDigits: 8 
                                })
                              : asset.quantity.toLocaleString('en-US', { 
                                  minimumFractionDigits: 2, 
                                  maximumFractionDigits: 8 
                                })
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {selectedCurrency === 'HIDDEN' ? '••••••' : formatCurrency(convertToCurrency(
                            viewMode === 'grouped' ? asset.totalValue : asset.value, 
                            selectedCurrency
                          ), selectedCurrency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${asset.allocation}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white font-medium">
                              {asset.allocation.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {viewMode === 'detailed' 
                            ? (asset.wallet?.name || 'N/A')
                            : (
                                <div className="flex items-center gap-2">
                                  <span>{asset.wallets?.length || 0} carteiras</span>
                                  {expandedAssets.has(asset.symbol) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </div>
                              )
                          }
                        </td>
                      </tr>
                      
                      {/* Linhas expandidas para visualização agrupada */}
                      {viewMode === 'grouped' && expandedAssets.has(asset.symbol) && asset.wallets && (
                        asset.wallets.map((wallet: any) => (
                          <tr key={wallet.uuid} className="bg-gray-50 dark:bg-gray-700/50">
                            <td className="px-6 py-2 pl-16">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {wallet.walletName}
                              </div>
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400">
                              {selectedCurrency === 'HIDDEN' ? '••••••' : wallet.quantity.toLocaleString('en-US', { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 8 
                              })}
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400">
                              {selectedCurrency === 'HIDDEN' ? '••••••' : formatCurrency(convertToCurrency(wallet.value, selectedCurrency), selectedCurrency)}
                            </td>
                            <td className="px-6 py-2">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {((wallet.value / asset.totalValue) * 100).toFixed(1)}% do total
                              </div>
                            </td>
                            <td className="px-6 py-2"></td>
                          </tr>
                        ))
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Distribuição por Ativo
              </h2>
            </div>
            <div className="p-6">
              <PieChart data={currentData} />
            </div>
          </div>
        </div>

        {/* Resumo dos Ativos Selecionados */}
        {selectedAsset && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detalhes do Ativo Selecionado
            </h3>
            {(() => {
              const asset = currentData.find(a => 
                viewMode === 'grouped' ? a.symbol === selectedAsset : a.uuid === selectedAsset
              );
              if (!asset) return null;
              
              return (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Símbolo</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{asset.symbol}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Quantidade</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedCurrency === 'HIDDEN' ? '••••••' : (viewMode === 'grouped' ? asset.totalQuantity : asset.quantity).toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 8 
                      })}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Valor Total</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedCurrency === 'HIDDEN' ? '••••••' : formatCurrency(convertToCurrency(
                        viewMode === 'grouped' ? asset.totalValue : asset.value, 
                        selectedCurrency
                      ), selectedCurrency)}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Alocação</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {asset.allocation.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </main>
  );
}
