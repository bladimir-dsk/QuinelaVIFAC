import { Ticket, UserPlus, Trophy } from "lucide-react";

const steps = [
    {
        step: 1,
        title: "Adquiere tu Boleto",
        description:
            "Compra tu cupón con usuario y contraseña para participar. Tu compra apoya directamente a VIFAC.",
        icon: Ticket,
        gradient: "from-emerald-500 via-emerald-600 to-teal-600",
        shadow: "shadow-emerald-500/30",
    },
    {
        step: 2,
        title: "Regístrate",
        description:
            "Usa tus credenciales para registrarte en la plataforma y activar tu participación.",
        icon: UserPlus,
        gradient: "from-sky-500 via-sky-600 to-blue-600",
        shadow: "shadow-sky-500/30",
    },
    {
        step: 3,
        title: "Participa y Gana",
        description:
            "Sigue los partidos del Mundial 2026 y compite por increíbles premios mientras apoyas una gran causa.",
        icon: Trophy,
        gradient: "from-amber-500 via-amber-600 to-orange-600",
        shadow: "shadow-amber-500/30",
    },
];

export default function ConvocatoriaSection() {
    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.step}
                        className="group relative"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Glow effect on hover */}
                        <div
                            className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                        ></div>

                        <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden h-full">
                            {/* Step number badge */}
                            <div
                                className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-black text-3xl ${item.shadow} shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                            >
                                {item.step}
                            </div>

                            {/* Decorative corner */}
                            <div
                                className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-5 rounded-br-full`}
                            ></div>

                            {/* Icon */}
                            <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Icon
                                    className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl p-3 text-white`}
                                    strokeWidth={1.5}
                                />
                            </div>

                            {/* Content */}
                            <h4 className="font-black text-2xl mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all">
                                {item.title}
                            </h4>

                            <p className="text-gray-600 leading-relaxed text-base">
                                {item.description}
                            </p>

                            {/* Bottom accent */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}