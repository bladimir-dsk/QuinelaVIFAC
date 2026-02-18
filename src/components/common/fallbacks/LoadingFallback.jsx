import React from 'react'

export default function LoadingFallback() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-900">
            <div className="flex flex-col items-center gap-6">
                {/* Spinner principal */}
                <div className="relative">
                    {/* Anillo externo */}
                    <div className="h-20 w-20 rounded-full border-4 border-slate-200"></div>
                    {/* Anillo animado */}
                    <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-cyan-600 border-r-cyan-600"></div>
                </div>

                {/* Texto */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold text-black dark:text-white">
                        Cargando...
                    </p>
                </div>
            </div>
        </div>
    )
}