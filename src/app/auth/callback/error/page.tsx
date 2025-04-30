import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function VerificationErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faExclamationCircle} 
              className="text-xl text-destructive" 
            />
          </div>
          <CardTitle className="text-center text-xl font-medium">
            Error de verificación
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El enlace de verificación ha expirado o no es válido.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Por favor, solicita un nuevo enlace de verificación o contacta con soporte
              si continúas teniendo problemas.
            </p>
          </div>
          <Button 
            asChild 
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            <Link href="/auth">
              Volver al inicio de sesión
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}