import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Sobre Libélulas Design</h1>
        
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Libélulas Design Team"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Libélulas Design nació de la pasión por la papelería y el diseño. Somos un equipo de creativos dedicados a crear libretas y agendas personalizadas que no solo son funcionales, sino también hermosas y únicas.
          </p>
          
          <p>
            Nuestra misión es ayudar a las personas a organizar su vida con estilo, ofreciendo productos de alta calidad que inspiren creatividad y productividad. Creemos que una buena libreta o agenda puede marcar la diferencia en cómo planificamos nuestro día a día.
          </p>
          
          <h2>Nuestros Valores</h2>
          
          <ul>
            <li>
              <strong>Calidad:</strong> Utilizamos materiales premium para garantizar que nuestros productos sean duraderos y agradables al tacto.
            </li>
            <li>
              <strong>Creatividad:</strong> Nos esforzamos por crear diseños originales que reflejen diferentes estilos y personalidades.
            </li>
            <li>
              <strong>Sostenibilidad:</strong> Nos preocupamos por el medio ambiente y trabajamos para minimizar nuestro impacto ambiental.
            </li>
            <li>
              <strong>Atención al cliente:</strong> Valoramos a nuestros clientes y nos esforzamos por brindar un servicio excepcional.
            </li>
          </ul>
          
          <h2>Nuestro Proceso</h2>
          
          <p>
            Cada producto de Libélulas Design es creado con atención al detalle. Desde la selección de materiales hasta el diseño y la producción final, cuidamos cada paso del proceso para asegurar que el resultado sea excepcional.
          </p>
          
          <p>
            Nuestros diseñadores trabajan constantemente en nuevas ideas y conceptos, inspirándose en tendencias actuales pero siempre manteniendo un estilo propio que caracteriza a Libélulas Design.
          </p>
          
          <h2>Únete a Nuestra Comunidad</h2>
          
          <p>
            Nos encanta ver cómo nuestros clientes utilizan nuestros productos. Comparte tus fotos en redes sociales con el hashtag #LibélulasDesign y sé parte de nuestra comunidad creativa.
          </p>
          
          <p>
            ¡Gracias por apoyar nuestro pequeño negocio y ser parte de nuestra historia!
          </p>
        </div>
      </div>
    </div>
  );
}