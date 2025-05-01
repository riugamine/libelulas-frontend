"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase/client";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        toast.success('¡Bienvenido!', {
          description: 'Has iniciado sesión correctamente.',
        });
        router.push("/");
      }

    } catch (error: any) {
      let errorMessage = "Ocurrió un error durante el inicio de sesión";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Credenciales inválidas";
      }

      toast.error('Error de inicio de sesión', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon 
                      icon={showPassword ? faEyeSlash : faEye}
                      className="h-4 w-4 text-primary-600"
                    />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="animate-spin mr-2 h-4 w-4" 
              />
              <span>Iniciando sesión...</span>
            </div>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-primary-600">O continuar con</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={() => {/* Implementar login con Google */}}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
          Google
        </Button>
      </form>
    </Form>
  );
}