"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Envíanos un mensaje</h2>
          
          {submitSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
              ¡Gracias por tu mensaje! Te responderemos lo antes posible.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nombre
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Asunto
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
          
          <div className="bg-primary-50 p-6 rounded-lg space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Dirección</h3>
                <p className="text-gray-600">Calle Principal #123, Ciudad, País</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-600">info@libelulasdesign.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Teléfono</h3>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">WhatsApp</h3>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Horario de atención</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}