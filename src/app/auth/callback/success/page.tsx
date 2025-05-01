import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function VerificationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-xl text-green-600" 
            />
          </div>
          <CardTitle className="text-center text-xl font-medium">
            ¡Verificación Exitosa!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu correo electrónico ha sido verificado correctamente.
              Ahora puedes disfrutar de todos los beneficios de tu cuenta.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              asChild 
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              <Link href="/products">
                Ver Productos
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="w-full"
            >
              <Link href="/dashboard">
                Ir al Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}