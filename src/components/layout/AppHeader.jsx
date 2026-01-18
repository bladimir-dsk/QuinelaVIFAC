import React, { useState, useEffect } from "react";
import { Menu } from "antd";

export default function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { key: "vifac", label: "VIFAC" },
    { key: "convocatoria", label: "Participar" },
    { key: "premios", label: "Premios" },
    { key: "resultados", label: "Resultados" },
  ];

  const scrollToSection = (key) => {
    const element = document.getElementById(key);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-6">
                <span className="text-white font-black text-xl transform -rotate-6">
                  V
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚽</span>
              </div>
            </div>
            <div>
              <h1
                className={`font-black text-xl transition-colors ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                VIFAC
              </h1>
              <p
                className={`text-xs font-medium transition-colors ${
                  scrolled ? "text-emerald-600" : "text-emerald-100"
                }`}
              >
                Mundial 2026
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className={`font-bold text-sm transition-all duration-200 hover:scale-105 ${
                  scrolled
                    ? "text-gray-700 hover:text-emerald-600"
                    : "text-white hover:text-emerald-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            Iniciar Sesión
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg
              className={`w-6 h-6 ${scrolled ? "text-gray-800" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
