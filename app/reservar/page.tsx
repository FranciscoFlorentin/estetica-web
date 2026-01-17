'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

// Tipos
type Service = {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
};

export default function BookingPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Cargar servicios al iniciar
    useEffect(() => {
        async function fetchServices() {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('id, name, price, duration_minutes')
                    .eq('is_active', true);

                if (error) throw error;
                setServices(data || []);
            } catch (err: any) {
                console.error('Error fetching services:', err);
                setErrorMsg('Error al cargar servicios. Por favor recarga la página.');
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!selectedService) {
            setErrorMsg('Por favor selecciona un servicio.');
            return;
        }
        if (!date || !time) {
            setErrorMsg('Por favor selecciona fecha y hora.');
            return;
        }

        setSubmitting(true);
        setErrorMsg('');

        try {
            const startTime = new Date(`${date}T${time}:00`);
            const service = services.find(s => s.id === selectedService);
            const duration = service?.duration_minutes || 60;
            const endTime = new Date(startTime.getTime() + duration * 60000);

            const { error } = await supabase.from('appointments').insert([
                {
                    service_id: selectedService,
                    client_name: formData.name,
                    client_email: formData.email,
                    client_phone: formData.phone,
                    start_time: startTime.toISOString(),
                    end_time: endTime.toISOString(),
                    status: 'pending',
                },
            ]); // Nota: No usamos .select() para evitar errores de permisos (RLS)

            if (error) throw error;

            setSuccess(true);
        } catch (err: any) {
            console.error('Error creating appointment:', err);
            setErrorMsg('Hubo un error al reservar. Inténtalo nuevamente.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
                <div className="p-8 bg-card border rounded-xl shadow-lg max-w-md w-full">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-3 tracking-tight">¡Reserva Confirmada!</h1>
                    <p className="text-muted-foreground mb-8">
                        Tu cita ha sido agendada correctamente. <br />Te esperamos.
                    </p>
                    <Link href="/">
                        <Button className="w-full">Volver al Inicio</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">
                        &larr; Volver al inicio
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Reservar Turno</h1>
                    <p className="text-muted-foreground mt-2">Selecciona tu tratamiento y el horario ideal.</p>
                </div>

                <div className="bg-card p-6 sm:p-8 rounded-xl border shadow-sm">
                    {errorMsg && (
                        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selección de Servicio */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Servicio
                            </label>
                            {loading ? (
                                <div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>
                            ) : (
                                <div className="grid gap-3">
                                    {services.map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => setSelectedService(service.id)}
                                            className={`cursor-pointer group relative flex items-center justify-between rounded-lg border p-4 text-left shadow-sm transition-all hover:border-primary hover:shadow-md ${selectedService === service.id
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'bg-background hover:bg-muted/20'
                                                }`}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold">{service.name}</span>
                                                <span className="text-xs text-muted-foreground">{service.duration_minutes} min</span>
                                            </div>
                                            <span className="font-medium text-primary">${service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Fecha</label>
                                <input
                                    type="date"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Hora</label>
                                <input
                                    type="time"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Datos Personales */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Nombre Completo</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: María Gonzalez"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="tu@email.com"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Teléfono</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="Tu número de contacto"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                            {submitting ? 'Confirmando...' : 'Confirmar Reserva'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
