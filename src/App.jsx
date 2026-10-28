import { useEffect, useMemo, useState } from "react";
import ReadingForm from "./components/ReadingForm";
import ReadingList from "./components/ReadingList";
import TotalsByClient from "./components/TotalsByClient";

const STORAGE_KEY = "merx-leituras";

// Padroniza o nome para comparar: sem espaços nas pontas e em minúsculas
function chaveCliente(nome) {
  return nome.trim().toLowerCase();
}

function loadReadings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [readings, setReadings] = useState(loadReadings);

  // Salva no navegador sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  }, [readings]);

  function addReading(cliente, mes, consumoKwh) {
    // Já existe leitura do mesmo cliente no mesmo mês?
    const duplicada = readings.some(
      (r) => chaveCliente(r.cliente) === chaveCliente(cliente) && r.mes === mes
    );
    if (duplicada) {
      return {
        ok: false,
        erro: "Já existe uma leitura deste cliente para este mês.",
      };
    }

    const nova = {
      id: crypto.randomUUID(),
      cliente,
      mes,
      consumoKwh,
    };
    setReadings((prev) => [nova, ...prev]);
    return { ok: true };
  }

  function removeReading(id) {
    setReadings((prev) => prev.filter((r) => r.id !== id));
  }

  // Soma o consumo por cliente (ignora maiúsculas/minúsculas e espaços)
  const totals = useMemo(() => {
    const map = new Map();

    for (const r of readings) {
      const chave = chaveCliente(r.cliente);
      const atual = map.get(chave);
      if (atual) {
        atual.totalKwh += r.consumoKwh;
        atual.leituras += 1;
      } else {
        map.set(chave, {
          cliente: r.cliente,
          totalKwh: r.consumoKwh,
          leituras: 1,
        });
      }
    }

    return [...map.values()].sort((a, b) => b.totalKwh - a.totalKwh);
  }, [readings]);

  return (
    <main className="container">
      <header>
        <h1>⚡ Merx Energia</h1>
        <p>Registro de consumo mensal de energia</p>
      </header>

      <ReadingForm onAdd={addReading} />
      <TotalsByClient totals={totals} />
      <ReadingList readings={readings} onRemove={removeReading} />
    </main>
  );
}