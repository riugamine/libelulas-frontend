import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-secondary mb-4" />
            <h1 className="text-2xl font-bold">Verifica tu correo electrónico</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Te hemos enviado un enlace de verificación a tu correo electrónico.
          </p>
          <p className="text-sm text-muted-foreground">
            Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
            El enlace expirará en 24 horas.
          </p>
          <div className="text-sm text-muted-foreground mt-4">
            <p>¿No recibiste el correo?</p>
            <p>Revisa tu carpeta de spam o solicita un nuevo enlace de verificación.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}