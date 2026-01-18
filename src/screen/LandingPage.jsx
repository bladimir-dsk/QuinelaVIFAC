import React from "react";
import { Layout } from "antd";
import AppHeader from "../components/layout/AppHeader";
import AppFooter from "../components/layout/AppFooter";
import Hero from "../components/sections/Hero";
import Section from "../components/sections/Section";
import Resultados from "../components/sections/Resultados";

const { Content } = Layout;

export default function LandingPage() {
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

        {/* Convocatoria Section */}
        <Section id="convocatoria" title="¿Cómo Participar?">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: 1,
                title: "Adquiere tu Boleto",
                description:
                  "Compra tu cupón con usuario y contraseña para participar. Tu compra apoya directamente a VIFAC.",
                icon: "🎫",
                color: "from-emerald-500 to-teal-600",
              },
              {
                step: 2,
                title: "Regístrate",
                description:
                  "Usa tus credenciales para registrarte en la plataforma y activar tu participación.",
                icon: "📝",
                color: "from-sky-500 to-blue-600",
              },
              {
                step: 3,
                title: "Participa y Gana",
                description:
                  "Sigue los partidos del Mundial 2026 y compite por increíbles premios mientras apoyas una gran causa.",
                icon: "⚽",
                color: "from-amber-500 to-orange-600",
              },
            ].map((item) => (
              <div key={item.step} className="group relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                ></div>

                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div
                    className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                  >
                    {item.step}
                  </div>

                  <div className="text-5xl mb-4">{item.icon}</div>

                  <h4 className="font-bold text-2xl mb-3 text-gray-800">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Premios Section */}
        <Section id="premios" title="Premios Increíbles">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Primer Lugar */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-1">
              <div className="bg-white rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-white">1°</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-3xl font-black text-gray-800 mb-3">
                      🏆 Experiencia Champions League o Fórmula 1
                    </h4>
                    <p className="text-lg text-gray-700 mb-2">
                      2 boletos de avión redondo • 3 noches de hotel • 2
                      entradas al evento
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      o $85,000 MXN
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Segundo Lugar */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-300 via-gray-300 to-zinc-400 p-1">
              <div className="bg-white rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-zinc-500 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-white">2°</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-3xl font-black text-gray-800 mb-3">
                      🎾 US Open de Tenis - Nueva York
                    </h4>
                    <p className="text-lg text-gray-700 mb-2">
                      2 boletos Mérida-NY-Mérida • 3 noches de hotel • 2 boletos
                      US Open
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-zinc-600 bg-clip-text text-transparent">
                      o $50,000 MXN
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tercer Lugar */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 p-1">
              <div className="bg-white rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-white">3°</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-3xl font-black text-gray-800 mb-3">
                      ⛳ Escapada Golf en Los Cabos
                    </h4>
                    <p className="text-lg text-gray-700 mb-2">
                      2 boletos Mérida-Cabos-Mérida • 3 noches de hotel • 2
                      Green Fees Diamante
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                      o $30,000 MXN
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de premios adicionales */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Cuarto Lugar */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">4°</span>
                  </div>
                  <h4 className="text-2xl font-bold">⚾ Leones de Yucatán</h4>
                </div>
                <p className="text-emerald-50 mb-2">
                  4 boletos para el partido inaugural 2023
                </p>
                <p className="text-xl font-bold">o $1,500 MXN</p>
              </div>

              {/* Premio de Consolación */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">💝</span>
                  </div>
                  <h4 className="text-2xl font-bold">Premio Consolación</h4>
                </div>
                <p className="text-pink-50 mb-2">
                  Para el último lugar de la quiniela
                </p>
                <p className="text-xl font-bold">$10,000 MXN</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Resultados Section */}
        <Section id="resultados" title="Resultados">
          <Resultados />
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
    </Layout>
  );
}
