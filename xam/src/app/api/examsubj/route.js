// src/app/api/examsubj/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const examseriesid = request.nextUrl.searchParams.get('examseriesid') || '';
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
            query += ' WHERE examsubj.subjdesc LIKE ?';
            queryParams.push(`%${search}%`);
        }

        if (examseriesid) {
            query += search ? ' AND' : ' WHERE';
            query += ' examsubj.examseriesid = ?';
            queryParams.push(examseriesid);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM examsubj');
        const total = totalRows[0].count;

        // New default exam final grades
        const defaultExamFinalGrades = [
            { subjgradeseq: 1, subjmin: "0.00", subjmax: "44.99", subjgrade: "F", subjgpa: "0.0", subjresult: "GAGAL", active: true },
            { subjgradeseq: 2, subjmin: "45.00", subjmax: "49.99", subjgrade: "D", subjgpa: "1.0", subjresult: "LULUS", active: true },
            { subjgradeseq: 3, subjmin: "50.00", subjmax: "54.99", subjgrade: "C", subjgpa: "2.0", subjresult: "MEMUASKAN", active: true },
            { subjgradeseq: 4, subjmin: "55.00", subjmax: "59.99", subjgrade: "C+", subjgpa: "2.3", subjresult: "BAIK", active: true },
            { subjgradeseq: 5, subjmin: "60.00", subjmax: "64.99", subjgrade: "B-", subjgpa: "2.6", subjresult: "BAIK", active: true },
            { subjgradeseq: 6, subjmin: "65.00", subjmax: "69.99", subjgrade: "B", subjgpa: "3.0", subjresult: "BAIK", active: true },
            { subjgradeseq: 7, subjmin: "70.00", subjmax: "74.99", subjgrade: "B+", subjgpa: "3.3", subjresult: "SANGAT BAIK", active: true },
            { subjgradeseq: 8, subjmin: "75.00", subjmax: "84.99", subjgrade: "A-", subjgpa: "3.6", subjresult: "CEMERLANG", active: true },
            { subjgradeseq: 9, subjmin: "85.00", subjmax: "100.00", subjgrade: "A", subjgpa: "4.0", subjresult: "CEMERLANG", active: true },
        ];

        // Check and insert default exam final grades if they don't exist
        for (const row of rows) {
            const [existingGrades] = await pool.query(
                'SELECT * FROM subjgrade WHERE examsubjid = ?',
                [row.examsubjid]
            );

            if (existingGrades.length === 0) {
                for (const grade of defaultExamFinalGrades) {
                    await pool.query(
                        'INSERT INTO subjgrade ( examseriesid, examsubjid, subjgradeseq, subjmin, subjmax, subjgrade, subjgpa, subjresult, active) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [ row.examseriesid, row.examsubjid, grade.subjgradeseq, grade.subjmin, grade.subjmax, grade.subjgrade, grade.subjgpa, grade.subjresult, grade.active]
                    );
                }
            }
        }

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