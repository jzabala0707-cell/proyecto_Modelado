import { Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Phone, Heart } from "lucide-react";
export function Footer({ email, setEmail, subscribed, setSubscribed }) {
    const handleSubscribe = () => {
        if (email) {
            setSubscribed(true);
        }
    };
    return (<footer id="footer" className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10" style={{ background: "linear-gradient(135deg, #FF7A00, #ff9a3c)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">¿Listo para tu próxima aventura?</h3>
          <p className="text-white/80 mb-6">Suscríbete y recibe ofertas exclusivas y novedades de nuestros tours</p>
          {subscribed ? (<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium">
              ✅ ¡Gracias por suscribirte!
            </div>) : (<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3">
                <Mail className="w-4 h-4 text-gray-400 shrink-0"/>
                <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 text-sm text-gray-700 bg-transparent outline-none"/>
              </div>
              <button onClick={handleSubscribe} className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
                Suscribirme
              </button>
            </div>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FF7A00" }}>
                <MapPin className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold">Arte<span style={{ color: "#FF7A00" }}>Tours</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Conectamos viajeros con las mejores experiencias turísticas de Medellín y Colombia.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (<a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ background: i % 2 === 0 ? "#FF7A00" : "#2E7D32" }}>
                  <Icon className="w-4 h-4 text-white"/>
                </a>))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Tours</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Tour Comuna 13", "City Tour", "Coffee Tour", "Food Tour", "Tour Naturaleza"].map((l) => (<li key={l}><a href="#" className="hover:text-[#FF7A00] transition-colors">{l}</a></li>))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Sobre nosotros", "Guías", "Reseñas", "Blog", "Prensa"].map((l) => (<li key={l}><a href="#" className="hover:text-[#FF7A00] transition-colors">{l}</a></li>))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#FF7A00" }}/>
                +57 304 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#FF7A00" }}/>
                hola@artetoursmed.co
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#FF7A00" }}/>
                El Poblado, Medellín, Antioquia
              </li>
            </ul>
            <div className="mt-5 space-y-2 text-xs text-gray-500">
              <a href="#" className="block hover:text-gray-300 transition-colors">Términos y condiciones</a>
              <a href="#" className="block hover:text-gray-300 transition-colors">Política de privacidad</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>© 2026 ArteTours Medellín. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 mx-1" style={{ color: "#FF7A00", fill: "#FF7A00" }}/> en Medellín, Colombia
          </span>
        </div>
      </div>
    </footer>);
}
