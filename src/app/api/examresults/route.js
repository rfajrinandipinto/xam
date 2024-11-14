// src/app/api/examresults/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const studentid = request.nextUrl.searchParams.get('studentid') || '';
        const examseriesid = request.nextUrl.searchParams.get('examseriesid') || '';
        const subjectid = request.nextUrl.searchParams.get('subjectid') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;

        let query = `
            SELECT examresults.examresultsid, examresults.examseriesid, examresults.examsubjid, examresults.studentid, examresults.marks, examresults.subjgpa, examresults.subjgrade, examresults.subjresults, examseries.examseriesdescription, examsubj.subjdesc 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
        `;
        let countQuery = `
            SELECT COUNT(*) as count 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
        `;
        let queryParams = [];
        let countQueryParams = [];

        if (search) {
            query += ' WHERE examsubj.subjdesc LIKE ?';
            countQuery += ' WHERE examsubj.subjdesc LIKE ?';
            queryParams.push(`%${search}%`);
            countQueryParams.push(`%${search}%`);
        }

        if (studentid) {
            query += search ? ' AND' : ' WHERE';
            countQuery += search ? ' AND' : ' WHERE';
            query += ' examresults.studentid = ?';
            countQuery += ' examresults.studentid = ?';
            queryParams.push(studentid);
            countQueryParams.push(studentid);
        }

        if (examseriesid) {
            query += (search || studentid) ? ' AND' : ' WHERE';
            countQuery += (search || studentid) ? ' AND' : ' WHERE';
            query += ' examresults.examseriesid = ?';
            countQuery += ' examresults.examseriesid = ?';
            queryParams.push(examseriesid);
            countQueryParams.push(examseriesid);
        }

        if (subjectid) {
            query += (search || studentid || examseriesid) ? ' AND' : ' WHERE';
            countQuery += (search || studentid || examseriesid) ? ' AND' : ' WHERE';
            query += ' examresults.examsubjid = ?';
            countQuery += ' examresults.examsubjid = ?';
            queryParams.push(subjectid);
            countQueryParams.push(subjectid);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query(countQuery, countQueryParams);
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