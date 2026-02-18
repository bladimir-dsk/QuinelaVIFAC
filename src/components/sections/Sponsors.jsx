import React from "react";

export default function Sponsors() {
    // Array de patrocinadores - puedes modificar según necesites
    const patrocinadores = [
        { id: 1, nombre: "Patrocinador 1", imagen: "/Logo-vifac.webp" },
        { id: 2, nombre: "Patrocinador 2", imagen: "/Logo-vifac.webp" },
        { id: 3, nombre: "Patrocinador 3", imagen: "/Logo-vifac.webp" },
        { id: 4, nombre: "Patrocinador 4", imagen: "/Logo-vifac.webp" },
        { id: 5, nombre: "Patrocinador 5", imagen: "/Logo-vifac.webp" },
        { id: 6, nombre: "Patrocinador 6", imagen: "/Logo-vifac.webp" },
    ];

    return (
        <>
            <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden">
                    {/* Gradient overlays para efecto fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-50 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-50 to-transparent z-10"></div>

                    {/* Carrusel infinito */}
                    <div className="flex animate-scroll">
                        {/* Primera fila de logos */}
                        <div className="flex space-x-8 px-6">
                            {patrocinadores.map((sponsor) => (
                                <div
                                    key={`sponsor-${sponsor.id}`}
                                    className="flex-shrink-0 w-40 h-24 flex items-center justify-center p-4"
                                >
                                    <img
                                        src={sponsor.imagen}
                                        alt={sponsor.nombre}
                                        className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Segunda fila de logos (duplicada para efecto infinito) */}
                        <div className="flex space-x-12 px-6">
                            {patrocinadores.map((sponsor) => (
                                <div
                                    key={`sponsor-duplicate-${sponsor.id}`}
                                    className="flex-shrink-0 w-40 h-24 flex items-center justify-center p-4"
                                >
                                    <img
                                        src={sponsor.imagen}
                                        alt={sponsor.nombre}
                                        className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-500 pt-8">
                    Gracias a nuestros patrocinadores por hacer posible esta causa
                </p>
            </div>
        </>
    );
}