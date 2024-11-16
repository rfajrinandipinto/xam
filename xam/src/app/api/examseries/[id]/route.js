// src/app/api/examseries/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examseries.examseriesid, examseries.examid, examseries.examseriesdescription, exam.examname as exam_name 
            FROM examseries 
            INNER JOIN exam ON examseries.examid = exam.examid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE examseriesdescription LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examseries');
        const total = totalRows[0].count;

        return NextResponse.json({ examSeries: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { examid, examseriesdescription } = body; 

        if (!examid || !examseriesdescription) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new exam series into the database
        const [result] = await pool.query(
            'INSERT INTO examseries (examid, examseriesdescription) VALUES (?, ?)',
            [examid, examseriesdescription]
        );

        const examseriesid = result.insertId;

        // Default exam final grades
        const defaultExamFinalGrades = [
            { examfinalgradeseq: 1, finalpercent: "0.00", overallgrade: "F", overallgradepoint: "1.2", overallrank: "GAGAL" },
            { examfinalgradeseq: 2, finalpercent: "45.00", overallgrade: "D", overallgradepoint: "1.6", overallrank: "LULUS" },
            { examfinalgradeseq: 3, finalpercent: "50.00", overallgrade: "C", overallgradepoint: "2.0", overallrank: "MEMUASKAN" },
            { examfinalgradeseq: 4, finalpercent: "55.00", overallgrade: "C+", overallgradepoint: "2.3", overallrank: "BAIK" },
            { examfinalgradeseq: 5, finalpercent: "60.00", overallgrade: "B-", overallgradepoint: "2.6", overallrank: "BAIK" },
            { examfinalgradeseq: 6, finalpercent: "65.00", overallgrade: "B", overallgradepoint: "3.0", overallrank: "BAIK" },
            { examfinalgradeseq: 7, finalpercent: "70.00", overallgrade: "B+", overallgradepoint: "3.3", overallrank: "SANGAT BAIK" },
            { examfinalgradeseq: 8, finalpercent: "75.00", overallgrade: "A-", overallgradepoint: "3.6", overallrank: "CEMERLANG" },
            { examfinalgradeseq: 9, finalpercent: "85.00", overallgrade: "A", overallgradepoint: "4.0", overallrank: "CEMERLANG" },
        ];

        // Insert default exam final grades
        for (const grade of defaultExamFinalGrades) {
            await pool.query(
                'INSERT INTO examfinalgrade (examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overalrank) VALUES (?, ?, ?, ?, ?, ?)',
                [examseriesid, grade.examfinalgradeseq, grade.finalpercent, grade.overallgrade, grade.overallgradepoint, grade.overallrank]
            );
        }

        // Return the newly created exam series's ID
        return NextResponse.json({
            message: 'Exam series created successfully',
            examSeriesId: examseriesid,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}