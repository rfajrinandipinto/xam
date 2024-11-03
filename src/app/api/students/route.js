import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';




export async function GET(request) {

    const search = request.nextUrl.searchParams.get('search'); 

    if (!search || search.trim() === '') {

        const [rows] = await pool.query(`
            SELECT * 
            FROM students
        `);

        return NextResponse.json({ students: rows });
    }

    try {
        const searchKeyword = `%${search.trim()}%`;
        const [rows] = await pool.query(`
            SELECT * 
            FROM students
            WHERE studentname LIKE ? 
            OR studentidno LIKE ?
        `, [searchKeyword, searchKeyword]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No students found' });
        }

        return NextResponse.json({ students: rows });

    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    // try {
    //     const [rows] = await pool.query('SELECT * FROM students');
    //     return NextResponse.json({ students: rows });
    // } catch (error) {
    //     console.error('Database connection error:', error.message);
    //     return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    // }
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




