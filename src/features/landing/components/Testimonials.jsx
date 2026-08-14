import { Star } from "lucide-react";
const TESTIMONIALS = [
    {
        name: "Sophie Laurent",
        country: "Francia 🇫🇷",
        avatar: "https://images.unsplash.com/photo-1718119617938-2a3b376fb7d6?w=200&h=200&fit=crop&auto=format",
        text: "El tour por la Comuna 13 fue una experiencia transformadora. Nuestro guía Carlos nos mostró la resiliencia y arte del barrio de una manera que ningún libro podría describir.",
        tour: "Tour Comuna 13",
        rating: 5,
    },
    {
        name: "James Morrison",
        country: "Australia 🇦🇺",
        avatar: "https://images.unsplash.com/photo-1486787284432-3749cdce2660?w=200&h=200&fit=crop&auto=format",
        text: "El Coffee Tour superó todas mis expectativas. Ver el proceso del café de la semilla a la taza, en medio de paisajes verdes increíbles, fue absolutamente memorable.",
        tour: "Coffee Tour",
        rating: 5,
    },
    {
        name: "María Rodríguez",
        country: "España 🇪🇸",
        avatar: "https://images.unsplash.com/photo-1644753787131-a75cbda834cd?w=200&h=200&fit=crop&auto=format",
        text: "Arte Tours tiene la mejor organización que he visto en Latinoamérica. Todo impecable, los guías hablan varios idiomas y la atención al cliente es de primer nivel.",
        tour: "City Tour Medellín",
        rating: 5,
    },
];
export function Testimonials() {
    return (<section id="testimonials" className="py-20" style={{ background: "#fffbf5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF7A00" }}>Testimonios</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Lo que dicen nuestros viajeros</h2>
          <p className="text-gray-500 mt-3 text-lg">Más de 5.200 experiencias compartidas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (<div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-4 h-4" style={{ color: "#FF7A00", fill: "#FF7A00" }}/>))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <span className="self-start px-3 py-1 rounded-full text-xs font-medium" style={{ background: "#fff3e0", color: "#FF7A00" }}>
                {t.tour}
              </span>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: "#FF7A00" }}/>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.country}</p>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
