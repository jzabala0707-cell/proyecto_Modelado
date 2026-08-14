import { MapPin, Star, Clock, Users, Heart, ArrowRight } from "lucide-react";
const TOURS = [
    {
        id: 1,
        name: "Tour Comuna 13",
        img: "https://images.unsplash.com/photo-1693669029454-ab14dd80faaa?w=800&h=500&fit=crop&auto=format",
        duration: "4 horas",
        capacity: "15 personas",
        price: "$85.000",
        rating: 4.9,
        reviews: 312,
        badge: "Más vendido",
        location: "Medellín",
    },
    {
        id: 2,
        name: "City Tour Medellín",
        img: "https://images.unsplash.com/photo-1665419381995-0154f249f41f?w=800&h=500&fit=crop&auto=format",
        duration: "6 horas",
        capacity: "20 personas",
        price: "$120.000",
        rating: 4.8,
        reviews: 214,
        badge: "Más vendido",
        location: "Medellín",
    },
    {
        id: 3,
        name: "Coffee Tour",
        img: "https://images.unsplash.com/photo-1532185922611-3410b1898a1c?w=800&h=500&fit=crop&auto=format",
        duration: "8 horas",
        capacity: "12 personas",
        price: "$195.000",
        rating: 4.9,
        reviews: 178,
        badge: null,
        location: "Eje Cafetero",
    },
    {
        id: 4,
        name: "Food Tour Gourmet",
        img: "https://images.unsplash.com/photo-1723693407562-bb4fcae76797?w=800&h=500&fit=crop&auto=format",
        duration: "3 horas",
        capacity: "10 personas",
        price: "$75.000",
        rating: 4.7,
        reviews: 96,
        badge: null,
        location: "Medellín",
    },
];
export function FeaturedTours({ liked, onToggleLike }) {
    return (<section id="tours" className="py-20" style={{ background: "#f0faf0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#2E7D32" }}>Destacados</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Tours más populares</h2>
          <p className="text-gray-500 mt-3 text-lg">Los favoritos de nuestros viajeros este mes</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOURS.map((tour) => (<div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <img src={tour.img} alt={tour.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                {tour.badge && (<span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#2E7D32" }}>
                    {tour.badge}
                  </span>)}
                <button onClick={() => onToggleLike(tour.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110">
                  <Heart className="w-4 h-4 transition-colors" style={{ color: liked[tour.id] ? "#FF7A00" : "#9ca3af", fill: liked[tour.id] ? "#FF7A00" : "none" }}/>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-gray-400"/>
                  <span className="text-xs text-gray-400">{tour.location}</span>
                  <span className="ml-auto flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" style={{ color: "#FF7A00", fill: "#FF7A00" }}/>
                    <span className="text-xs font-bold text-gray-700">{tour.rating}</span>
                    <span className="text-xs text-gray-400">({tour.reviews})</span>
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3">{tour.name}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{tour.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{tour.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Desde</span>
                    <p className="font-bold text-lg text-gray-900">{tour.price}</p>
                  </div>
                  <button className="px-4 py-2 text-white text-sm font-semibold rounded-xl transition-opacity duration-200 hover:opacity-90" style={{ background: "#FF7A00" }}>
                    Reservar
                  </button>
                </div>
              </div>
            </div>))}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 border-2 font-semibold rounded-full transition-all duration-200 hover:text-white hover:bg-[#2E7D32]" style={{ borderColor: "#2E7D32", color: "#2E7D32" }}>
            Ver todos los tours <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </section>);
}
