import { Mail, Phone, MapPin, Heart, ArrowUpRight, ExternalLink } from "lucide-react";
import PrivacyModal from "../modals/PrivacyModal";

export default function AppFooter({ onOpenRegulation }) {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="">
                <img src="/Logo.webp" loading="lazy" alt="VIFAC Logo" className="h-13 w-auto object-cover" />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-5 text-sm max-w-sm">
              Institución sin fines de lucro dedicada al cuidado de la salud y bienestar
              de las mujeres embarazadas, brindándoles servicios gratuitos de
              acompañamiento y superación personal.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
              <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Más de 40 años transformando vidas</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-blue-400">
              Enlaces
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#vifac" className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span>VIFAC</span>
                </a>
              </li>
              <li>
                <a href="#convocatoria" className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span>Participar</span>
                </a>
              </li>
              <li>
                <a href="#premios" className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span>Premios</span>
                </a>
              </li>
              <li>
                <a href="#resultados" className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span>Resultados</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-blue-400">
              Contacto
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-400 text-sm">contacto@vifac.org</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-400 text-sm">+52 (999) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-400 text-sm">Mérida, Yucatán</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © 2026 VIFAC. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <PrivacyModal />
              <span className="text-gray-700 text-xs">·</span>
              <button
                onClick={onOpenRegulation}
                className="group inline-flex items-center gap-1 text-blue-500! hover:text-blue-400! cursor-pointer transition-colors duration-200 text-xs px-2 py-1 rounded-md hover:bg-blue-500/10"
              >
                <ExternalLink className="w-3 h-3 opacity-0  group-hover:opacity-100 transition-opacity duration-200" />
                Reglamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}