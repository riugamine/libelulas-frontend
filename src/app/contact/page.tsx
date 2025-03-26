'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#D9E17F] text-gray-800">
                <FontAwesomeIcon icon="envelope" className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">info@libelulasdesign.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#F8C8DC] text-gray-800">
                <FontAwesomeIcon icon="phone" className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Teléfono</h3>
                <p className="mt-1 text-gray-600">+123 456 7890</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#C9E4CA] text-gray-800">
                <FontAwesomeIcon icon="map-marker-alt" className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Ubicación</h3>
                <p className="mt-1 text-gray-600">Ciudad de México, México</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#D9E17F] text-gray-800">
                <FontAwesomeIcon icon={['fab', 'whatsapp']} className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">WhatsApp</h3>
                <p className="mt-1 text-gray-600">+123 456 7890</p>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-[#D9E17F] hover:underline"
                >
                  Enviar mensaje
                  <FontAwesomeIcon icon="arrow-right" className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#D9E17F] transition-colors"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#D9E17F] transition-colors"
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} className="h-5 w-5" />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#D9E17F] transition-colors"
              >
                <FontAwesomeIcon icon={['fab', 'pinterest-p']} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
          
          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FontAwesomeIcon icon="check-circle" className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#D9E17F] px-4 py-3 text-center font-medium text-gray-800 hover:bg-[#C9D16F] focus:outline-none focus:ring-2 focus:ring-[#D9E17F] focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Encuéntranos</h2>
        <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661095364717!2d-99.16869708509426!3d19.427023986887467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sZocalo%2C%20Centro%20Historico%2C%20Mexico%20City%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1623164243542!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}