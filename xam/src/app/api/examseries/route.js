// src/app/api/examseries/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const examid = request.nextUrl.searchParams.get('examid') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examseries.examseriesid, examseries.examid, examseries.examseriesdescription, exam.examname as exam_name 
            FROM examseries 
            INNER JOIN exam ON examseries.examid = exam.examid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE examseriesdescription LIKE ?';
            queryParams.push(`%${search}%`);
        }

        if (examid) {
            query += search ? ' AND' : ' WHERE';
            query += ' examseries.examid = ?';
            queryParams.push(examid);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examseries');
        const total = totalRows[0].count;

        return NextResponse.json({ examSeries: rows, total, page, limit });
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

        // Return the newly created exam series's ID
        return NextResponse.json({
            message: 'Exam series created successfully',
            examSeriesId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}