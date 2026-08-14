import { ChevronLeft, ChevronRight, ArrowRight, Search, Clock, Users } from "lucide-react";
const CAROUSEL_SLIDES = [
    {
        img: "https://images.unsplash.com/photo-1671240434571-a21d691f713b?w=1600&h=900&fit=crop&auto=format",
        title: "Descubre Medellín como nunca antes",
        sub: "La ciudad de la eterna primavera te espera con experiencias únicas",
        badge: "🎨 Comuna 13",
    },
    {
        img: "https://images.unsplash.com/photo-1548397968-8790c49522db?w=1600&h=900&fit=crop&auto=format",
        title: "La ciudad más innovadora del mundo",
        sub: "Explora sus barrios, cultura y gastronomía con guías expertos",
        badge: "🏙️ City Tour",
    },
    {
        img: "https://images.unsplash.com/photo-1568489711036-9c94a7d5aea6?w=1600&h=900&fit=crop&auto=format",
        title: "Naturaleza y aventura sin límites",
        sub: "Rutas de montaña, reservas naturales y paisajes que te dejarán sin palabras",
        badge: "🌿 Naturaleza",
    },
];
export function Hero({ slide, setSlide, prev, next, searchType, setSearchType, searchDate, setSearchDate, searchPeople, setSearchPeople, }) {
    return (<section className="relative overflow-hidden" style={{ height: "92vh", minHeight: "560px" }}>
      {CAROUSEL_SLIDES.map((s, i) => (<div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === slide ? 1 : 0 }}>
          <img src={s.img} alt={s.badge} className="w-full h-full object-cover"/>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)" }}/>
        </div>))}

      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-white" style={{ background: "rgba(255,122,0,0.85)" }}>
            {CAROUSEL_SLIDES[slide].badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-xl">
            {CAROUSEL_SLIDES[slide].title}
          </h1>
          <p className="text-lg text-white/85 mb-8 drop-shadow-md">{CAROUSEL_SLIDES[slide].sub}</p>
          <a href="#tours" className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl text-lg shadow-xl transition-all duration-200 hover:scale-105" style={{ background: "#FF7A00" }}>
            Ver tours disponibles <ArrowRight className="w-5 h-5"/>
          </a>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
        <ChevronLeft className="w-5 h-5"/>
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
        <ChevronRight className="w-5 h-5"/>
      </button>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {CAROUSEL_SLIDES.map((_, i) => (<button key={i} onClick={() => setSlide(i)} className="rounded-full transition-all duration-300" style={{ width: i === slide ? "28px" : "8px", height: "8px", background: i === slide ? "#FF7A00" : "rgba(255,255,255,0.5)" }}/>))}
      </div>

      {/* Search Bar floating at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 translate-y-1/2 w-full max-w-4xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row gap-3 border border-gray-100">
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
            <Search className="w-4 h-4 text-gray-400 shrink-0"/>
            <select className="flex-1 bg-transparent text-sm text-gray-700 outline-none" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="">Tipo de tour</option>
              <option>Cultura</option>
              <option>Aventura</option>
              <option>Gastronomía</option>
              <option>Naturaleza</option>
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
            <Clock className="w-4 h-4 text-gray-400 shrink-0"/>
            <input type="date" className="flex-1 bg-transparent text-sm text-gray-700 outline-none" value={searchDate} onChange={(e) => setSearchDate(e.target.value)}/>
          </div>
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
            <Users className="w-4 h-4 text-gray-400 shrink-0"/>
            <select className="flex-1 bg-transparent text-sm text-gray-700 outline-none" value={searchPeople} onChange={(e) => setSearchPeople(e.target.value)}>
              <option value="">Personas</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n}>{n} persona{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <button className="px-6 py-3 text-white font-semibold rounded-xl transition-opacity duration-200 hover:opacity-90 shadow-md" style={{ background: "#FF7A00" }}>
            Buscar
          </button>
        </div>
      </div>
    </section>);
}
