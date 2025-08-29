# Wallets - Sistema de Portfólio de Carteiras Cripto

Um sistema moderno para gerenciamento de portfólio de carteiras cripto, desenvolvido com Next.js 15 e TypeScript.

## 🚀 Funcionalidades

- **Dashboard Completo**: Visão geral do portfólio com métricas importantes
- **Gestão de Carteiras**: Crie e gerencie diferentes tipos de carteiras (hot, cold, exchange)
- **Controle de Ativos**: Adicione e acompanhe seus ativos cripto
- **Análise de Performance**: Acompanhe o valor total e performance do portfólio
- **Interface Moderna**: Design responsivo e intuitivo com Tailwind CSS

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Banco de Dados**: PostgreSQL com Prisma (preparado para futuras versões)
- **Deploy**: Vercel

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Card, etc.)
│   ├── PortfolioSummary.tsx
│   └── WalletList.tsx
├── types/               # Definições de tipos TypeScript
│   ├── Wallet.ts
│   └── Asset.ts
├── data/                # Dados mockados
│   └── mockData.ts
└── utils/               # Utilitários
    └── cn.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd wallets
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3200](http://localhost:3200)

## 📊 Modelos de Dados

### Wallet (Carteira)
- Nome e descrição
- Tipo (hot, cold, exchange)
- Status (ativo/inativo)
- Relacionamento com ativos

### Asset (Ativo)
- Símbolo e nome
- Quantidade
- Preço de compra e atual
- Relacionamento com carteira

## 🔮 Próximas Funcionalidades

- [ ] Autenticação de usuários
- [ ] Integração com APIs de preços em tempo real
- [ ] Gráficos de performance
- [ ] Histórico de transações
- [ ] Alertas de preço
- [ ] Exportação de relatórios
- [ ] Múltiplas moedas fiduciárias

## 📝 Licença

Este projeto é de uso pessoal e educacional.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
