# Merx Energia – Registro de Consumo Mensal

Página web simples para registrar o consumo mensal de energia (kWh) dos clientes da Merx.

## Funcionalidades

- Cadastrar uma leitura (cliente, mês e consumo em kWh)
- Listar as leituras cadastradas (com opção de remover)
- Mostrar o consumo total de cada cliente

## Tecnologias

React · JavaScript · Vite · CSS

Os dados ficam salvos no `localStorage` do navegador (não há backend).

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
git clone https://github.com/victorsantos-dev01/merx-consumo-energia.git
cd merx-consumo-energia
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://localhost:5173).

## Decisões

- Sem backend, para manter o projeto simples.
- Clientes com o mesmo nome (sem diferenciar maiúsculas/minúsculas) são somados juntos.

## Melhorias futuras

- API em Node.js com banco de dados
- Filtro por cliente ou mês
- Gráfico de evolução do consumo
- Testes automatizados