import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import AppHeader from "../../components/layout/AppHeader";
import AppFooter from "../../components/layout/AppFooter";
import Hero from "../../components/sections/Hero";
import Section from "../../components/sections/Section";
import Resultados from "../../components/sections/Resultados";
import Sponsors from "../../components/sections/Sponsors";
import PremiosSection from "../../components/sections/PremiosSection";
import ConvocatoriaSection from "../../components/sections/ConvocatoriaSection";
import InfoModal from "../../components/modals/InfoModal";
import RegulationModal from "../../components/modals/RegulationModal";

const { Content } = Layout;

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [regulationOpen, setRegulationOpen] = useState(false);

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
    <Layout className="bg-linear-to-br from-emerald-50 via-white to-sky-50">
      <AppHeader />
      <Content className="pt-16">
        {/* Hero recibe la función para abrir el modal de Info */}
        <Hero showBackgroundImage={true} onOpenInfo={() => setInfoOpen(true)} />

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
                  <span className="font-bold text-blue-500">
                    mujeres embarazadas
                  </span>
                  , brindándoles servicios gratuitos de acompañamiento y
                  superación personal.
                </p>
                <p className="text-base text-gray-600 text-center">
                  Más de{" "}
                  <span className="font-bold text-blue-500">40 años</span>{" "}
                  apoyando a mujeres en situación vulnerable en su camino hacia
                  la maternidad.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Convocatoria Section */}
        <Section id="convocatoria" title="¿Cómo Participar?">
          <ConvocatoriaSection />
        </Section>

        <Section id="premios" title="Premios Increíbles">
          <PremiosSection />
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
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600"></div>
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

      {/* AppFooter recibe la función para abrir el modal de Reglamento */}
      <AppFooter onOpenRegulation={() => setRegulationOpen(true)} />

      <InfoModal
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
      />

      <RegulationModal visible={regulationOpen} onClose={() => setRegulationOpen(false)} />

      {/* Botón Volver al Inicio */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-fade-in"
          aria-label="Volver al inicio"
          style={{ color: "white" }}
        >
          <ArrowUpOutlined className="text-2xl" />
        </button>
      )}
    </Layout>
  );
}