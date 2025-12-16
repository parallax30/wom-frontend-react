import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('strapi-jwt')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*','/contactUs/:path*','/financials/:path*','/gobernance/:path*','/news/:path*','/portal/:path*'],
};
