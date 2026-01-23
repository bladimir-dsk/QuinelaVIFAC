import { useAuth } from '../../../hooks/useAuth';

export default function ParticipanteHomeScreen() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    ¡Hola, {user?.name}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Bienvenido a la vista de inicio del Mundial 2026
                </p>
            </div>
        </div>
    );
}