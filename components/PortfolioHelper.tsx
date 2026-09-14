"use client";

import { useMemo, useState } from "react";
import { buildAllocation, type Risk } from "@/lib/portfolio";

function money(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

export default function PortfolioHelper() {
  const [capital, setCapital] = useState(10000);
  const [risk, setRisk] = useState<Risk>("balanced");
  const allocation = useMemo(() => buildAllocation(Math.max(0, capital || 0), risk), [capital, risk]);

  return (
    <section className="portfolioGrid">
      <article className="card">
        <span className="eyebrow">Scenario builder</span>
        <h2>Explore an allocation</h2>
        <p className="muted">Educational examples only. They do not account for your income, debts, taxes, time horizon, jurisdiction or ability to bear losses.</p>

        <label className="fieldLabel" htmlFor="capital">Capital</label>
        <div className="moneyInput"><span>$</span><input id="capital" type="number" min="0" step="100" value={capital} onChange={e => setCapital(Number(e.target.value))} /></div>

        <label className="fieldLabel" htmlFor="risk">Risk scenario</label>
        <select id="risk" value={risk} onChange={e => setRisk(e.target.value as Risk)}>
          <option value="conservative">Conservative</option>
          <option value="balanced">Balanced</option>
          <option value="growth">Growth</option>
        </select>
      </article>

      <article className="card">
        <div className="cardHead"><div><span className="eyebrow">Illustrative allocation</span><h2>{risk[0].toUpperCase() + risk.slice(1)} scenario</h2></div></div>
        <div className="allocations">
          {allocation.map(item => (
            <div className="allocation" key={item.label}>
              <div className="allocationHead"><strong>{item.label}</strong><span>{item.percent}%</span></div>
              <div className="bar"><span style={{ width: `${item.percent}%` }} /></div>
              <small>{money(item.amount)}</small>
            </div>
          ))}
        </div>
        <div className="riskNotice">No projected return is shown because a precise future return cannot be guaranteed. Production projections should display assumptions, ranges and uncertainty.</div>
      </article>
    </section>
  );
}
