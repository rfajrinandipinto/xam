// src/app/api/examfinalgrade/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query(`
        SELECT examfinalgrade.examfinalgradeid, examfinalgrade.examseriesid, examfinalgrade.examfinalgradeseq, examfinalgrade.finalpercent, examfinalgrade.overallgrade, examfinalgrade.overallgradepoint, examfinalgrade.overallrank, examseries.examseriesdescription 
        FROM examfinalgrade 
        INNER JOIN examseries ON examfinalgrade.examseriesid = examseries.examseriesid 
        WHERE examfinalgrade.examfinalgradeid = ?
      `, [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Exam Final Grade not found' }, { status: 404 });
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
        const { examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overallrank } = await req.json();

        if (!examseriesid || !examfinalgradeseq || !finalpercent || !overallgrade || !overallgradepoint || !overallrank) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if an exam final grade with the same sequence already exists
        const [existingExamFinalGrade] = await pool.query(
            'SELECT * FROM examfinalgrade WHERE examfinalgradeseq = ? AND examfinalgradeid != ?',
            [examfinalgradeseq, id]
        );

        if (existingExamFinalGrade.length > 0) {
            return NextResponse.json(
                { error: 'Exam Final Grade with the same sequence already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Update the exam final grade
        await pool.query(
            'UPDATE examfinalgrade SET examseriesid = ?, examfinalgradeseq = ?, finalpercent = ?, overallgrade = ?, overallgradepoint = ?, overallrank = ? WHERE examfinalgradeid = ?',
            [examseriesid, examfinalgradeseq, finalpercent, overallgrade, overallgradepoint, overallrank, id]
        );

        return NextResponse.json(
            {
                message: 'Exam Final Grade updated successfully',
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
        // Check if the exam final grade exists
        const [existingExamFinalGrade] = await pool.query('SELECT * FROM examfinalgrade WHERE examfinalgradeid = ?', [id]);

        if (existingExamFinalGrade.length === 0) {
            return NextResponse.json({ error: 'Exam Final Grade not found' }, { status: 404 });
        }

        // Delete the exam final grade
        await pool.query('DELETE FROM examfinalgrade WHERE examfinalgradeid = ?', [id]);

        return NextResponse.json(
            { message: 'Exam Final Grade deleted successfully' },
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