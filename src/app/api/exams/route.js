// src/app/api/exams/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM exam');
        return NextResponse.json({ exams: rows });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { name, notes } = body; 

        if (!name || !notes) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new student into the database
        const [result] = await pool.query(
            'INSERT INTO exam (name, notes) VALUES (?, ?)',
            [name, notes]
        );

        // Return the newly created student's ID
        return NextResponse.json({
            message: 'Student created successfully',
            studentId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}
