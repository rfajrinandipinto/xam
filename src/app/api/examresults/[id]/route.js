// src/app/api/examresults/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const [rows] = await pool.query(`
            SELECT examresults.examresultsid, examresults.examseriesid, examresults.examsubjid, examresults.studentid, examresults.marks, examresults.subjgpa, examresults.subjgrade, examresults.subjresults, examseries.examseriesdescription, examsubj.subjdesc, students.studentname 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
            INNER JOIN students ON examresults.studentid = students.studentid
            WHERE examresults.examresultsid = ?
        `, [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Exam result not found' }, { status: 404 });
        }

        return NextResponse.json({ examResult: rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    try {
        const { marks, subjgpa, subjgrade, subjresults } = await req.json();

        if (!marks || !subjgpa || !subjgrade || !subjresults) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Update the exam result
        await pool.query(
            'UPDATE examresults SET marks = ?, subjgpa = ?, subjgrade = ?, subjresults = ? WHERE examresultsid = ?',
            [marks, subjgpa, subjgrade, subjresults, id]
        );

        return NextResponse.json({ message: 'Exam result updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}