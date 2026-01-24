
import React from 'react';
import { Service } from '../../interfaces/Service';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="group flex flex-col space-y-6 transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <button
          onClick={() => onBook(service)}
          className="absolute bottom-0 left-0 right-0 bg-white py-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-[11px] font-bold uppercase tracking-[0.3em]"
        >
          Solicitar Reserva
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-serif">{service.name}</h3>
          <span className="text-sm font-light text-gray-400">${service.price}</span>
        </div>
        <p className="text-xs text-gray-400 font-light leading-relaxed pr-8">
          {service.description}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#B89A67] font-bold pt-2">
          {service.duration}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
