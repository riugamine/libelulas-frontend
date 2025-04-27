"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-8">
        <div className="hidden md:flex flex-col justify-center items-center space-y-6 bg-primary-100/20 rounded-xl p-8">
          <Image
            src="/logo-brown.png"
            alt="Libélulas Design Logo"
            width={200}
            height={200}
            className="w-32 h-auto"
          />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-900">
              Bienvenido a Libélulas Design
            </h2>
            <p className="text-primary-600">
              Únete a nuestra comunidad y descubre nuestras hermosas creaciones
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}