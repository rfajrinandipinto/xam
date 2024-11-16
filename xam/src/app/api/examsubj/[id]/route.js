// src/app/api/examsubj/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query(`
        SELECT examsubj.examsubjid, examsubj.examseriesid, examsubj.subjcode, examsubj.subjdesc, examsubj.subjearncredit, examseries.examseriesdescription 
        FROM examsubj 
        INNER JOIN examseries ON examsubj.examseriesid = examseries.examseriesid 
        WHERE examsubj.examsubjid = ?
      `, [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Exam Subject not found' }, { status: 404 });
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
        const { examseriesid, subjcode, subjdesc, subjearncredit } = await req.json();

        if (!examseriesid || !subjcode || !subjdesc || !subjearncredit) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if an exam subject with the same code already exists
        const [existingExamSubj] = await pool.query(
            'SELECT * FROM examsubj WHERE subjcode = ? AND examsubjid != ?',
            [subjcode, id]
        );

        if (existingExamSubj.length > 0) {
            return NextResponse.json(
                { error: 'Exam Subject with the same code already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Update the exam subject
        await pool.query(
            'UPDATE examsubj SET examseriesid = ?, subjcode = ?, subjdesc = ?, subjearncredit = ? WHERE examsubjid = ?',
            [examseriesid, subjcode, subjdesc, subjearncredit, id]
        );

        return NextResponse.json(
            {
                message: 'Exam Subject updated successfully',
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
        // Check if the exam subject exists
        const [existingExamSubj] = await pool.query('SELECT * FROM examsubj WHERE examsubjid = ?', [id]);

        if (existingExamSubj.length === 0) {
            return NextResponse.json({ error: 'Exam Subject not found' }, { status: 404 });
        }

        // Delete the exam subject
        await pool.query('DELETE FROM examsubj WHERE examsubjid = ?', [id]);

        return NextResponse.json(
            { message: 'Exam Subject deleted successfully' },
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