# Reglas de Proyecto - Ecommerce Libélulas Design

## Principios Generales
- **Código modular**: Componentes autocontenidos con responsabilidad única
- **Máximo 1000 líneas por archivo**: Dividir en subcomponentes si se excede
- **Comentarios descriptivos**: Documentar propósito y parámetros de funciones
- **Reutilización**: Priorizar componentes genéricos (ej: `<Card>`, `<Selector>`)
- **Estricto TypeScript**: Tipos explícitos, evitar `any`

## Frontend (Next.js)
### Estilos
- Tailwind CSS con paleta de marca (`primary: #CFE2C3`)
- Mobile-first, responsive por defecto
- Componentes ShadCN/ui como base

### Componentes Clave
1. `ProductCard`: Vista resumida en catálogo
2. `DesignSelector`: Cambia diseño y actualiza imágenes
3. `ColorPicker`: Interfaz visual para selección
4. `WhatsAppButton`: Genera link preconfigurado

## Backend (NestJS)
### Endpoints
- CRUD productos (`GET|POST|PUT /api/products`)
- Filtrado por categorías (`GET /api/products?category=agendas`)

### Base de Datos (PostgreSQL)
- Esquema normalizado hasta 3FN
- Tablas: `products`, `categories`, `designs`
- Tipo JSONB para variantes de diseño

## Diseño UX
1. **Flujo principal**: Catálogo → Detalle → WhatsApp
2. **Interacciones**:
   - Carrusel reactivo a selección de diseño
   - Filtros persistentes en URL
3. **Accesibilidad**: ARIA labels, contraste AA

## Colaboración con IA
### Instrucciones clave
1. Entregar componentes completos uno a uno
2. Explicar decisiones técnicas en comentarios
3. Priorizar:
   - Rendimiento (Lazy loading, imágenes optimizadas)
   - Mantenibilidad (Props bien tipados)
   - Consistencia visual (Tokens de diseño)

### Checklist IA
- [ ] Usar colores de marca
- [ ] Componentes ShadCN como base
- [ ] Documentar props y tipos
- [ ] Validar responsive
