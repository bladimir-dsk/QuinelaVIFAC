import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ScrollText,
  Trophy,
  Calendar,
  Users,
  ClipboardList,
  Scale,
  ChevronDown,
  Globe,
  Phone,
  Info,
} from "lucide-react";
import { Button } from "antd";

const Prize = ({ place, prize, detail, equiv, bg, textAccent }) => (
  <div className={`rounded-xl p-4 border ${bg} mb-2`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <span className={`text-xs font-black uppercase tracking-wider ${textAccent}`}>{place}</span>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-0.5">{prize}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{detail}</p>
      </div>
      <span className={`text-sm font-black whitespace-nowrap shrink-0 ${textAccent}`}>{equiv}</span>
    </div>
  </div>
);

const DateBadge = ({ date, desc }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2.5 border-b border-gray-100 dark:border-zinc-800 last:border-0">
    <span className="flex items-center gap-1.5 text-xs font-black text-blue-700 dark:text-blue-400 whitespace-nowrap sm:min-w-45">
      <Calendar size={12} className="shrink-0" /> {date}
    </span>
    <span className="text-sm text-gray-600 dark:text-gray-300">{desc}</span>
  </div>
);

const Section = ({ icon, title, color, children }) => {
  const [open, setOpen] = useState(false);

  const colorClasses = {
    emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400",
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
    amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400",
    purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400",
    rose: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400",
  };

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[color]}`}>
          {icon}
        </span>
        <span className="text-sm font-bold text-gray-800 dark:text-gray-100 flex-1">{title}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default function RegulationModal({ visible, onClose }) {
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <>
      {/* Backdrop */}
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
          {/* ── Header fijo (estilo InfoModal) ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-700 rounded-t-2xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <ScrollText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-black dark:text-white leading-tight">
                  Bases y Reglamento
                </span>
                <span className="text-blue-500 text-xs font-medium">Quiniela Mundialista VIFAC 2026</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-black dark:text-white hover:text-gray-400 transition-colors ml-4"
            >
              <X size={22} />
            </button>
          </div>

          {/* ── Body scrollable ── */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Se convoca a todos los amigos deportivos a participar en la{" "}
              <strong className="text-gray-800 dark:text-gray-200">Quiniela Mundialista VIFAC 2026</strong>.
            </p>

            {/* 1. Requisitos */}
            <Section icon={<Users size={16} />} title="1. Requisitos para participar" color="emerald">
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-600 shrink-0">a)</span>
                  <p>Ser amigo y entusiasta del deporte.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-600 shrink-0">b)</span>
                  <div className="space-y-2">
                    <p>
                      Haber pagado la cuota de inscripción de{" "}
                      <strong className="text-gray-800 dark:text-gray-100">$1,500.00 MXN</strong>{" "}
                      a más tardar el{" "}
                      <strong className="text-gray-800 dark:text-gray-100">viernes 18 de noviembre a las 12:00 hrs.</strong>{" "}
                      Formas de pago:
                    </p>
                    <div className="space-y-2 ml-1">
                      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Depósito bancario</p>
                        <p className="font-semibold text-gray-700 dark:text-gray-200">ASOCIACIÓN VIDA Y FAMILIA · Banco BX+</p>
                        <p className="font-mono text-xs mt-0.5 text-blue-600 dark:text-blue-400">CLABE: 113180000001177778</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Efectivo</p>
                        <p className="text-gray-700 dark:text-gray-200">En oficinas de PREMSA</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Tarjeta en línea</p>
                        <a href="http://www.quinielavifac.com" target="_blank" rel="noreferrer"
                          className="text-emerald-600 font-semibold hover:underline">
                          www.quinielavifac.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-600 shrink-0">c)</span>
                  <p>Disposición de ayudar.</p>
                </div>
              </div>
            </Section>

            {/* 2. Inscripción */}
            <Section icon={<ClipboardList size={16} />} title="2. Inscripción y llenado" color="blue">
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>La participación es <strong className="text-gray-800 dark:text-gray-100">ilimitada</strong>. Puedes llenar tu quiniela de las siguientes formas:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                    <Globe size={16} className="shrink-0 mt-0.5 text-blue-500" />
                    <p>En línea en{" "}
                      <a href="http://www.quinielavifac.com" className="text-blue-600 font-semibold hover:underline" target="_blank" rel="noreferrer">
                        www.quinielavifac.com
                      </a>{" "}
                      con tu código y usuario.
                    </p>
                  </div>
                  <div className="flex items-start gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                    <Phone size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                    <p><strong className="text-gray-800 dark:text-gray-100">Laura Cervantes</strong> · 999 944 7704 · L–V de 9–14 hrs y 16–18 hrs</p>
                  </div>
                  <div className="flex items-start gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                    <Phone size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                    <p><strong className="text-gray-800 dark:text-gray-100">Ligia Díaz</strong> · 999 163 9082</p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="flex items-start gap-2 text-blue-800 dark:text-blue-300 text-sm">
                    <Info size={15} className="shrink-0 mt-0.5" />
                    <span>La quiniela cubre <strong>únicamente la primera ronda</strong> del Mundial 2026.</span>
                  </p>
                </div>
              </div>
            </Section>

            {/* 3. Fechas */}
            <Section icon={<Calendar size={16} />} title="3. Fechas importantes" color="amber">
              <div className="text-sm">
                <DateBadge date="Vie 18 Nov · 12:00 hrs" desc="Fecha límite de pago de inscripción" />
                <DateBadge date="Lun 08 Jun · 18:00 hrs" desc="Último día para modificar quiniela en línea" />
                <DateBadge date="Lun 08 Jun · 16:00 hrs" desc="Último día para entregar o modificar quiniela física en PREMSA" />
                <DateBadge date="Lun 08 Jun · 20:00 hrs" desc="Cierre y publicación del número total de participantes" />
              </div>
            </Section>

            {/* 4. Premios */}
            <Section icon={<Trophy size={16} />} title="4. Premios" color="yellow">
              <Prize place="1er Lugar" prize="Viaje al Gran Premio F1 México 2026" detail="2 boletos de avión redondo · 3 noches de hotel · 2 entradas en CDMX" equiv="$85,000 MXN" bg="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800" textAccent="text-yellow-700 dark:text-yellow-400" />
              <Prize place="2do Lugar" prize="Viaje a Nueva York – US Open de Tenis 2026" detail="2 boletos Mérida–NY–Mérida · 3 noches de hotel · 2 entradas para el US Open (última semana de agosto)" equiv="$50,000 MXN" bg="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700" textAccent="text-gray-600 dark:text-gray-400" />
              <Prize place="3er Lugar" prize="Viaje a Los Cabos – Golf Diamante" detail="2 boletos Mérida–Cabos–Mérida · 3 noches de hotel · 2 Green Fee en Campo Diamante" equiv="$30,000 MXN" bg="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" textAccent="text-orange-700 dark:text-orange-400" />
              <Prize place="4to Lugar" prize="Premio en efectivo" detail="Equivalente en efectivo" equiv="$10,000 MXN" bg="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" textAccent="text-blue-700 dark:text-blue-400" />
              <Prize place="Último Lugar" prize="Premio de Consolación" detail="Donativo a nombre del participante por el Comité Organizador" equiv="$10,000 MXN" bg="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" textAccent="text-emerald-700 dark:text-emerald-400" />
            </Section>

            {/* 5. Puntuación */}
            <Section icon={<Scale size={16} />} title="5. Puntuación y desempate" color="purple">
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  Se otorga{" "}
                  <strong className="text-gray-800 dark:text-gray-100">1 punto por cada acierto</strong>,
                  ya sea el triunfo del equipo señalado o el empate. Los resultados se actualizan diariamente en la página de internet.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <p className="font-bold text-purple-800 dark:text-purple-300 text-xs uppercase tracking-wide mb-3">
                    Criterios de desempate (en orden)
                  </p>
                  <div className="space-y-2">
                    {["Los tres resultados de Uruguay", "Los tres resultados de México", "Los tres resultados de Francia"].map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="text-sm text-purple-700 dark:text-purple-300">{c}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-3">Si persiste el empate, el premio se divide entre los ganadores.</p>
                </div>
              </div>
            </Section>

            {/* 6. Generales */}
            <Section icon={<ScrollText size={16} />} title="6. Disposiciones generales" color="rose">
              <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                {[
                  "Es obligatorio poner un resultado en cada partido. No se aceptarán quinielas incompletas.",
                  "Las quinielas manuales podrán modificarse hasta el lunes 08 de junio a las 16:00 hrs. de manera presencial, firmando el cambio realizado.",
                  'Oficinas PREMSA: Calle 1 H No. 105 x 8 y 10, Col. México Norte, altos Plaza Comercial "El Centrito", Mérida.',
                  "El evento de premiación se llevará a cabo en fecha, lugar y hora por definir.",
                  "Cualquier caso no previsto será resuelto por el Comité Organizador.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-zinc-700 shrink-0">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © 2026 VIFAC · Bases sujetas a cambio sin previo aviso
            </p>
            <Button
              onClick={onClose}
              danger
              type="primary"
              size="middle"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}