// components/GoReportClient.js
"use client";

import { useEffect, useMemo, useState } from "react";

function aggregate(rows) {
  const map = new Map();
  for (const r of rows) {
    map.set(r.slug, (map.get(r.slug) || 0) + 1);
  }
  return Array.from(map.entries()).map(([slug, count]) => ({ slug, count }));
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function GoReportClient() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("toolsClicks");
      setRows(raw ? JSON.parse(raw) : []);
    } catch {
      setRows([]);
    }
  }, []);

  const totalsAll = useMemo(
    () => aggregate(rows).sort((a, b) => b.count - a.count),
    [rows]
  );

  const now = Date.now();
  const rows7d = rows.filter((r) => now - r.ts <= 7 * 24 * 60 * 60 * 1000);
  const totals7d = useMemo(
    () => aggregate(rows7d).sort((a, b) => b.count - a.count),
    [rows7d]
  );

  function downloadCSV() {
    const header = "slug,timestamp,datetime\n";
    const lines = rows
      .map((r) => `${r.slug},${r.ts},"${formatDate(r.ts)}"`)
      .join("\n");
    const blob = new Blob([header + lines], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tools_clicks.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearData() {
    localStorage.removeItem("toolsClicks");
    setRows([]);
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">/go — Internal Click Report</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Local-only view (demo). Source of truth rămâne GA4 &amp; UTM-urile.
      </p>

      <div className="flex gap-3 mb-6">
        <button className="btn-primary" onClick={downloadCSV}>
          Download CSV
        </button>
        <button className="btn-ghost" onClick={clearData}>
          Reset local data
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Top clicks — last 7 days</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {totals7d.map((r) => (
            <div key={r.slug} className="card">
              <div className="p-4 flex items-center justify-between">
                <span className="font-medium">{r.slug}</span>
                <span className="text-zinc-300">{r.count}</span>
              </div>
            </div>
          ))}
          {!totals7d.length && (
            <p className="text-sm text-zinc-400">No data yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">
          All-time clicks (this device)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-zinc-400">
                <th className="py-2 pr-4">Slug</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rows
                .slice()
                .reverse()
                .map((r, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-2 pr-4">{r.slug}</td>
                    <td className="py-2 pr-4">{formatDate(r.ts)}</td>
                    <td className="py-2">{r.ts}</td>
                  </tr>
                ))}
              {!rows.length && (
                <tr>
                  <td colSpan="3" className="py-3 text-zinc-400">
                    No clicks recorded yet. Use the “Visit” buttons on /tools.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
