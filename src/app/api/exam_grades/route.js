// src/app/api/exams/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {

        const subjectID = request.nextUrl.searchParams.get("subjectID");

        if (subjectID){

            const [rows] = await pool.query('SELECT * FROM exam_grade WHERE exam_subject_id = ?', [subjectID]);
            return NextResponse.json({ exam_grades: rows });

        } else {

            const [rows] = await pool.query('SELECT * FROM exam_grade ');
         return NextResponse.json({ exam_grades: rows });

        }

       
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { exam_id, name } = body; 
        console.log(body)

        if (!exam_id || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new student into the database
        const [result] = await pool.query(
            'INSERT INTO exam_series (exam_id, name) VALUES (?, ?)',
            [exam_id, name]
        );

        // Return the newly created student's ID
        return NextResponse.json({
            message: 'Exam Series created successfully',
            studentId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}
