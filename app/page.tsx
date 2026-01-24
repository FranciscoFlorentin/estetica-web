'use client';

import { useState, useEffect } from 'react';
import BookingModal from '@/components/ui/BookingModal';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import ServiceCard from '@/components/ui/ServiceCard';
import { Service } from '@/interfaces/Service';
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/constants";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) {
        console.error('Error loading services:', error);
      } else if (data) {
        // Map services to match ServiceCard expectations
        const mappedServices = data.map((s: any) => ({
          ...s,
          duration: s.duration_minutes ? `${s.duration_minutes} min` : '60 min',
          image: s.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800', // Default image
        }));
        setServices(mappedServices);
      }
    }

    fetchServices();
  }, []);

  const handleBook = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-gray-800 font-sans selection:bg-[#B89A67] selection:text-white">
      <Navbar onBookClick={() => {
        const first = services[0];
        if (first) setSelectedService(first);
      }} />

      <Hero />

      {/* Services Section */}
      <section id="servicios" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[#B89A67] font-bold uppercase tracking-widest text-xs">Nuestra Colección</span>
            <h2 className="text-5xl font-serif">Menú de Tratamientos</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>

      <footer id="contacto" className="py-20 bg-gray-900 text-white/60 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg">{siteConfig.shortName.toUpperCase()}.</h4>
            <p>Elevando el estándar de la belleza natural.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest font-bold text-xs">Contacto</h4>
            <p>{siteConfig.contact.email}</p>
            <p>{siteConfig.contact.phone}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest font-bold text-xs">Horarios</h4>
            <p>{siteConfig.schedule.weekdays}</p>
            <p>{siteConfig.schedule.saturday}</p>
          </div>
        </div>
        <p className="mt-20 text-xs tracking-widest uppercase opacity-40">© {new Date().getFullYear()} {siteConfig.name}</p>
      </footer>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
