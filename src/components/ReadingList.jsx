function formatMes(mes) {
  const [ano, m] = mes.split("-");
  return `${m}/${ano}`;
}

export default function ReadingList({ readings, onRemove }) {
  return (
    <section className="card">
      <h2>Leituras cadastradas</h2>

      {readings.length === 0 ? (
        <p className="vazio">Nenhuma leitura cadastrada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Mês</th>
              <th>Consumo (kWh)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {readings.map((r) => (
              <tr key={r.id}>
                <td>{r.cliente}</td>
                <td>{formatMes(r.mes)}</td>
                <td>{r.consumoKwh.toLocaleString("pt-BR")}</td>
                <td>
                  <button
                    className="remover"
                    onClick={() => onRemove(r.id)}
                    aria-label={`Remover leitura de ${r.cliente}`}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}