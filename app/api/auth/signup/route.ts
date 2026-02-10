import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    console.log('Signup request received');
    await connectToDatabase();
    console.log('Database connected');
    
    const { name, email, password } = await req.json();
    console.log('Request data:', { name, email });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required', success: false },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking if user exists...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'Email already registered', success: false },
        { status: 400 }
      );
    }

    // Create new user
    console.log('Creating new user...');
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      isVerified: false,
    });

    console.log('User created successfully:', newUser._id);
    return NextResponse.json(
      {
        message: 'User created successfully. Please verify your email.',
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during signup', success: false },
      { status: 500 }
    );
  }
}
