import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AlreadyVerifiedPage() {
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
            Cuenta ya verificada
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu cuenta ya ha sido verificada anteriormente.
              No es necesario volver a verificar el correo electrónico.
            </p>
          </div>
          <Button 
            asChild 
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            <Link href="/auth">
              Ir al inicio de sesión
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}