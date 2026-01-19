import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import AppHeader from "../../components/layout/AppHeader";
import AppFooter from "../../components/layout/AppFooter";
import Hero from "../../components/sections/Hero";
import Section from "../../components/sections/Section";
import Resultados from "../../components/sections/Resultados";
import Sponsors from "../../components/sections/Sponsors";

const { Content } = Layout;

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout className="bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <AppHeader />
      <Content className="pt-16">
        <Hero />

        {/* VIFAC Section */}
        <Section id="vifac" title="¿Qué es VIFAC?">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-200/30 rounded-full blur-3xl"></div>

              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-100">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-6">
                  Somos una institución sin fines de lucro cuyo objetivo es el
                  cuidado de la salud y bienestar de las{" "}
                  <span className="font-bold text-emerald-600">
                    mujeres embarazadas
                  </span>
                  , brindándoles servicios gratuitos de acompañamiento y
                  superación personal.
                </p>
                <p className="text-base text-gray-600 text-center">
                  Más de{" "}
                  <span className="font-bold text-emerald-600">40 años</span>{" "}
                  apoyando a mujeres en situación vulnerable en su camino hacia
                  la maternidad.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Premios Section */}
        <Section id="premios" title="Premios Increíbles">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Primer Lugar */}
            <div className="group relative overflow-hidden rounded-3xl">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-[2px] rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>

              <div className="relative bg-white rounded-3xl p-8 md:p-12 m-[2px]">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Medal */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-5xl font-black text-white">1°</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h4 className="text-3xl md:text-4xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-3">
                      <span className="text-4xl">🏆</span>
                      <span>Champions League o Fórmula 1</span>
                    </h4>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {["2 boletos de avión", "3 noches de hotel", "2 entradas al evento"].map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-full text-sm font-semibold text-amber-800">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="text-gray-600 font-medium">o efectivo </span>
                      <span className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        $85,000 MXN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Segundo Lugar */}
            <div className="group relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-gray-400 to-zinc-400 p-[2px] rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-gray-400 to-zinc-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>

              <div className="relative bg-white rounded-3xl p-8 md:p-12 m-[2px]">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-zinc-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-slate-400 via-gray-400 to-zinc-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-5xl font-black text-white">2°</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h4 className="text-3xl md:text-4xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-3">
                      <span className="text-4xl">🎾</span>
                      <span>US Open de Tenis</span>
                    </h4>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {["Vuelos Mérida-NY", "3 noches de hotel", "2 boletos US Open"].map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-700">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="text-gray-600 font-medium">o efectivo </span>
                      <span className="text-3xl font-black bg-gradient-to-r from-slate-600 to-zinc-600 bg-clip-text text-transparent">
                        $50,000 MXN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tercer Lugar */}
            <div className="group relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 p-[2px] rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>

              <div className="relative bg-white rounded-3xl p-8 md:p-12 m-[2px]">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-5xl font-black text-white">3°</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h4 className="text-3xl md:text-4xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-3">
                      <span className="text-4xl">⛳</span>
                      <span>Golf en Los Cabos</span>
                    </h4>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {["Vuelos redondos", "3 noches de hotel", "2 Green Fees"].map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-full text-sm font-semibold text-orange-800">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="text-gray-600 font-medium">o efectivo </span>
                      <span className="text-3xl font-black bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                        $30,000 MXN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de premios adicionales */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Cuarto Lugar */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-3xl font-black text-white">4°</span>
                    </div>
                    <h4 className="text-3xl font-black text-white flex items-center gap-2">
                      <span>⚾</span>
                      <span>Leones de Yucatán</span>
                    </h4>
                  </div>

                  <p className="text-emerald-50 text-lg">
                    4 boletos para el partido inaugural 2023
                  </p>

                  <div className="pt-2">
                    <span className="text-emerald-100">o efectivo </span>
                    <span className="text-2xl font-black text-white">$1,500 MXN</span>
                  </div>
                </div>
              </div>

              {/* Premio de Consolación */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 p-8 shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-4xl">💝</span>
                    </div>
                    <h4 className="text-3xl font-black text-white">
                      Premio Consolación
                    </h4>
                  </div>

                  <p className="text-pink-50 text-lg">
                    Para el último lugar de la quiniela
                  </p>

                  <div className="pt-2">
                    <span className="text-3xl font-black text-white">$10,000 MXN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Resultados Section */}
        <Section id="resultados" title="Resultados">
          <Resultados />
        </Section>

        {/* Patrocinadores Section */}
        <Section id="patrocinadores" title="Nuestros Patrocinadores">
          <Sponsors />
        </Section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¡Apoya y Participa Ahora!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Cada boleto que compras ayuda a mujeres embarazadas en situación
              vulnerable y te da la oportunidad de ganar premios increíbles.
            </p>
            <button className="bg-white text-emerald-600 font-bold text-lg px-12 py-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300">
              Comprar Boleto
            </button>
          </div>
        </section>
      </Content>
      <AppFooter />

      {/* Botón Volver al Inicio */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-fade-in"
          aria-label="Volver al inicio"
          style={{ color: 'white' }}
        >
          <ArrowUpOutlined className="text-2xl" />
        </button>
      )}
    </Layout>
  );
}