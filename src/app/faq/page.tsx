'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// FAQ Item component
interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-medium text-gray-900 focus:outline-none"
      >
        <span>{question}</span>
        <FontAwesomeIcon
          icon={isOpen ? 'minus' : 'plus'}
          className={`h-5 w-5 ${isOpen ? 'text-[#D9E17F]' : 'text-gray-500'}`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  // FAQ categories
  const categories = [
    { id: 'products', name: 'Productos' },
    { id: 'orders', name: 'Pedidos y Envíos' },
    { id: 'returns', name: 'Devoluciones' },
    { id: 'care', name: 'Cuidado de Productos' },
  ];
  
  const [activeCategory, setActiveCategory] = useState('products');
  
  // FAQ data
  const faqData = {
    products: [
      {
        question: '¿Todos sus productos son hechos a mano?',
        answer: (
          <p>
            Sí, todos nuestros productos son elaborados a mano por artesanos mexicanos. Cada pieza es única y puede tener pequeñas variaciones que reflejan su naturaleza artesanal.
          </p>
        ),
      },
      {
        question: '¿Qué materiales utilizan en sus productos?',
        answer: (
          <p>
            Utilizamos una variedad de materiales sostenibles y de alta calidad, incluyendo textiles naturales, cerámica, madera y metales. Todos nuestros materiales son cuidadosamente seleccionados para garantizar durabilidad y belleza.
          </p>
        ),
      },
      {
        question: '¿Puedo solicitar un diseño personalizado?',
        answer: (
          <div>
            <p className="mb-2">
              ¡Absolutamente! Ofrecemos servicios de personalización para muchos de nuestros productos. Puedes elegir colores específicos, añadir iniciales o solicitar diseños especiales.
            </p>
            <p>
              Para solicitar un producto personalizado, por favor contáctanos a través de nuestro{' '}
              <Link href="/contact" className="text-[#D9E17F] hover:underline">
                formulario de contacto
              </Link>{' '}
              o envíanos un mensaje por WhatsApp.
            </p>
          </div>
        ),
      },
      {
        question: '¿Cómo se determina el precio de sus productos?',
        answer: (
          <p>
            Nuestros precios reflejan la calidad de los materiales utilizados, el tiempo dedicado a la elaboración artesanal de cada pieza, y nuestro compromiso de pagar salarios justos a nuestros artesanos. Aunque nuestros productos pueden ser más costosos que los producidos en masa, ofrecen calidad superior, diseño único y apoyo a las comunidades artesanales.
          </p>
        ),
      },
    ],
    orders: [
      {
        question: '¿Cómo puedo realizar un pedido?',
        answer: (
          <p>
            Puedes realizar tu pedido directamente a través de WhatsApp. Simplemente selecciona el producto que deseas, haz clic en el botón "Comprar por WhatsApp" y te conectaremos con nuestro equipo de ventas para finalizar tu compra.
          </p>
        ),
      },
      {
        question: '¿Cuáles son los métodos de pago aceptados?',
        answer: (
          <p>
            Aceptamos transferencias bancarias, depósitos en efectivo y pagos a través de aplicaciones como Mercado Pago. Nuestro equipo de ventas te proporcionará toda la información necesaria para completar tu pago de manera segura.
          </p>
        ),
      },
      {
        question: '¿Cuánto tiempo tarda en llegar mi pedido?',
        answer: (
          <p>
            El tiempo de entrega varía según tu ubicación y la disponibilidad del producto. Generalmente, los pedidos se entregan en un plazo de 3 a 7 días hábiles en la Ciudad de México y de 5 a 10 días hábiles para el resto del país. Para envíos internacionales, el tiempo de entrega puede ser de 2 a 3 semanas.
          </p>
        ),
      },
      {
        question: '¿Realizan envíos internacionales?',
        answer: (
          <p>
            Sí, realizamos envíos a nivel internacional. Los costos de envío y tiempos de entrega varían según el país de destino. Por favor, contáctanos para obtener información específica sobre envíos a tu país.
          </p>
        ),
      },
    ],
    returns: [
      {
        question: '¿Cuál es su política de devoluciones?',
        answer: (
          <div>
            <p className="mb-2">
              Aceptamos devoluciones dentro de los 15 días posteriores a la recepción del producto, siempre que el artículo se encuentre en su estado original y sin usar.
            </p>
            <p>
              Para iniciar una devolución, por favor contáctanos a través de nuestro{' '}
              <Link href="/contact" className="text-[#D9E17F] hover:underline">
                formulario de contacto
              </Link>{' '}
              o por WhatsApp.
            </p>
          </div>
        ),
      },
      {
        question: '¿Qué sucede si recibo un producto dañado?',
        answer: (
          <p>
            Si recibes un producto dañado o defectuoso, por favor contáctanos dentro de las 48 horas posteriores a la recepción con fotos del daño. Reemplazaremos el producto o emitiremos un reembolso completo, según tu preferencia.
          </p>
        ),
      },
      {
        question: '¿Puedo cambiar mi producto por otro?',
        answer: (
          <p>
            Sí, ofrecemos cambios por productos de valor igual o superior (pagando la diferencia) dentro de los 15 días posteriores a la recepción. El producto debe estar en su estado original y sin usar.
          </p>
        ),
      },
    ],
    care: [
      {
        question: '¿Cómo debo cuidar mis productos textiles?',
        answer: (
          <p>
            Para textiles, recomendamos lavar a mano con agua fría y jabón suave. No usar blanqueador ni secadora. Secar a la sombra y planchar a temperatura baja si es necesario. Cada producto viene con instrucciones específicas de cuidado.
          </p>
        ),
      },
      {
        question: '¿Cómo debo cuidar mis productos de cerámica?',
        answer: (
          <p>
            Nuestras piezas de cerámica deben lavarse a mano con agua tibia y jabón suave. Evita cambios bruscos de temperatura que puedan causar grietas. No son aptas para microondas ni lavavajillas, a menos que se indique específicamente lo contrario.
          </p>
        ),
      },
      {
        question: '¿Los colores de mis productos pueden desteñirse con el tiempo?',
        answer: (
          <p>
            Utilizamos tintes de alta calidad, pero como con cualquier producto artesanal, puede haber cierta decoloración con el tiempo, especialmente si se expone constantemente a la luz solar directa. Para mantener la viveza de los colores, recomendamos almacenar los productos lejos de la luz solar directa cuando no estén en uso.
          </p>
        ),
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h1>
      
      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 font-medium ${
                activeCategory === category.id
                  ? 'border-b-2 border-[#D9E17F] text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto">
        {Object.entries(faqData).map(([category, items]) => (
          <div
            key={category}
            className={activeCategory === category ? 'block' : 'hidden'}
          >
            {items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Contact CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">¿No encontraste lo que buscabas?</h2>
        <p className="text-gray-600 mb-6">
          Estamos aquí para ayudarte. Contáctanos directamente y responderemos a todas tus preguntas.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-md bg-[#D9E17F] px-6 py-3 font-medium text-gray-800 hover:bg-[#C9D16F] transition-colors"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}