"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/auth/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success('Correo de verificación reenviado');
    } catch (error) {
      toast.error('Error al reenviar el correo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="text-xl text-secondary" 
            />
          </div>
          <CardTitle className="text-center text-xl font-medium">
            Verifica tu correo electrónico
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Te hemos enviado un enlace de verificación a tu correo electrónico.
              Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <p className="text-xs text-muted-foreground/80">
              El enlace expirará en 24 horas.
            </p>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/70">
              ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
              <button 
                onClick={handleResendEmail}
                disabled={isLoading}
                className="text-secondary hover:underline disabled:opacity-50"
              >
                solicita un nuevo enlace
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}