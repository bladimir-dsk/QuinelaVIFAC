import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600">
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Football pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 text-9xl">⚽</div>
          <div className="absolute top-40 right-32 text-7xl">⚽</div>
          <div className="absolute bottom-20 left-40 text-8xl">⚽</div>
          <div className="absolute bottom-40 right-20 text-6xl">⚽</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Mundial 2026 Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in">
          <span className="text-2xl">⚽</span>
          <span className="text-white font-bold text-sm tracking-wide">MUNDIAL 2026</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight animate-slide-up">
          Apoya, Participa
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
            y Gana
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-delayed">
          Compra tu boleto, apoya a <span className="font-bold">mujeres embarazadas</span> en 
          situación vulnerable y participa por increíbles premios durante el Mundial 2026
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-more-delayed">
          <button className="group relative bg-white text-emerald-600 font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="relative z-10">Comprar Boleto Ahora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
          
          <button className="bg-white/10 backdrop-blur-md text-white font-bold text-lg px-10 py-5 rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105">
            Conoce Más
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-20 animate-fade-in-stats">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">40+</div>
            <div className="text-white/80 font-medium text-sm md:text-base">Años de Servicio</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl md:text-5xl font-black text-yellow-300 mb-2">$85K</div>
            <div className="text-white/80 font-medium text-sm md:text-base">Premio Mayor</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">100%</div>
            <div className="text-white/80 font-medium text-sm md:text-base">Apoyo Social</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s backwards;
        }

        .animate-fade-in-more-delayed {
          animation: fade-in 0.8s ease-out 0.6s backwards;
        }

        .animate-fade-in-stats {
          animation: fade-in 0.8s ease-out 0.9s backwards;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
