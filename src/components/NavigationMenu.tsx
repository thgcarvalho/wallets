'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BarChart3, PieChart, Wallet, Home, Menu, X, Coins } from 'lucide-react';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Início',
      href: '/',
      icon: Home,
      description: 'Visão geral do portfólio'
    },
    {
      name: 'Ativos',
      href: '/assets',
      icon: Coins,
      description: 'Visualização detalhada dos ativos'
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      description: 'Dashboard detalhado com gráficos'
    },
    {
      name: 'Visualizações',
      href: '/visualizations',
      icon: PieChart,
      description: 'Todas as visualizações do portfólio'
    }
  ];

  const visualizationOptions = [
    {
      name: 'Ativos com Wallets',
      href: '/visualizations#assets-wallets',
      description: 'Tabela completa com carteiras e redes'
    },
    {
      name: 'Total Agrupado',
      href: '/visualizations#total-grouped',
      description: 'Resumo por criptomoeda'
    },
    {
      name: 'Carteiras BTC/EUR',
      href: '/visualizations#wallets-btc-eur',
      description: 'Valores em Bitcoin e Euro'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e nome */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Wallets
                </span>
              </Link>
            </div>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}

              {/* Dropdown de visualizações */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <PieChart className="w-4 h-4" />
                  <span>Visualizações</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {visualizationOptions.map((option) => (
                        <Link
                          key={option.name}
                          href={option.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {option.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botão mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}

            {/* Opções de visualização mobile */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Visualizações Específicas
              </div>
              {visualizationOptions.map((option) => (
                <Link
                  key={option.name}
                  href={option.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div className="font-medium">{option.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
