import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  cedula: z.string(),
  direccion: z.string(),
  email: z.string().email(),
  telefono: z.string(),
  rol: z.enum(["admin", "user"]),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type User = z.infer<typeof UserSchema>;

export const users: User[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    cedula: "V-12345678",
    direccion: "Calle Principal 123, Caracas, Venezuela",
    email: "juan.perez@email.com",
    telefono: "+58 412-1234567",
    rol: "admin",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "2",
    nombre: "María González",
    cedula: "V-87654321",
    direccion: "Avenida Libertador 456, Maracaibo, Venezuela",
    email: "maria.gonzalez@email.com",
    telefono: "+58 414-7654321",
    rol: "user",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15")
  },
  {
    id: "3",
    nombre: "Carlos Rodríguez",
    cedula: "V-23456789",
    direccion: "Calle Sucre 789, Valencia, Venezuela",
    email: "carlos.rodriguez@email.com",
    telefono: "+58 416-8901234",
    rol: "user",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20")
  }
];