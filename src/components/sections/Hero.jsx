import { Info } from "lucide-react";

export default function Hero({ showBackgroundImage = false,  onOpenInfo }) {
  return (
    <section className="relative min-h-screen z-auto flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-600 via-cyan-700 to-blue-700">

      {/* Imagen de fondo */}
      {showBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/public/Banner.webp')" }}>
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        {/* Main Heading */}
        <div className="mb-9">
          <h1 className="text-5xl sm:text-6xl font-titulo md:text-7xl lg:text-8xl text-white animate-slide-up">
            "JUEGA, GANA Y AYUDA"
          </h1>
          <span className="inline-block font-titulo text-3xl sm:text-2xl md:text-6xl lg:text-5xl bg-linear-to-r from-yellow-200 via-amber-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            QUINIELA MUNDIALISTA 2026
          </span>
        </div>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-medium animate-fade-in-delayed">
          Compra tu boleto, apoya a{" "}
          <span className="font-black text-yellow-300">mujeres embarazadas</span> en
          situación vulnerable y participa por increíbles premios durante el Mundial 2026
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-14 animate-fade-in-more-delayed">
          <button className="group relative bg-white text-emerald-700 font-black text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Comprar Boleto Ahora
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          {/* InfoModal con trigger personalizado que tiene el estilo del Hero */}
          <button
            onClick={onOpenInfo}
            className="group bg-white/10 backdrop-blur-lg font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full border-2 border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            <span className="flex items-center text-white justify-center gap-2">
              Conoce Más
              <Info className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-stats">
          <div className="group bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-xl">
            <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-110 transition-transform">40+</div>
            <div className="text-white/90 font-bold text-base">Años de Servicio</div>
          </div>
          <div className="group bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-300/40 hover:border-yellow-300/60 transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-xl shadow-yellow-500/20">
            <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-3 group-hover:scale-110 transition-transform">$85K</div>
            <div className="text-white/90 font-bold text-base">Premio Mayor</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-xl">
            <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-white/90 font-bold text-base">Apoyo Social</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes float-slow { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-15px); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 1s ease-out; }
        .animate-fade-in-delayed { animation: fade-in 0.8s ease-out 0.3s backwards; }
        .animate-fade-in-more-delayed { animation: fade-in 0.8s ease-out 0.5s backwards; }
        .animate-fade-in-stats { animation: fade-in 1s ease-out 0.7s backwards; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; animation-delay: 2s; }
      `}</style>
    </section>
  );
}