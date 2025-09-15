import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(_request: NextRequest) {
  // IMPORTANT: Disabled to prevent conflicts with client-side navigation
  // Using client-side auth protection instead
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
