import { Mountain, Utensils, Landmark, Leaf } from "lucide-react";
const CATEGORIES = [
    {
        name: "Aventura",
        icon: Mountain,
        img: "https://images.unsplash.com/photo-1486787284432-3749cdce2660?w=600&h=400&fit=crop&auto=format",
        count: "12 tours",
        color: "#FF7A00",
    },
    {
        name: "Cultura",
        icon: Landmark,
        img: "https://images.unsplash.com/photo-1715503234322-4edf36c85cf1?w=600&h=400&fit=crop&auto=format",
        count: "9 tours",
        color: "#2E7D32",
    },
    {
        name: "Gastronomía",
        icon: Utensils,
        img: "https://images.unsplash.com/photo-1644753787131-a75cbda834cd?w=600&h=400&fit=crop&auto=format",
        count: "7 tours",
        color: "#FF7A00",
    },
    {
        name: "Naturaleza",
        icon: Leaf,
        img: "https://images.unsplash.com/photo-1672851612770-f969b3efc02d?w=600&h=400&fit=crop&auto=format",
        count: "10 tours",
        color: "#2E7D32",
    },
];
export function Categories() {
    return (<section id="categories" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF7A00" }}>Explora</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Categorías de experiencias</h2>
        <p className="text-gray-500 mt-3 text-lg">Encuentra el tour perfecto según tus intereses</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (<div key={cat.name} className="group relative overflow-hidden rounded-2xl cursor-pointer" style={{ aspectRatio: "3/4" }}>
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300" style={{ background: cat.color }}/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: cat.color }}>
                  <Icon className="w-5 h-5 text-white"/>
                </div>
                <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                <p className="text-white/70 text-sm">{cat.count}</p>
              </div>
            </div>);
        })}
      </div>
    </section>);
}
