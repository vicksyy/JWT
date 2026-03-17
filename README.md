# JWT Tomatoes

Actividad completa con:

- `Next.js` + `TypeScript`
- login con JWT
- cookie `HttpOnly` para mantener la sesión
- ruta privada `/dashboard`
- componentes estilo `shadcn/ui`
- despliegue preparado para `Vercel`

## Usuario de prueba

- Email: `admin@tomates.com`
- Contraseña: `1234`

## Variables de entorno

1. Copia `.env.example` a `.env.local`
2. Define una clave segura:

```bash
JWT_SECRET=una_clave_larga_y_distinta_en_produccion
```

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Añade la variable `JWT_SECRET`.
4. Despliega y prueba `/login` y `/dashboard`.
