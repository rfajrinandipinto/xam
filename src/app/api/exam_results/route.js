// src/app/api/exams/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {

        const studentID = request.nextUrl.searchParams.get("studentID");
        const seriesID = request.nextUrl.searchParams.get("seriesID");

        if (studentID){

            const [rows] = await pool.query(`
                SELECT 
                exam_results.*,
                exam_subject.description,
                exam_series.name as series_name,
                exam.name as exam_name,
                exam_grade.*
                
                FROM exam_results

                INNER JOIN 
                    exam_subject ON exam_results.subject_id = exam_subject.id
                 INNER JOIN 
                    exam_series ON exam_subject.exam_series_id = exam_series.id
                 INNER JOIN 
                    exam ON exam_series.exam_id = exam.id
                LEFT JOIN 
                    exam_grade ON exam_results.marks >= exam_grade.percentage
                 WHERE student_id = ${studentID}
                 
                 ORDER BY 
    exam_grade.percentage DESC  
LIMIT 1
`);
            return NextResponse.json({ exam_results: rows });

        } else if(seriesID) {

//             const [rows] = await pool.query(`
//                 SELECT 
//                 students.*,
//                 exam_results.*,
//                 exam_subject.description,
//                 exam_series.name as series_name,
//                 exam.name as exam_name,
//                 exam_grade.*

//                 FROM exam_results

//                 LEFT JOIN 
//                     exam_subject ON exam_results.subject_id = exam_subject.id
//                 LEFT JOIN 
//                     exam_series ON exam_subject.exam_series_id = exam_series.id
//                 LEFT JOIN 
//                     exam ON exam_series.exam_id = exam.id
//                 LEFT JOIN 
//                     exam_grade ON exam_results.marks >= exam_grade.percentage
//                 LEFT JOIN 
//                     students ON exam_results.student_id >= students.id
//                     where exam_series.id = 6
//                 ORDER BY 
//                 exam_grade.percentage DESC 
// `);

//     SELECT * from exam_subject where exam_subject.exam_series_id = 4


const [rows] = await pool.query(`
    SELECT 
        students.*,
        exam_results.*, 
        exam_subject.description,
        exam_series.name as es_name,
        exam_series.id as es_id
    from exam_results
    
    LEFT JOIN 
        exam_subject ON exam_results.subject_id = exam_subject.id
    LEFT JOIN
        exam_series ON exam_subject.exam_series_id = exam_series.id
    
    WHERE 
        exam_series.id = 4
    


   
`);
            return NextResponse.json({ exam_results: rows });

          

        } else {

            const [rows] = await pool.query('SELECT * FROM exam_results ');
         return NextResponse.json({ exam_results: rows });

        }

       
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { student_id, subject_id , marks } = body; 

        if (!student_id || !subject_id || !marks) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new student into the database
        const [result] = await pool.query(
            'INSERT INTO exam_results (student_id, subject_id , marks) VALUES (?, ?, ?)',
            [student_id, subject_id , marks]
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
