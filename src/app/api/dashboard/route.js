// src/app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const studentid = request.nextUrl.searchParams.get('studentid') || '';
        let examseriesid = request.nextUrl.searchParams.get('examseriesid') || '';
        const subjectid = request.nextUrl.searchParams.get('subjectid') || '';
        const examid = request.nextUrl.searchParams.get('examid') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = 999;
        const offset = (page - 1) * limit;

        // Fetch the latest exam series if examseriesid is not specified
        if (!examseriesid) {
            const [latestExamSeries] = await pool.query(`
                SELECT examseriesid 
                FROM examseries 
                WHERE active = 1
                ORDER BY examseriesstartdate DESC 
                LIMIT 1
            `);
            if (latestExamSeries.length > 0) {
                examseriesid = latestExamSeries[0].examseriesid;
            }
        }

        // Fetch students
        let studentsQuery = 'SELECT * FROM students WHERE active = 1';
        let studentsParams = [];
        if (search) {
            studentsQuery += ' AND studentname LIKE ?';
            studentsParams.push(`%${search}%`);
        }
        const [students] = await pool.query(studentsQuery, studentsParams);

        // Fetch exam subjects with examid
        let examSubjectsQuery = `
            SELECT examsubj.*, examseries.examid 
            FROM examsubj 
            INNER JOIN examseries ON examsubj.examseriesid = examseries.examseriesid
            WHERE examsubj.active = 1 AND examseries.active = 1
        `;
        let examSubjectsParams = [];
        if (examseriesid) {
            examSubjectsQuery += ' AND examsubj.examseriesid = ?';
            examSubjectsParams.push(examseriesid);
        }
        const [examSubjects] = await pool.query(examSubjectsQuery, examSubjectsParams);

        // Fetch exam results
        let examResultsQuery = `
            SELECT examresults.examresultsid, examresults.examseriesid, examresults.examsubjid, examresults.studentid, examresults.marks, examresults.subjgpa, examresults.subjgrade, examresults.subjresults, examseries.examseriesdescription, examsubj.subjdesc 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
            WHERE examresults.active = 1 AND examseries.active = 1 AND examsubj.active = 1
        `;
        let examResultsParams = [];
        if (studentid || examseriesid || subjectid || examid) {
            const conditions = [];
            if (studentid) {
                conditions.push(' examresults.studentid = ?');
                examResultsParams.push(studentid);
            }
            if (examseriesid) {
                conditions.push(' examresults.examseriesid = ?');
                examResultsParams.push(examseriesid);
            }
            if (subjectid) {
                conditions.push(' examresults.examsubjid = ?');
                examResultsParams.push(subjectid);
            }
            if (examid) {
                conditions.push(' examseries.examid = ?');
                examResultsParams.push(examid);
            }
            examResultsQuery += ' AND' + conditions.join(' AND');
        }
        examResultsQuery += ' LIMIT ? OFFSET ?';
        examResultsParams.push(limit, offset);
        const [examResults] = await pool.query(examResultsQuery, examResultsParams);

        // Fetch exam series with exam name
        let examSeriesQuery = `
            SELECT examseries.*, exam.examname 
            FROM examseries 
            INNER JOIN exam ON examseries.examid = exam.examid 
            WHERE examseries.active = 1
            ORDER BY examseries.examseriesstartdate DESC
        `;
        const [examSeries] = await pool.query(examSeriesQuery);

        // Fetch exams
        const [exams] = await pool.query('SELECT * FROM exam WHERE active = 1');

        return NextResponse.json({
            students,
            examSubjects,
            examResults,
            examSeries,
            exams,
        });
    } catch (error) {
        console.error('Database connection error:', error.message);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}