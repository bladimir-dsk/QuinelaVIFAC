import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Heart, Phone, Mail, MapPin, Star, ChevronRight } from "lucide-react";
import { Button } from "antd";

export default function InfoModal({ visible, onClose }) {

    useEffect(() => {
        if (!visible) return;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [visible]);

    
    if (!visible) return null;

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/70"
                style={{ zIndex: 9998 }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="fixed inset-0 flex items-center justify-center p-4"
                style={{ zIndex: 9999 }}
            >
                <div
                    className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ── Header fijo ── */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-700 rounded-t-2xl shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-300/30! flex items-center justify-center shrink-0">
                                <Heart className="w-5 h-5 text-blue-500!" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium text-black dark:text-white leading-tight">Conoce VIFAC</span>
                                <span className="text-blue-500 text-xs font-medium">Vida y Familia A.C.</span>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-black! dark:text-white! hover:text-gray-400! transition-colors ml-4">
                            <X size={22} />
                        </button>
                    </div>

                    {/* ── Body scrollable ── */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">

                        {/* Quiénes somos */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                                    <Heart className="w-3 h-3 text-emerald-600" />
                                </span>
                                ¿Quiénes somos?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                VIFAC (Vida y Familia A.C.) es una institución sin fines de lucro con más de{" "}
                                <strong className="text-gray-800 dark:text-gray-100">40 años de trayectoria</strong>,
                                dedicada al cuidado integral de mujeres embarazadas en situación vulnerable.
                                Brindamos servicios gratuitos de acompañamiento médico, psicológico y superación
                                personal para que cada mamá pueda dar lo mejor a su bebé.
                            </p>
                        </section>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: "40+", label: "Años de servicio", color: "from-emerald-500 to-teal-500" },
                                { value: "100%", label: "Apoyo gratuito", color: "from-blue-500 to-cyan-500" },
                                { value: "∞", label: "Vidas impactadas", color: "from-amber-500 to-orange-500" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`bg-linear-to-br ${stat.color} rounded-xl p-4 text-center text-white shadow-md`}
                                >
                                    <div className="text-3xl font-black leading-none">{stat.value}</div>
                                    <div className="text-xs font-medium mt-1 text-white/90">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* La Quiniela */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                                    <Star className="w-3 h-3 text-amber-600" />
                                </span>
                                La Quiniela Mundialista 2026
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                                La{" "}
                                <strong className="text-gray-800 dark:text-gray-100">Quiniela Mundialista VIFAC 2026</strong>{" "}
                                es nuestra principal campaña de recaudación. Cada boleto de{" "}
                                <strong className="text-gray-800 dark:text-gray-100">$1,500 MXN</strong> que adquieras
                                contribuye directamente a financiar nuestros programas y te da la oportunidad de ganar
                                increíbles premios.
                            </p>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3">
                                <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">
                                    La quiniela se basa en los resultados de la primera ronda del Mundial 2026.
                                    ¡Predice, compite y gana ayudando!
                                </p>
                            </div>
                        </section>

                        {/* Cómo participar */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-3 h-3 text-blue-600" />
                                </span>
                                ¿Cómo participar?
                            </h3>
                            <div className="space-y-2">
                                {[
                                    "Compra tu boleto por $1,500 MXN (depósito, efectivo o tarjeta en línea)",
                                    "Llena tu quiniela con los resultados de la primera ronda",
                                    "Sigue los partidos y consulta el marcador en tiempo real",
                                    "¡Gana premios increíbles y ayuda a mamás en situación vulnerable!",
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contacto */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                                    <Phone className="w-3 h-3 text-purple-600" />
                                </span>
                                Contacto
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { icon: <Phone className="w-4 h-4" />, label: "Laura Cervantes", value: "999 944 7704", color: "text-emerald-600" },
                                    { icon: <Phone className="w-4 h-4" />, label: "Ligia Díaz", value: "999 163 9082", color: "text-emerald-600" },
                                    { icon: <Mail className="w-4 h-4" />, label: "Correo", value: "contacto@vifac.org", color: "text-blue-600" },
                                    { icon: <MapPin className="w-4 h-4" />, label: "Oficinas PREMSA", value: "Calle 1 H No. 105 x 8 y 10, Col. México Norte, Mérida", color: "text-amber-600" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                                        <span className={`mt-0.5 shrink-0 ${item.color}`}>{item.icon}</span>
                                        <div>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{item.label}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                Horario de atención: Lunes a Viernes · 9:00–14:00 hrs y 16:00–18:00 hrs
                            </p>
                        </section>

                    </div>

                    {/* ── Footer fijo ── */}
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-zinc-700 shrink-0">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            © 2026 VIFAC · Todos los derechos reservados
                        </p>
                        <Button
                            danger
                            size="middle"
                            type="primary"
                            onClick={onClose}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}