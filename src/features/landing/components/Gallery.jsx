const MOSAIC = [
    { img: "https://images.unsplash.com/photo-1661625136635-e77e5e217c59?w=600&h=500&fit=crop&auto=format", label: "Salsa & Cultura" },
    { img: "https://images.unsplash.com/photo-1578398192993-b64a40ecb690?w=600&h=500&fit=crop&auto=format", label: "Avistamiento de Aves" },
    { img: "https://images.unsplash.com/photo-1644753787071-8933b5daed2d?w=600&h=500&fit=crop&auto=format", label: "Cocina Típica" },
    { img: "https://images.unsplash.com/photo-1672851612770-f969b3efc02d?w=600&h=500&fit=crop&auto=format", label: "Rutas de Naturaleza" },
    { img: "https://images.unsplash.com/photo-1731560818287-9186c6f18e29?w=600&h=500&fit=crop&auto=format", label: "Tour Urbano" },
    { img: "https://images.unsplash.com/photo-1559556064-4161b6be179b?w=600&h=500&fit=crop&auto=format", label: "Ecoturismo" },
];
export function Gallery() {
    return (<section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF7A00" }}>Galería</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Momentos inolvidables</h2>
        <p className="text-gray-500 mt-3 text-lg">Cada tour es una historia que contar</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {MOSAIC.map((item, i) => (<div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer" style={{ aspectRatio: "4/3" }}>
            <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"/>
            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white font-semibold text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">{item.label}</span>
            </div>
          </div>))}
      </div>
    </section>);
}
