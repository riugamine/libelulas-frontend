import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function VerificationErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="text-4xl text-destructive mb-4" 
            />
            <h1 className="text-2xl font-bold">Error de verificación</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            El enlace de verificación ha expirado o no es válido.
          </p>
          <p className="text-sm text-muted-foreground">
            Por favor, solicita un nuevo enlace de verificación o contacta con soporte
            si continúas teniendo problemas.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild>
              <Link href="/auth">
                Volver al inicio de sesión
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}