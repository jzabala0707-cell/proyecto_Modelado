import { MapPin, Menu, X } from "lucide-react";
const NAV_LINKS = [
    { label: "Tours", href: "#tours" },
    { label: "Destinos", href: "#categories" },
    { label: "Reseñas", href: "#testimonials" },
    { label: "Contacto", href: "#footer" },
];
export function Navbar({ mobileOpen, setMobileOpen }) {
    return (<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FF7A00" }}>
              <MapPin className="w-5 h-5 text-white"/>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Arte<span style={{ color: "#FF7A00" }}>Tours</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-400 ml-1">Medellín</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (<a key={l.label} href={l.href} className="text-sm text-gray-600 font-medium transition-colors duration-200 hover:text-[#FF7A00]">
                {l.label}
              </a>))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium border-2 rounded-full transition-all duration-200 !text-[#FF7A00] !border-[#FF7A00] hover:!bg-[#FF7A00] hover:!text-white active:!bg-[#E56A00] active:!text-white focus-visible:!bg-[#FF7A00] focus-visible:!text-white"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="px-4 py-2 text-sm font-medium rounded-full transition-opacity duration-200 hover:opacity-90 shadow-sm !text-white"
              style={{ background: "#FF7A00" }}
            >
              Registrarse
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      {mobileOpen && (<div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV_LINKS.map((l) => (<a key={l.label} href={l.href} className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>))}
          <div className="flex gap-3 pt-2">
            <a
              href="/login"
              className="flex-1 text-center py-2 text-sm font-medium border-2 rounded-full !text-[#FF7A00] !border-[#FF7A00] active:!bg-[#FF7A00] active:!text-white hover:!bg-[#FF7A00] hover:!text-white"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="flex-1 text-center py-2 text-sm font-medium rounded-full !text-white"
              style={{ background: "#FF7A00" }}
            >
              Registrarse
            </a>
          </div>
        </div>)}
    </header>);
}
