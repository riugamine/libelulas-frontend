"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-primary group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-white group-[.toast]:font-bold text-sm",
          description: "group-[.toast]:text-white/90 text-xs",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-white",
          closeButton: "group-[.toast]:text-white/50 hover:group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
