// src/app/api/exams/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const examID = request.nextUrl.searchParams.get("examID");

        if (examID){

            const [rows] = await pool.query('SELECT exam_series.id, exam_series.name, exam.name as exam_name FROM exam_series INNER JOIN exam ON exam_series.exam_id = exam.id WHERE exam_id = ?', [examID]);
            return NextResponse.json({ exam_series: rows });

        } else {

            const [rows] = await pool.query(' SELECT exam_series.id, exam_series.name, exam.name as exam_name FROM exam_series INNER JOIN exam ON exam_series.exam_id = exam.id');
        return NextResponse.json({ exam_series: rows });

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

        // const seriesId = result.insertId;

        // const defaultExamGrades = [
        //     [seriesId,  0.0, 'F', 1.2, 'GAGAL'],
        //     [seriesId,  45.0,  'D', 1.6, 'LULUS'],
        //     [seriesId, 50.0,  'C', 2.0, 'MEMUASKAN'],
        //     [seriesId, 55.0,  'C+', 2.3, 'BAIK'],
        //     [seriesId, 60.0,  'B-', 2.6, 'BAIK'],
        //     [seriesId, 65.0,  'B', 3.0, 'BAIK'],
        //     [seriesId, 70.0,  'B+', 3.3, 'SANGAT BAIK'],
        //     [seriesId, 75.0, 'A-', 3.6, 'CEMERLANG'],
        //     [seriesId, 80.0,  'A', 4.0, 'CEMERLANG']
        // ];

        //     // Insert default exam_grade records for the new exam_series
        //     await pool.query(
        //         `INSERT INTO exam_grade (exam_series_id, percentage, grade, point, rank)
        //          VALUES ?`,
        //         [defaultExamGrades]
        //     );

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
