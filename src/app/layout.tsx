import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libélulas Design - Papelería y Diseño",
  description: "Tienda de papelería y diseño con productos únicos y personalizados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
