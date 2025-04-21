"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Preguntas Frecuentes
        </h1>
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">
              No se encontraron resultados para "{searchTerm}".
            </p>
            <p className="mt-2">
              Intenta con otros términos o{" "}
              <a href="/contact" className="text-primary-600 hover:underline">
                contáctanos directamente
              </a>
              .
            </p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                <AccordionTrigger className="text-left font-medium px-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-2 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        
        <div className="mt-12 bg-primary-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">¿No encontraste lo que buscabas?</h2>
          <p className="text-gray-600 mb-4">
            Estamos aquí para ayudarte. No dudes en contactarnos si tienes alguna pregunta adicional.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}