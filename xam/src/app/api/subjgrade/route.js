// src/app/api/subjgrade/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT subjgrade.subjgradeid, subjgrade.examseriesid, subjgrade.examsubjid, subjgrade.subjgradeseq, subjgrade.subjmin, subjgrade.subjmax, subjgrade.subjgrade, subjgrade.subjgpa, subjgrade.subjresult, subjgrade.active, examseries.examseriesdescription 
            FROM subjgrade 
            INNER JOIN examseries ON subjgrade.examseriesid = examseries.examseriesid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE examseriesdescription LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM subjgrade');
        const total = totalRows[0].count;

        return NextResponse.json({ subjGrades: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 

        console.log(body);
        const { examseriesid, examsubjid, subjgradeseq, subjmin, subjmax, subjgrade, subjgpa, subjresult, active } = body; 

        if (!examseriesid || !examsubjid || !subjgradeseq || !subjmin || !subjmax || !subjgrade || !subjgpa || !subjresult || active === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new subjgrade into the database
        const [result] = await pool.query(
            'INSERT INTO subjgrade (examseriesid, examsubjid, subjgradeseq, subjmin, subjmax, subjgrade, subjgpa, subjresult, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [examseriesid, examsubjid, subjgradeseq, subjmin, subjmax, subjgrade, subjgpa, subjresult, active]
        );

        // Return the newly created subjgrade's ID
        return NextResponse.json({
            message: 'Subjgrade created successfully',
            subjGradeId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}