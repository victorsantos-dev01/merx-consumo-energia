import { useEffect, useMemo, useState } from "react";
import ReadingForm from "./components/ReadingForm";
import ReadingList from "./components/ReadingList";
import TotalsByClient from "./components/TotalsByClient";

const STORAGE_KEY = "merx-leituras";

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
    const nova = {
      id: crypto.randomUUID(),
      cliente,
      mes,
      consumoKwh,
    };
    setReadings((prev) => [nova, ...prev]);
  }

  function removeReading(id) {
    setReadings((prev) => prev.filter((r) => r.id !== id));
  }

  // Soma o consumo por cliente (ignora maiúsculas/minúsculas e espaços)
  const totals = useMemo(() => {
    const map = new Map();

    for (const r of readings) {
      const chave = r.cliente.trim().toLowerCase();
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