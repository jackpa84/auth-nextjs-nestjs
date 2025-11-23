import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verifica se o usuário está autenticado
//   const token = request.cookies.get('accessToken')?.value;

//   // Se não está autenticado e tenta acessar rotas protegidas, redireciona para login
//   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // Se está autenticado e tenta acessar login, redireciona para dashboard
//   if (token && request.nextUrl.pathname === '/login') {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};