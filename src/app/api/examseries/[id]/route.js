import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const query = `
            SELECT examseries.examseriesid, examseries.examid, examseries.examseriesdescription, examseries.examseriesstartdate, examseries.examseriesenddate, exam.examname 
            FROM examseries 
            INNER JOIN exam ON examseries.examid = exam.examid
            WHERE examseries.examseriesid = ?
        `;
        const queryParams = [id];

        const [rows] = await pool.query(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Exam series not found' }, { status: 404 });
        }

        return NextResponse.json({ examSeries: rows[0] });
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

        return NextResponse.json({ message: 'Exam series created successfully', examseriesid: result.insertId });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}