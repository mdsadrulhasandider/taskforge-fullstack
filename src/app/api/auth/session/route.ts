import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    // Decode and verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        name: string;
        email: string;
        role: string;
      };
      
      return NextResponse.json({
        user: {
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          token
        }
      });
    } catch (err) {
      // Token is invalid/expired
      const response = NextResponse.json({ user: null });
      response.cookies.delete('token');
      return response;
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    maxAge: 0, // Delete cookie immediately
    path: '/'
  });
  return response;
}
