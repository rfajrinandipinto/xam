// src/app/api/examresults/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const studentid = request.nextUrl.searchParams.get('studentid') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examresults.examresultsid, examresults.examseriesid, examresults.examsubjid, examresults.studentid, examresults.marks, examresults.subjgpa, examresults.subjgrade, examresults.subjresults, examseries.examseriesdescription, examsubj.subjdesc 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
        `;
        let queryParams = [];

        if (search) {
            query += ' WHERE subjdesc LIKE ?';
            queryParams.push(`%${search}%`);
        }

        if (studentid) {
            query += search ? ' AND' : ' WHERE';
            query += ' examresults.studentid = ?';
            queryParams.push(studentid);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examresults');
        const total = totalRows[0].count;

        return NextResponse.json({ examResults: rows, total, page, limit });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); 
        const { examseriesid, examsubjid, studentid, marks, subjgpa, subjgrade, subjresults } = body; 

        if (!examseriesid || !examsubjid || !studentid || !marks || !subjgpa || !subjgrade || !subjresults) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert a new exam result into the database
        const [result] = await pool.query(
            'INSERT INTO examresults (examseriesid, examsubjid, studentid, marks, subjgpa, subjgrade, subjresults) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [examseriesid, examsubjid, studentid, marks, subjgpa, subjgrade, subjresults]
        );

        // Return the newly created exam result's ID
        return NextResponse.json({
            message: 'Exam result created successfully',
            examResultsId: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error.message);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }
}