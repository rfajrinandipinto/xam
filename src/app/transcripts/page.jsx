'use client'

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table";
import TranscriptPDF from "../components/TranscriptPDF";
import Loading from "../components/loading";

export default function TranscriptPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [displayLimit] = useState(10);
  const [exams, setExams] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedExamSeries, setSelectedExamSeries] = useState("");
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [studentSearch, setStudentSearch] = useState("");
  const [examSearch, setExamSearch] = useState("");
  const [examSeriesSearch, setExamSeriesSearch] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showExamSeriesDropdown, setShowExamSeriesDropdown] = useState(false);

  // Function to generate dynamic filename
  const getTranscriptFilename = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    const studentIdNo = allStudents.find(
      student => student.studentid === selectedStudent
    )?.studentidno || 'unknown';
    
    const examSeriesDesc = examSeries.find(
      series => series.examseriesid === selectedExamSeries
    )?.examseriesdescription.replace(/\s+/g, '_') || 'unknown';
    
    return `${dd}${mm}${yyyy}_${studentIdNo}_${examSeriesDesc}_transcripts.pdf`;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/student?limit=100");
        const data = await response.json();
        setAllStudents(data.students);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/exam");
        const data = await response.json();
        setExams(data.exams);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchExamSeries = async () => {
      if (!selectedExam) return;
      try {
        const response = await fetch(`/api/examseries?examid=${selectedExam}`);
        const data = await response.json();
        setExamSeries(data.examSeries);
      } catch (err) {
        console.error("Failed to fetch exam series:", err);
      }
    };
    fetchExamSeries();
  }, [selectedExam]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowStudentDropdown(false);
        setShowExamDropdown(false);
        setShowExamSeriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedExamSeries) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/examresults?studentid=${selectedStudent}&examseriesid=${selectedExamSeries}`
      );
      const data = await response.json();

      const examResultsWithStudentData = await Promise.all(
        data.examResults.map(async (result) => {
          const subjectResponse = await fetch(
            `/api/examsubj/${result.examsubjid}`
          );
          const subjectData = await subjectResponse.json();
          
          return {
            ...result,
            studentname: allStudents.find(
              (student) => student.studentid === selectedStudent
            )?.studentname || "",
            studentidno: allStudents.find(
              (student) => student.studentid === selectedStudent
            )?.studentidno || "",
            subjcode: subjectData.subjcode,
            subjearncredit: subjectData.subjearncredit,
          };
        })
      );

      setExamResults(examResultsWithStudentData);
    } catch (err) {
      console.error("Failed to fetch results:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = allStudents
    .filter((student) =>
      `${student.studentname} ${student.studentidno}`
        .toLowerCase()
        .includes(studentSearch.toLowerCase())
    )
    .slice(0, displayLimit);

  const filteredExams = exams.filter((exam) =>
    exam.examname.toLowerCase().includes(examSearch.toLowerCase())
  );

  const filteredExamSeries = examSeries.filter((series) =>
    series.examseriesdescription
      .toLowerCase()
      .includes(examSeriesSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Student Transcript
          </h1>
        </div>
      </div>

      <main className="text-gray-700 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Student Search */}
                <div className="search-container relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student
                  </label>
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    onFocus={() => setShowStudentDropdown(true)}
                  />
                  {showStudentDropdown && filteredStudents.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.studentid}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedStudent(student.studentid);
                            setStudentSearch(
                              `${student.studentname} (${student.studentidno})`
                            );
                            setShowStudentDropdown(false);
                          }}
                        >
                          {student.studentname} ({student.studentidno})
                        </div>
                      ))}
                      {allStudents.filter((student) =>
                        `${student.studentname} ${student.studentidno}`
                          .toLowerCase()
                          .includes(studentSearch.toLowerCase())
                      ).length > displayLimit && (
                        <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50">
                          Keep typing to see more results...
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Exam Search */}
                <div className="search-container relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam
                  </label>
                  <input
                    type="text"
                    placeholder="Search exam..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={examSearch}
                    onChange={(e) => setExamSearch(e.target.value)}
                    onFocus={() => setShowExamDropdown(true)}
                  />
                  {showExamDropdown && filteredExams.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredExams.map((exam) => (
                        <div
                          key={exam.examid}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedExam(exam.examid);
                            setExamSearch(exam.examname);
                            setShowExamDropdown(false);
                          }}
                        >
                          {exam.examname}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exam Series Search */}
                <div className="search-container relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Series
                  </label>
                  <input
                    type="text"
                    placeholder="Search exam series..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={examSeriesSearch}
                    onChange={(e) => setExamSeriesSearch(e.target.value)}
                    onFocus={() => setShowExamSeriesDropdown(true)}
                    disabled={!selectedExam}
                  />
                  {showExamSeriesDropdown && filteredExamSeries.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredExamSeries.map((series) => (
                        <div
                          key={series.examseriesid}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedExamSeries(series.examseriesid);
                            setExamSeriesSearch(series.examseriesdescription);
                            setShowExamSeriesDropdown(false);
                          }}
                        >
                          {series.examseriesdescription}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-end space-x-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Search
                  </button>

                  {examResults.length > 0 && (
                    <PDFDownloadLink
                      document={<TranscriptPDF data={examResults} />}
                      fileName={getTranscriptFilename()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {({ loading }) =>
                        loading ? "Loading..." : "Export Transkrip"
                      }
                    </PDFDownloadLink>
                  )}
                </div>
              </div>
            </form>

            {/* Results Table */}
            <div className="mt-6">
              {loading ? (
                <Loading open={loading} setOpen={setLoading} />
              ) : (
                <Table
                  page={1}
                  limit={16}
                  data={examResults}
                  columns={[
                    { Header: "Subject", accessor: "subjdesc" },
                    { Header: "Marks", accessor: "marks" },
                    { Header: "GPA", accessor: "subjgpa" },
                    { Header: "Grade", accessor: "subjgrade" },
                    { Header: "Results", accessor: "subjresults" },
                    {
                      Header: "Exam Series",
                      accessor: "examseriesdescription",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}