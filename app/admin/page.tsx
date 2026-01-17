'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react';

type Appointment = {
    id: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    start_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    services: {
        name: string;
        price: number;
        duration_minutes: number;
    };
};

export default function AdminDashboard() {
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkUser();
        fetchAppointments();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/admin/login');
        } else {
            setUser(session.user);
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
          *,
          services ( name, price, duration_minutes )
        `)
                .order('start_time', { ascending: true }); // Próximos turnos primero

            if (error) throw error;
            setAppointments(data || []);
        } catch (err) {
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setAppointments(prev => prev.map(app =>
                app.id === id ? { ...app, status: newStatus as any } : app
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Error al actualizar estado');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    if (loading && !user) return <div className="p-10 text-center">Cargando panel...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{user?.email}</span>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" /> Salir
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Próximos Turnos</h2>
                        <Button onClick={fetchAppointments} variant="secondary" size="sm">
                            Actualizar
                        </Button>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {appointments.length === 0 ? (
                                <li className="p-6 text-center text-gray-500">No hay turnos registrados.</li>
                            ) : (
                                appointments.map((appt) => (
                                    <li key={appt.id} className="hover:bg-gray-50 transition-colors">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-lg font-medium text-black truncate">{appt.client_name}</p>
                                                    <p className="text-sm text-gray-500">{appt.services?.name}</p>
                                                </div>
                                                <div className="flex-shrink-0 flex items-center gap-2">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                        {appt.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <div className="mr-6 flex items-center text-sm text-gray-500">
                                                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                        {new Date(appt.start_time).toLocaleDateString()}
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                        {new Date(appt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        <span className="ml-1 text-xs">({appt.services?.duration_minutes} min)</span>
                                                    </div>
                                                </div>

                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 gap-2">
                                                    {appt.status === 'pending' && (
                                                        <>
                                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8" onClick={() => updateStatus(appt.id, 'confirmed')}>
                                                                <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                                                            </Button>
                                                            <Button size="sm" variant="destructive" className="h-8" onClick={() => updateStatus(appt.id, 'cancelled')}>
                                                                <XCircle className="h-4 w-4 mr-1" /> Cancelar
                                                            </Button>
                                                        </>
                                                    )}
                                                    {appt.status === 'confirmed' && (
                                                        <Button size="sm" variant="outline" className="h-8 text-red-600 hover:bg-red-50" onClick={() => updateStatus(appt.id, 'cancelled')}>
                                                            Cancelar
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
