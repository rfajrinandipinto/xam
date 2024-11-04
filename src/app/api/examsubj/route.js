// src/app/api/examsubj/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examsubj.examsubjid, examsubj.examseriesid, examsubj.subjcode, examsubj.subjdesc, examsubj.subjearncredit, examseries.examseriesdescription 
            FROM examsubj 
            INNER JOIN examseries ON examsubj.examseriesid = examseries.examseriesid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE subjdesc LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examsubj');
        const total = totalRows[0].count;

        return NextResponse.json({ examSubjs: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { examseriesid, subjcode, subjdesc, subjearncredit } = body; 

        if (!examseriesid || !subjcode || !subjdesc || !subjearncredit) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new exam subject into the database
        const [result] = await pool.query(
            'INSERT INTO examsubj (examseriesid, subjcode, subjdesc, subjearncredit) VALUES (?, ?, ?, ?)',
            [examseriesid, subjcode, subjdesc, subjearncredit]
        );

        // Return the newly created exam subject's ID
        return NextResponse.json({
            message: 'Exam subject created successfully',
            examSubjId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}