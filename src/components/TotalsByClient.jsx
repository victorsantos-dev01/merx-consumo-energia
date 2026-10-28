export default function TotalsByClient({ totals }) {
  // Soma de todos os clientes
  const totalGeral = totals.reduce((soma, t) => soma + t.totalKwh, 0);
  const totalLeituras = totals.reduce((soma, t) => soma + t.leituras, 0);

  return (
    <section className="card">
      <h2>Consumo total por cliente</h2>

      {totals.length === 0 ? (
        <p className="vazio">Sem dados para totalizar.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Leituras</th>
              <th>Total (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((t) => (
              <tr key={t.cliente}>
                <td>{t.cliente}</td>
                <td>{t.leituras}</td>
                <td>
                  <strong>{t.totalKwh.toLocaleString("pt-BR")}</strong>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total geral</td>
              <td>{totalLeituras}</td>
              <td>{totalGeral.toLocaleString("pt-BR")}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  );
}