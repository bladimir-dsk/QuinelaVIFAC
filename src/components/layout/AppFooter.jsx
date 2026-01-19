import React from "react";

export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* VIFAC Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/Logo-vifac.webp"
                  alt="VIFAC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-black text-2xl leading-none">VIFAC</h3>
                <p className="text-emerald-400 text-sm font-medium leading-none">Mundial 2026</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Institución sin fines de lucro dedicada al cuidado de la salud y bienestar
              de las mujeres embarazadas, brindándoles servicios gratuitos de acompañamiento
              y superación personal.
            </p>
            <p className="text-emerald-400 font-semibold">
              Más de 40 años transformando vidas
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-emerald-400">Enlaces</h4>
            <ul className="space-y-2">
              {["VIFAC", "Participar", "Premios", "Resultados"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-emerald-400">Contacto</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contacto@vifac.org</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+52 (999) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Mérida, Yucatán</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 VIFAC. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Reglamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
