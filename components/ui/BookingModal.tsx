
import React from 'react';

interface BookingModalProps {
  service: any | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Solicitud de reserva enviada! Nos pondremos en contacto pronto.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FAF7F2] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-[modalIn_0.4s_ease-out]">
        <div className="p-8 md:p-12">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <header className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">Reservar Tratamiento</h2>
            <p className="text-[#C5A059] font-semibold">{service.name}</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nombre Completo</label>
              <input
                required
                type="text"
                placeholder="Ej. Sofia Rodriguez"
                className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#C5A059] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Teléfono</label>
                <input
                  required
                  type="tel"
                  placeholder="+54 9 11..."
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#C5A059] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Fecha Preferida</label>
                <input
                  required
                  type="date"
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#C5A059] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-dashed border-[#C5A059]/30 mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Duración estimada</span>
                <span className="font-bold">{service.duration}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total a abonar</span>
                <span className="text-[#C5A059]">${service.price}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#C5A059] text-white rounded-2xl font-bold text-lg hover:bg-[#b38f4d] shadow-lg shadow-[#C5A059]/20 transition-all active:scale-[0.98] mt-4"
            >
              Confirmar Solicitud
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-2">
              Sujeto a disponibilidad. Confirmaremos tu turno vía WhatsApp.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
