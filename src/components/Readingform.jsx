import { useState } from "react";

export default function ReadingForm({ onAdd }) {
  const [cliente, setCliente] = useState("");
  const [mes, setMes] = useState("");
  const [consumo, setConsumo] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const valor = Number(consumo);
    if (!cliente.trim() || !mes || consumo === "") {
      setErro("Preencha todos os campos.");
      return;
    }
    if (Number.isNaN(valor) || valor < 0) {
      setErro("O consumo deve ser um número maior ou igual a zero.");
      return;
    }

    onAdd(cliente.trim(), mes, valor);
    setCliente("");
    setMes("");
    setConsumo("");
    setErro("");
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Cadastrar leitura</h2>

      <label>
        Nome do cliente
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ex: Hotel Atlântico"
        />
      </label>

      <label>
        Mês
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
      </label>

      <label>
        Consumo (kWh)
        <input
          type="number"
          min="0"
          step="0.01"
          value={consumo}
          onChange={(e) => setConsumo(e.target.value)}
          placeholder="Ex: 1500"
        />
      </label>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}