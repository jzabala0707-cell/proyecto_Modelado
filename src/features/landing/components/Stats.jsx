const STATS = [
    { value: "+5.200", label: "Viajeros felices" },
    { value: "38", label: "Tours disponibles" },
    { value: "+24", label: "Guías expertos" },
    { value: "⭐ 4.9", label: "Calificación promedio" },
];
export function Stats() {
    return (<section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)" }}>
          {STATS.map((s) => (<div key={s.label} className="text-white">
              <div className="text-4xl sm:text-5xl font-bold mb-2">{s.value}</div>
              <div className="text-white/75 text-sm font-medium">{s.label}</div>
            </div>))}
        </div>
      </div>
    </section>);
}
