
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
      
    try {
        const seriesID = request.nextUrl.searchParams.get("seriesID");

        if (seriesID){

            const [rows] = await pool.query('SELECT * FROM exam_subject WHERE exam_series_id = ?', [seriesID]);
            return NextResponse.json({ exam_subject: rows });

        } else {

            const [rows] = await pool.query('SELECT * FROM exam_subject');
            return NextResponse.json({ exam_subject: rows });

        }
       
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { code, description, credit , exam_series_id } = body; 

        if (!code || !description || !credit || !exam_series_id)  {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new subject into the database
        const [result] = await pool.query(
            'INSERT INTO exam_subject (code, description, credit , exam_series_id) VALUES (?, ?, ?, ?)',
            [code, description, credit , exam_series_id]
        );

         const seriesId = result.insertId;

        const defaultExamGrades = [
            [seriesId,  0.0, 'F', 1.2, 'GAGAL'],
            [seriesId,  45.0,  'D', 1.6, 'LULUS'],
            [seriesId, 50.0,  'C', 2.0, 'MEMUASKAN'],
            [seriesId, 55.0,  'C+', 2.3, 'BAIK'],
            [seriesId, 60.0,  'B-', 2.6, 'BAIK'],
            [seriesId, 65.0,  'B', 3.0, 'BAIK'],
            [seriesId, 70.0,  'B+', 3.3, 'SANGAT BAIK'],
            [seriesId, 75.0, 'A-', 3.6, 'CEMERLANG'],
            [seriesId, 80.0,  'A', 4.0, 'CEMERLANG']
        ];

            // Insert default exam_grade records for the new exam_series
            await pool.query(
                `INSERT INTO exam_grade (exam_subject_id, percentage, grade, point, rank)
                 VALUES ?`,
                [defaultExamGrades]
            );


        // Return the newly created subject's ID
        return NextResponse.json({
            message: 'Exams Subject created successfully',
            studentId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}


