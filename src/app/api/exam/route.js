// src/app/api/exams/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM exam';
        let queryParams = [];

        if (search) {
            query += ' WHERE examname LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM exam');
        const total = totalRows[0].count;

        return NextResponse.json({ exams: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { examname } = body; 

        if (!examname ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new exam into the database
        const [result] = await pool.query(
            'INSERT INTO exam (examname) VALUES (?)',
            [examname]
        );

        // Return the newly created exam's ID
        return NextResponse.json({
            message: 'Exam created successfully',
            examId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}