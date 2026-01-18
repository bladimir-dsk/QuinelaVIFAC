import React, { useState } from "react";
import { Card, Input, Button, Empty } from "antd";

export default function Resultados() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Datos de ejemplo - reemplazar con datos reales
  const mockResults = {
    "12345": {
      usuario: "Juan Pérez",
      posicion: 5,
      puntos: 148,
      estado: "activo"
    },
    "67890": {
      usuario: "María García",
      posicion: 12,
      puntos: 132,
      estado: "activo"
    }
  };

  const handleSearch = () => {
    if (searchValue in mockResults) {
      setSearchResult(mockResults[searchValue]);
    } else {
      setSearchResult("not_found");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Consulta tu Posición
          </h3>
          <p className="text-gray-600">
            Ingresa tu número de boleto para ver tu posición en tiempo real
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <Input
            placeholder="Número de boleto (ej: 12345)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            size="large"
            className="flex-1 rounded-xl"
            style={{ height: '50px', fontSize: '16px' }}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 font-bold rounded-xl hover:scale-105 transition-transform"
            style={{ height: '50px', minWidth: '120px' }}
          >
            Buscar
          </Button>
        </div>
      </div>

      {/* Results Display */}
      {searchResult === "not_found" && (
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h4 className="text-xl font-bold text-red-600 mb-2">
            Boleto no encontrado
          </h4>
          <p className="text-gray-600">
            Verifica tu número de boleto e intenta nuevamente
          </p>
        </div>
      )}

      {searchResult && searchResult !== "not_found" && (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black mb-4 shadow-lg">
                #{searchResult.posicion}
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-2">
                {searchResult.usuario}
              </h4>
              <p className="text-gray-600">Boleto: {searchValue}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-200">
                <div className="text-4xl font-black text-emerald-600 mb-2">
                  {searchResult.puntos}
                </div>
                <div className="text-gray-600 font-semibold">Puntos</div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 text-center border border-sky-200">
                <div className="text-4xl font-black text-sky-600 mb-2">
                  {searchResult.posicion}°
                </div>
                <div className="text-gray-600 font-semibold">Lugar</div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-emerald-700 font-semibold">
                ✅ Estado: {searchResult.estado.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      {!searchResult && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-200">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              Resultados en Tiempo Real
            </h4>
            <p className="text-gray-600 text-sm">
              Consulta tu posición actualizada después de cada partido del Mundial
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="text-4xl mb-3">🏆</div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              Tabla de Posiciones
            </h4>
            <p className="text-gray-600 text-sm">
              Los primeros 4 lugares ganan premios increíbles. ¡Sigue participando!
            </p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        Última actualización: {new Date().toLocaleDateString('es-MX', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}
