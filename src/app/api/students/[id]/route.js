
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
  }

  export async function PUT(req) {
    try {
        const { studentidno, studentname, studentid } = await req.json();

        if (!studentidno || !studentname || !studentid) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

       
        const [existingStudent] = await pool.query(
            'SELECT * FROM students WHERE (studentidno = ? OR studentname = ?) AND studentid != ?',
            [studentidno, studentname, studentid]
        );

        if (existingStudent.length > 0) {
            return NextResponse.json(
                { error: 'Student with the same ID or name already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

       
        await pool.query(
            'UPDATE students SET studentidno = ?, studentname = ? WHERE studentid = ?',
            [studentidno, studentname, studentid]
        );

        return NextResponse.json(
            {
                message: 'Student updated successfully',
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
      // Check if the student exists
      const [existingStudent] = await pool.query('SELECT * FROM students WHERE studentid = ?', [id]);

      if (existingStudent.length === 0) {
          return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }

      // Delete the student
      await pool.query('DELETE FROM students WHERE studentid = ?', [id]);

      return NextResponse.json(
          { message: 'Student deleted successfully' },
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
