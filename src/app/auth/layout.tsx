import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/images/pattern.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '1000px',
        backgroundPosition: 'center'
      }}
    >
      {/* Capa de opacidad */}
      <div className="absolute inset-0 bg-white/70" />
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}