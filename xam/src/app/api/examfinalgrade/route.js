// src/app/api/examfinalgrade/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examfinalgrade.examfinalgradeid, examfinalgrade.examseriesid, examfinalgrade.examfinalgradeseq, examfinalgrade.finalpercent, examfinalgrade.overallgrade, examfinalgrade.overallgradepoint, examfinalgrade.overallrank, examseries.examseriesdescription 
            FROM examfinalgrade 
            INNER JOIN examseries ON examfinalgrade.examseriesid = examseries.examseriesid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE examseriesdescription LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examfinalgrade');
        const total = totalRows[0].count;

        return NextResponse.json({ examFinalGrades: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overallrank } = body; 

        if (!examseriesid || !examfinalgradeseq || !finalpercent || !overallgrade || !overallgradepoint || !overallrank) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new exam final grade into the database
        const [result] = await pool.query(
            'INSERT INTO examfinalgrade (examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overallrank) VALUES (?, ?, ?, ?, ?, ?)',
            [examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overallrank]
        );

        // Return the newly created exam final grade's ID
        return NextResponse.json({
            message: 'Exam final grade created successfully',
            examFinalGradeId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}