import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    const search = request.nextUrl.searchParams.get('search');
    const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM students';
    let queryParams = [];

    if (search && search.trim() !== '') {
        const searchKeyword = `%${search.trim()}%`;
        query += ' WHERE studentname LIKE ? OR studentidno LIKE ?';
        queryParams.push(searchKeyword, searchKeyword);
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    try {
        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM students');
        const total = totalRows[0].count;

        return NextResponse.json({ students: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { studentidno, studentname } = await req.json();

        if (!studentidno || !studentname) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the student ID or name already exists
        const [existingStudent] = await pool.query(
            'SELECT * FROM students WHERE studentidno = ? OR studentname = ?',
            [studentidno, studentname]
        );

        if (existingStudent.length > 0) {
            return NextResponse.json(
                { error: 'Student with the same ID or name already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Proceed with insertion if no duplicate is found
        const [result] = await pool.query(
            'INSERT INTO students (studentidno, studentname) VALUES (?, ?)',
            [studentidno, studentname]
        );

        return NextResponse.json(
            {
                message: 'Student created successfully',
                studentId: result.insertId,
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




