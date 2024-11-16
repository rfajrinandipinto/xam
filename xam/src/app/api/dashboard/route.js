// src/app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request) {
    try {
        const search = request.nextUrl.searchParams.get('search') || '';
        const studentid = request.nextUrl.searchParams.get('studentid') || '';
        const examseriesid = request.nextUrl.searchParams.get('examseriesid') || '';
        const subjectid = request.nextUrl.searchParams.get('subjectid') || '';
        const examid = request.nextUrl.searchParams.get('examid') || '';
        const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(request.nextUrl.searchParams.get('limit')) || 999;
        const offset = (page - 1) * limit;

        // Fetch students
        let studentsQuery = 'SELECT * FROM students';
        let studentsParams = [];
        if (search) {
            studentsQuery += ' WHERE studentname LIKE ?';
            studentsParams.push(`%${search}%`);
        }
        const [students] = await pool.query(studentsQuery, studentsParams);

        // Fetch exam subjects with examid
        let examSubjectsQuery = `
            SELECT examsubj.*, examseries.examid 
            FROM examsubj 
            INNER JOIN examseries ON examsubj.examseriesid = examseries.examseriesid
        `;
        let examSubjectsParams = [];
        if (examseriesid) {
            examSubjectsQuery += ' WHERE examsubj.examseriesid = ?';
            examSubjectsParams.push(examseriesid);
        }
        const [examSubjects] = await pool.query(examSubjectsQuery, examSubjectsParams);

        // Fetch exam results
        let examResultsQuery = `
            SELECT examresults.examresultsid, examresults.examseriesid, examresults.examsubjid, examresults.studentid, examresults.marks, examresults.subjgpa, examresults.subjgrade, examresults.subjresults, examseries.examseriesdescription, examsubj.subjdesc 
            FROM examresults 
            INNER JOIN examseries ON examresults.examseriesid = examseries.examseriesid
            INNER JOIN examsubj ON examresults.examsubjid = examsubj.examsubjid
        `;
        let examResultsParams = [];
        if (studentid || examseriesid || subjectid || examid) {
            examResultsQuery += ' WHERE';
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
            examResultsQuery += conditions.join(' AND');
        }
        examResultsQuery += ' LIMIT ? OFFSET ?';
        examResultsParams.push(limit, offset);
        const [examResults] = await pool.query(examResultsQuery, examResultsParams);

        // Fetch exam series
        let examSeriesQuery = 'SELECT * FROM examseries';
        let examSeriesParams = [];
        if (examid) {
            examSeriesQuery += ' WHERE examid = ?';
            examSeriesParams.push(examid);
        }
        const [examSeries] = await pool.query(examSeriesQuery, examSeriesParams);

        // Fetch exams
        const [exams] = await pool.query('SELECT * FROM exam');

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