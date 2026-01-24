export const siteConfig = {
    name: "Eudermic By Ines Perusia",
    shortName: "Eudermic",
    description: "Tratamientos faciales exclusivos y estética avanzada para realzar tu belleza natural.",
    url: "https://eudermic.com",
    contact: {
        email: "info@eudermic.com",
        phone: "+54 9 11 1234 5678",
        address: "Buenos Aires, Argentina"
    },
    social: {
        instagram: "https://instagram.com/eudermic",
        facebook: "https://facebook.com/eudermic"
    },
    schedule: {
        weekdays: "Lun - Vie: 9:00 - 20:00",
        saturday: "Sáb: 10:00 - 15:00",
        sunday: "Cerrado"
    },
    nav: [
        { name: "Tratamientos", href: "#servicios" },
        { name: "La Clínica", href: "#nosotros" },
        { name: "Contacto", href: "#contacto" },
    ]
};

// Deprecated, keeping for backward compatibility if needed temporarily
export const WEB_TITLE = siteConfig.name;