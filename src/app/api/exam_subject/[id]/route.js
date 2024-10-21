
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query(`
        SELECT 
            es.*, 
            esr.name AS exam_series_name, 
            e.name AS exam_name 
        FROM 
            exam_subject es 
        JOIN 
            exam_series esr ON es.exam_series_id = esr.id 
        JOIN 
            exam e ON esr.exam_id = e.id 
        WHERE 
            es.id = ?`, [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
  }
