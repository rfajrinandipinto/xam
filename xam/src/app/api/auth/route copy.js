import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(request) {
    const search = request.nextUrl.searchParams.get('search');
    const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM users';
    let queryParams = [];

    if (search && search.trim() !== '') {
        const searchKeyword = `%${search.trim()}%`;
        query += ' WHERE name LIKE ? OR emailaddress LIKE ?';
        queryParams.push(searchKeyword, searchKeyword);
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    try {
        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM users');
        const total = totalRows[0].count;

        return NextResponse.json({ users: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { emailaddress, name, password } = await req.json();

        if (!emailaddress || !name || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the email or name already exists
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE emailaddress = ? OR name = ?',
            [emailaddress, name]
        );

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: 'User with the same email or name already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Proceed with insertion if no duplicate is found
        const [result] = await pool.query(
            'INSERT INTO users (emailaddress, name, password) VALUES (?, ?, ?)',
            [emailaddress, name, hashedPassword]
        );

        return NextResponse.json(
            {
                message: 'User created successfully',
                userId: result.insertId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Database insertion error:', error.message);

        return NextResponse.json(
            { error: 'Database insertion failed' },
            { status: 500 }
        );
    }
}

export async function LOGIN(req) {
    try {
        const { emailaddress, password } = await req.json();

        if (!emailaddress || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the user exists
        const [user] = await pool.query(
            'SELECT * FROM users WHERE emailaddress = ?',
            [emailaddress]
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