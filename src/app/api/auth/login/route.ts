import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Auto-create demo credentials on the fly if they don't exist
    if (email === 'user@taskforge.com' && password === 'password123') {
      const demoUser = await User.findOne({ email: 'user@taskforge.com' });
      if (!demoUser) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
          name: 'Md Sadrul Hasan Dider',
          email: 'user@taskforge.com',
          password: hashedPassword,
          role: 'freelancer'
        });
      } else if (demoUser.name !== 'Md Sadrul Hasan Dider') {
        demoUser.name = 'Md Sadrul Hasan Dider';
        await demoUser.save();
      }
    } else if (email === 'admin@taskforge.com' && password === 'admin123') {
      const demoAdmin = await User.findOne({ email: 'admin@taskforge.com' });
      if (!demoAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
          name: 'TaskForge Team (Client)',
          email: 'admin@taskforge.com',
          password: hashedPassword,
          role: 'client'
        });
      }
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Build response and set HttpOnly Cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
