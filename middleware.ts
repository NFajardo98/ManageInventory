import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/:path*'  // Todas las rutas son públicas
])

export default clerkMiddleware(async (auth, request) => {
  // Acepta cualquier ruta ('/:path*'), lo que significa que no se requiere autenticación por defecto.
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Coincide con cualquier ruta que no sea un archivo estático o interna de Next.js
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/', 
    '/(api|trpc)(.*)'
  ]
}
