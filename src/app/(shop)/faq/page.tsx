"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab);
const faqs = [
  {
    question: "¿Cuánto tiempo tarda en llegar mi pedido?",
    answer: "El tiempo de entrega depende de tu ubicación. Generalmente, los pedidos nacionales tardan entre 3-5 días hábiles. Para pedidos internacionales, el tiempo estimado es de 7-14 días hábiles."
  },
  {
    question: "¿Puedo personalizar completamente mi libreta o agenda?",
    answer: "¡Sí! Ofrecemos diferentes niveles de personalización. Puedes elegir entre nuestros diseños predeterminados, seleccionar colores y añadir detalles personalizados como tu nombre o iniciales. Para personalizaciones más específicas, contáctanos directamente."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias. Todos los pagos se procesan de manera segura."
  },
  {
    question: "¿Puedo cambiar o cancelar mi pedido?",
    answer: "Puedes modificar o cancelar tu pedido dentro de las primeras 24 horas después de realizarlo. Después de este período, es posible que ya hayamos comenzado a procesar tu pedido y no podamos hacer cambios."
  },
  {
    question: "¿Ofrecen envío internacional?",
    answer: "Sí, enviamos a la mayoría de los países. Los costos de envío internacional varían según la ubicación y el peso del paquete. Estos costos se calcularán automáticamente durante el proceso de compra."
  },
  {
    question: "¿Qué hago si mi producto llega dañado?",
    answer: "Lamentamos cualquier inconveniente. Si tu producto llega dañado, por favor contáctanos dentro de los 7 días posteriores a la recepción con fotos del daño. Organizaremos un reemplazo o reembolso según corresponda."
  },
  {
    question: "¿Tienen una política de devoluciones?",
    answer: "Sí, aceptamos devoluciones dentro de los 14 días posteriores a la recepción del producto, siempre que esté en su estado original y sin usar. Ten en cuenta que los productos personalizados no son elegibles para devolución a menos que haya un defecto de fabricación."
  },
  {
    question: "¿Cómo puedo cuidar mi libreta o agenda?",
    answer: "Para mantener tus productos en buen estado, recomendamos evitar la exposición prolongada al sol, mantenerlos alejados de la humedad y manipularlos con cuidado. Nuestros productos están hechos para durar, pero un buen cuidado prolongará su vida útil."
  },
  {
    question: "¿Ofrecen descuentos para compras al por mayor?",
    answer: "Sí, ofrecemos descuentos especiales para pedidos al por mayor o corporativos. Por favor, contáctanos directamente para discutir tus necesidades y obtener una cotización personalizada."
  },
  {
    question: "¿Cómo puedo contactarlos si tengo más preguntas?",
    answer: "Puedes contactarnos a través de nuestro formulario de contacto en el sitio web, por email a info@libelulasdesign.com o por WhatsApp al +1 234 567 890. Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredFaqs = searchTerm
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs;
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      {/* Encabezado */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Preguntas Frecuentes
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
        </p>
      </div>
      
      {/* Buscador */}
      <div className="relative mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
      
      {/* Resultados */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-lg text-gray-600 mb-2">
            No se encontraron resultados para "{searchTerm}"
          </p>
          <p className="text-gray-500">
            Intenta con otros términos o contáctanos directamente
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-medium px-6 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      
      {/* Sección de contacto */}
      <div className="mt-16 bg-primary-50/50 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          ¿No encontraste lo que buscabas?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Estamos aquí para ayudarte. No dudes en contactarnos por WhatsApp si tienes alguna pregunta adicional.
        </p>
        <Button 
          asChild
          size="lg"
          className="font-medium"
        >
          <a 
            href="https://wa.me/584123598478" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={["fab", "whatsapp"]} />
            Contáctanos por WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}