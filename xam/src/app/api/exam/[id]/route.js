// src/app/api/exams/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query('SELECT * FROM exam WHERE examid = ?', [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { examid, examname } = await req.json();

        if (!examid || !examname) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if an exam with the same ID or name already exists
        const [existingExam] = await pool.query(
            'SELECT * FROM exam WHERE  examname = ? AND examid != ?',
            [ examname, examid]
        );

        if (existingExam.length > 0) {
            return NextResponse.json(
                { error: 'Exam with the same ID or name already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Update the exam
        await pool.query(
            'UPDATE exam SET  examname = ? WHERE examid = ?',
            [ examname, examid]
        );

        return NextResponse.json(
            {
                message: 'Exam updated successfully',
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
        // Check if the exam exists
        const [existingExam] = await pool.query('SELECT * FROM exam WHERE examid = ?', [id]);

        if (existingExam.length === 0) {
            return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
        }

        // Delete the exam
        await pool.query('DELETE FROM exam WHERE examid = ?', [id]);

        return NextResponse.json(
            { message: 'Exam deleted successfully' },
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