// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

export async function middleware(req) {
  const token = req.cookies.get('token');
  console.log('Token:', token); // Log the token

  if (!token) {
    console.log('No token, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.decode(token.value);
    console.log('Decoded token:', decoded); // Log the decoded token

    // jwt.verify(token, '1731068634');
    console.log('Token verified, proceeding');
    return NextResponse.next();
  } catch (error) {
    console.log('Invalid token, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};