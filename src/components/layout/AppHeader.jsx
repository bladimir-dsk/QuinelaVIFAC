import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { key: "patrocinadores", label: "Patrocinadores" },
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
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-emerald-600 shadow-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden transition-all duration-300">
                  <img
                    src="/Logo-vifac.webp"
                    alt="VIFAC Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0">
                <span className={`font-black text-xl leading-none transition-colors ${scrolled ? "text-gray-900" : "text-white"
                  }`}>
                  VIFAC
                </span>
                <span className={`text-xs font-semibold leading-none transition-colors ${scrolled ? "text-blue-700" : "text-white"
                  }`}>
                  Mundial 2026
                </span>
              </div>
            </div>
            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  style={{ color: scrolled ? '#008236' : 'white' }}
                  onClick={() => scrollToSection(item.key)}
                  className="font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Link to='/login'>
              <div
                className={`hidden md:flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${scrolled
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-white text-emerald-600 hover:bg-gray-50"
                  }`}
              >
                <span>Iniciar Sesión</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
                }`}
              aria-label="Toggle menu">
              <svg
                className={`w-6 h-6 transition-all duration-300 ${mobileMenuOpen ? "rotate-90" : ""
                  } ${scrolled ? "text-gray-900" : "text-white"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-20 right-4 left-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}>
          <nav className="p-4">
            {menuItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className={`w-full text-center font-semibold text-gray-700 px-4 py-3 rounded-lg hover:bg-green-100 hover:text-emerald-600 transition-all ${index !== menuItems.length - 1 ? "mb-1" : ""
                  }`}>
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-100 my-3"></div>

            <Link
              to='/login'
              style={{ backgroundColor: '#10b981', color: 'white' }}
              className="w-full flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}>
              <span>Iniciar Sesión</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}