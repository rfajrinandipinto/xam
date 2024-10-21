
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query('SELECT exam_series.id, exam_series.name, exam.name as exam_name FROM exam_series INNER JOIN exam ON exam_series.exam_id = exam.id WHERE exam_series.id = ?', [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Exams Series not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
  }
