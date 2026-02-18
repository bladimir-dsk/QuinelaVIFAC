import React, { useState, useRef, useEffect } from "react";

const prizes = [
    {
        place: "1°",
        title: "Viaje al Gran Premio de Fórmula 1",
        subtitle: "CDMX 2026",
        tags: ["2 boletos de avión", "3 noches de hotel", "2 entradas al evento"],
        cash: "$85,000 MXN",
        imagePosition: "center 55%",
        gradientFrom: "#f59e0b",
        gradientTo: "#ea580c",
        tagStyle: "bg-white/20 text-white border-white/20",
        image: "https://www.eluniversal.com.mx/resizer/v2/T6XFRZWBT5FAZIBVFOLCJJGUTU.jpg?auth=835a8b38321a25fea9a369a2b84cd76761195a5ea7911c3e5720eb049712ce83&smart=true&height=620",
    },
    {
        place: "2°",
        title: "US Open de Tenis",
        subtitle: "Nueva York",
        tags: ["Vuelos Mérida-NY", "3 noches de hotel", "2 boletos US Open"],
        cash: "$50,000 MXN",
        imagePosition: "center 30%",
        gradientFrom: "#64748b",
        gradientTo: "#475569",
        tagStyle: "bg-white/20 text-white border-white/20",
        image: "https://s3.sportstatics.com/relevo/www/multimedia/202303/24/media/cortadas/carlos-alcaraz-RwaraEkmOqWVHWdqoBv0kON-1200x648@Relevo.jpg",
    },
    {
        place: "3°",
        title: "Golf en Los Cabos",
        subtitle: "Baja California Sur",
        tags: ["Vuelos redondos", "3 noches de hotel", "2 Green Fees"],
        cash: "$30,000 MXN",
        gradientFrom: "#b45309",
        gradientTo: "#c2410c",
        tagStyle: "bg-white/20 text-white border-white/20",
        image: "https://www.forestpreservegolf.com/wp-content/uploads/sites/9712/2025/09/Contact01.jpg",
    },
];

const smallPrizes = [
    {
        place: "4°",
        title: "Cuarto Lugar",
        description: "El equivalente a $10,000 pesos mexicanos",
        cash: "$10,000 MXN",
        cashLabel: "",
        gradientFrom: "#059669",
        gradientTo: "#0d9488",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    },
    {
        place: "5°",
        title: "Premio Consolación",
        description: "Donativo a nombre del participante por el Comité Organizador",
        cash: "$10,000 MXN",
        cashLabel: "",
        gradientFrom: "#db2777",
        gradientTo: "#e11d48",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    },
];

function PrizeCard({ prize }) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div
            className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            style={{ minHeight: 280 }}
        >
            {/* Full background: gradient left → image right with smooth blend */}
            <div className="absolute inset-0">
                {/* Image covers full card */}
                <img
                    src={prize.image}
                    alt={prize.title}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-100 ${imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        objectPosition: prize.imagePosition || "center"
                    }}
                />

                {/* Gradient overlay that fades from solid color on left to transparent on right */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${prize.gradientFrom} 0%, ${prize.gradientFrom} 30%, ${prize.gradientTo}cc 50%, transparent 75%)`,
                    }}
                />
                {/* Subtle bottom darkening for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content on the left */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 md:w-3/5 h-full min-h-[280px]">
                {/* Place badge + title */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-black text-white">{prize.place}</span>
                    </div>
                    <div>
                        <h4 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            {prize.title}
                        </h4>
                        <p className="text-sm font-semibold text-white/70 tracking-wide uppercase">
                            {prize.subtitle}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {prize.tags.map((tag, i) => (
                        <span
                            key={i}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${prize.tagStyle}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Cash */}
                <div className="flex items-baseline gap-2">
                    <span className="text-white/70 text-sm font-medium">o efectivo</span>
                    <span className="text-2xl md:text-3xl font-black text-white">
                        {prize.cash}
                    </span>
                </div>
            </div>
        </div>
    );
}

function SmallPrizeCard({ prize }) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div
            className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            style={{ minHeight: 200 }}
        >
            <div className="absolute inset-0">
                <img
                    src={prize.image}
                    alt={prize.title}
                    onLoad={() => setImgLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${prize.gradientFrom} 0%, ${prize.gradientFrom} 25%, ${prize.gradientTo}cc 45%, transparent 70%)`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col justify-center p-7 sm:w-3/5 h-full min-h-[200px]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-lg font-black text-white">{prize.place}</span>
                    </div>
                    <h4 className="text-xl font-black text-white">{prize.title}</h4>
                </div>
                <p className="text-white/80 text-sm mb-4">{prize.description}</p>
                <div className="flex items-baseline gap-2">
                    {prize.cashLabel && (
                        <span className="text-white/60 text-sm">{prize.cashLabel}</span>
                    )}
                    <span className="text-2xl font-black text-white">{prize.cash}</span>
                </div>
            </div>
        </div>
    );
}

export default function PremiosSection() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {prizes.map((prize, i) => (
                <PrizeCard key={i} prize={prize} />
            ))}

            <div className="grid md:grid-cols-2 gap-6 pt-2">
                {smallPrizes.map((prize, i) => (
                    <SmallPrizeCard key={i} prize={prize} />
                ))}
            </div>
        </div>
    );
}