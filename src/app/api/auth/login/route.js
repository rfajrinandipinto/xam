import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';


export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the user exists
        const [user] = await pool.query(
            'SELECT * FROM users WHERE emailaddress = ?',
            [email]
        );

        if (user.length === 0) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 } // 401 Unauthorized status code
            );
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 } // 401 Unauthorized status code
            );
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user[0].userid }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json(
            {
                message: 'Login successful',
                token,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error.message);

        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}

export async function LOGOUT(req) {
    try {
        // Invalidate the token (this can be done by removing it from the client-side or maintaining a blacklist of tokens server-side)
        return NextResponse.json(
            {
                message: 'Logout successful',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Logout error:', error.message);

        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}