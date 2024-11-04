// src/app/api/examseries/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query('SELECT examseries.examseriesid, examseries.examid, examseries.examseriesdescription, exam.examname as exam_name FROM examseries INNER JOIN exam ON examseries.examid = exam.examid WHERE examseries.examseriesid = ?', [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Exam Series not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    try {
        const { examid, examseriesdescription } = await req.json();

        if (!examid || !examseriesdescription) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if an exam series with the same description already exists
        const [existingExamSeries] = await pool.query(
            'SELECT * FROM examseries WHERE examseriesdescription = ? AND examseriesid != ?',
            [examseriesdescription, id]
        );

        if (existingExamSeries.length > 0) {
            return NextResponse.json(
                { error: 'Exam Series with the same description already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Update the exam series
        await pool.query(
            'UPDATE examseries SET examid = ?, examseriesdescription = ? WHERE examseriesid = ?',
            [examid, examseriesdescription, id]
        );

        return NextResponse.json(
            {
                message: 'Exam Series updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database update error:', error.message);
        return NextResponse.json(
            { error: 'Database update failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        // Check if the exam series exists
        const [existingExamSeries] = await pool.query('SELECT * FROM examseries WHERE examseriesid = ?', [id]);

        if (existingExamSeries.length === 0) {
            return NextResponse.json({ error: 'Exam Series not found' }, { status: 404 });
        }

        // Delete the exam series
        await pool.query('DELETE FROM examseries WHERE examseriesid = ?', [id]);

        return NextResponse.json(
            { message: 'Exam Series deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database delete error:', error.message);
        return NextResponse.json(
            { error: 'Database delete failed' },
            { status: 500 }
        );
    }
}