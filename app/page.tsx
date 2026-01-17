import Link from "next/link";
import { Button } from "@/components/ui/button";

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar Minimalista */}
      <header className="px-6 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold tracking-tight">Lumina Estética</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#servicios">
            Servicios
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#nosotros">
            Sobre Mí
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
            Contacto
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Realza tu Belleza Natural
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Tratamientos faciales y corporales personalizados para que te sientas radiante.
                Cuidado profesional con productos de alta calidad.
              </p>
            </div>
            <div className="space-y-4 mt-8">
              <Button asChild size="lg" className="rounded-full px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Link href="#reservar">
                  Reservar Turno
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Tratamientos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nuestros Servicios</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre una experiencia de relajación y renovación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <SparklesIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Limpieza Facial Profunda</h3>
                  <p className="text-muted-foreground">
                    Elimina impurezas, células muertas y puntos negros. Incluye vapor, extracciones y mascarilla hidratante.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-lg">$25.000</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#reservar">Reservar</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Peeling Químico</h3>
                  <p className="text-muted-foreground">
                    Renovación celular para mejorar manchas, arrugas finas y luminosidad. Personalizado según tu tipo de piel.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-lg">$30.000</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#reservar">Reservar</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Masaje Kobido</h3>
                  <p className="text-muted-foreground">
                    Lifting natural japonés. Estimula la producción de colágeno, relaja la tensión facial y mejora la circulación.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-lg">$28.000</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#reservar">Reservar</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 border-t">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">¿Lista para mimarte?</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mb-8">
              Reserva tu cita hoy y empieza tu viaje hacia una piel más saludable y radiante.
            </p>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="#reservar">Ver Disponibilidad</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2024 Lumina Estética. Todos los derechos reservados.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Términos de Servicio
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacidad
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
