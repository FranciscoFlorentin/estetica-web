
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FCFAF7] px-8 pt-20">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 animate-[fadeIn_1.2s_ease-out]">
          <h1 className="text-7xl md:text-8xl font-serif leading-[0.9] tracking-tighter">
            Estética <br />
            <span className="italic font-light text-[#B89A67]">Esencial.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-sm leading-relaxed">
            La ciencia de la piel simplificada. Tratamientos de alta precisión para resultados naturales.
          </p>
          <div className="flex items-center gap-8 pt-4">
            <a href="#servicios" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
              Explorar menú
              <div className="w-12 h-[1px] bg-black group-hover:w-20 transition-all duration-500"></div>
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale-[0.2] hover:grayscale-0 transition-all duration-1000">
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000"
            alt="Minimalist Aesthetic"
            className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_infinite_alternate]"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
