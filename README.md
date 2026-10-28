# Merx Energia – Registro de Consumo Mensal

Página web simples para registrar o consumo mensal de energia (kWh) dos clientes da Merx.

## Funcionalidades

- Cadastrar uma leitura (nome do cliente, mês e consumo em kWh)
- Validar os campos: todos são obrigatórios e o consumo não pode ser negativo
- Bloquear leitura duplicada: o mesmo cliente não pode ter duas leituras no mesmo mês
- Listar as leituras cadastradas, com opção de remover
- Mostrar o consumo total de cada cliente, com o número de leituras
- Mostrar o total geral de leituras e de kWh de todos os clientes

## Tecnologias

React · JavaScript · Vite · CSS

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
git clone https://github.com/victorsantos-dev01/merx-consumo-energia.git
cd merx-consumo-energia
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://localhost:5173).

## Como o projeto está organizado

```
src/
├── components/
│   ├── ReadingForm.jsx     formulário de cadastro e validação
│   ├── ReadingList.jsx     lista de leituras
│   └── TotalsByClient.jsx  totais por cliente e total geral
├── App.jsx                 estado, regras de negócio e cálculo dos totais
└── index.css               estilos
```

## Decisões

- **Sem backend**, para manter o projeto simples.
- **Dados no `localStorage`:** continuam salvos ao recarregar a página, mas **não são sincronizados entre computadores ou navegadores diferentes**.
- **Mesmo cliente:** nomes iguais, sem diferenciar maiúsculas/minúsculas e ignorando espaços nas pontas, são tratados como o mesmo cliente. A comparação não ignora acentos ("Atlantico" e "Atlântico" são clientes diferentes).
- **Regras no `App`:** o bloqueio de duplicidade e o cálculo dos totais ficam no `App.jsx`, que conhece todas as leituras. Os componentes só exibem e coletam dados.

## Melhorias futuras

- API em Node.js com banco de dados
- Edição de leituras
- Filtro por cliente ou mês
- Ignorar acentos na comparação de nomes
- Gráfico de evolução do consumo
- Testes automatizados