"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Table from "@/app/components/Table";
import Dropdown from "@/app/components/Dropdown";
import Loading from "@/app/components/loading";
import {
  getGradeAndGPA,
  getOverallAchievement,
  getGradeClass,
  calculateTotals,
  calculateOverallGPA,
  calculateOverallMarks,
} from "../utils/examResult";
import MultiTranscriptDownload from "../components/MultiTranscriptDownload";
import { formatDate } from "../utils/formatDate";
import ErrorState from "../components/ErrorState";

export default function Transcript() {
  const [students, setStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [examGrades, setExamGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedSeriesData, setSelectedSeriesData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedExamResultId, setSelectedExamResultId] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [pdfDataMap, setPdfDataMap] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10);

  const fetchData = async (examseriesid = null, keyword = "", page = 1) => {
    try {
      let url = `/api/dashboard?page=${page}&limit=${pageLimit}`;
      if (examseriesid && examseriesid !== "all") {
        url += `&examseriesid=${examseriesid}`;
      }
      if (keyword) {
        url += `&search=${keyword}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setStudents(data.students || []);
      setExamSubjects(data.examSubjects || []);
      setExamResults(data.examResults || []);
      setExamSeries(data.examSeries || []);
      console.log(data.examResults);

      if (examseriesid) {
        const selectedData = data.examSeries?.find(
          (series) => series.examseriesid.toString() === examseriesid.toString()
        );
        setSelectedSeriesData(selectedData || null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchExamGrades = async (examseriesid = null) => {
    try {
      const url = examseriesid
        ? `/api/examfinalgrade?examseriesid=${examseriesid}`
        : `/api/examfinalgrade`;
      const response = await fetch(url);
      const data = await response.json();
      setExamGrades(data.examFinalGrades || []);
    } catch (error) {
      console.error("Failed to fetch exam grades:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchExamGrades()]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedSeries && examSeries.length > 0) {
      const selectedData = examSeries.find(
        (series) => series.examseriesid.toString() === selectedSeries.toString()
      );
      setSelectedSeriesData(selectedData || null);
    }
  }, [selectedSeries, examSeries]);

  const calculateOverallStats = (studentid, examseriesid) => {
    if (examGrades.length === 0) {
      return {
        overallGPA: 0,
        overall: 0,
        achievement: "N/A",
        totalCredits: 0,
        totalMarks: 0,
      };
    }

    const studentResults = examResults.filter(
      (result) =>
        result.studentid === studentid &&
        result.examseriesid.toString() === examseriesid.toString()
    );

    if (studentResults.length === 0) {
      return {
        overallGPA: 0,
        overall: 0,
        achievement: "N/A",
        totalCredits: 0,
        totalMarks: 0,
      };
    }

    let totalGPAPoints = 0;
    let totalCredits = 0;
    let totalMarks = 0;

    studentResults.forEach((result) => {
      const subject = examSubjects.find(
        (subj) => subj.examsubjid === result.examsubjid
      );
      if (subject && result.marks) {
        const { grade, gpa } = getGradeAndGPA(result.marks, examGrades);
        totalGPAPoints += gpa * subject.subjearncredit;
        totalCredits += subject.subjearncredit;
        totalMarks += parseFloat(result.marks);
      }
    });

    // Calculate overall GPA (weighted)
    const overallGPA =
      totalCredits > 0 ? (totalGPAPoints / totalCredits).toFixed(2) : 0;

    // Calculate overall (weighted marks out of total credits)
    const overall =
      totalCredits > 0 ? (totalMarks / totalCredits).toFixed(2) : 0;

    // Determine achievement based on overall GPA
    const achievement = getOverallAchievement(overall, examGrades);

    return { overallGPA: overall, achievement: achievement };
  };

  const preparePDFData = (studentId) => {
    const student = students.find((s) => s.studentid === studentId);
    if (!student) return { data: [], overallGPA: 0, achievement: "N/A" };

    const currentExamSeries = examSeries.find(
      (s) => s.examseriesid.toString() === selectedSeries.toString()
    );

    const results = examSubjects
      .filter(
        (subject) =>
          subject.examseriesid.toString() === selectedSeries.toString()
      )
      .map((subject) => {
        const result = examResults.find(
          (r) =>
            r.studentid === studentId && r.examsubjid === subject.examsubjid
        );

        if (!result) return null;

        const { grade, gpa } = getGradeAndGPA(result.marks, examGrades);

        return {
          studentname: student.studentname,
          studentidno: student.studentidno,
          examseriesdescription: currentExamSeries?.examseriesdescription || "",
          examseriesstartdate: formatDate(
            currentExamSeries?.examseriesstartdate || ""
          ),
          examseriesenddate: formatDate(
            currentExamSeries?.examseriesenddate || ""
          ),
          subjcode: subject.subjcode,
          subjdesc: subject.subjdesc,
          subjearncredit: subject.subjearncredit,
          subjgrade: grade,
          subjgpa: gpa,
          marks: result.marks,
        };
      })
      .filter(Boolean);

    const { totalCredits, totalGPAPoints, totalMarks } =
      calculateTotals(results);
    // const overallGPA = calculateOverallGPA(totalGPAPoints, totalCredits);
    const overall = calculateOverallMarks(totalMarks, totalCredits);
    const achievement = getOverallAchievement(overall, examGrades);

    return {
      data: results,
      overallGPA: overall,
      achievement,
      examseriesstartdate: formatDate(
        currentExamSeries?.examseriesstartdate || ""
      ),
      examseriesenddate: formatDate(currentExamSeries?.examseriesenddate || ""),
    };
  };

  const updateSelectedSeriesData = (seriesId) => {
    const selectedData = examSeries.find(
      (series) => series.examseriesid.toString() === seriesId.toString()
    );
    setSelectedSeriesData(selectedData || null);
  };

  const handleSeriesChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedSeries(selectedOption);

    if (selectedOption) {
      setLoading(true);
      await Promise.all([
        fetchData(selectedOption),
        fetchExamGrades(selectedOption),
      ]);
      setHasSearched(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      setHasSearched(false);
      setSelectedSeriesData(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedSeries) {
      return;
    }
    if (examGrades.length === 0) {
      return;
    }
    console.log("Searching with keyword:", searchKeyword);
    setLoading(true);
    await fetchData(selectedSeries, searchKeyword);
    setHasSearched(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleGradeClick = (examresultsid) => {
    console.log("Clicked on grade with Exam Result ID:", examresultsid);
    setSelectedExamResultId(examresultsid);
  };

  const filteredExamSubjects = examSubjects.filter((subject) => {
    if (selectedSeries !== "all" && subject.examseriesid != selectedSeries) {
      return false;
    }
    return true;
  });

  const GradeDisplay = ({ grade, marks, gpa }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2 text-sm">
        <span
          className={`text-white px-2 py-1 rounded-lg ${getGradeClass(grade)}`}
        >
          {grade}
        </span>
        <span className="text-gray-500">|</span>
        <span className="px-2 py-1 bg-gray-900 text-white rounded-md font-medium">
          {marks}
        </span>
        <span className="text-gray-500">|</span>
        <span className="px-2 py-1 bg-green-600 text-white rounded-md font-medium">
          {gpa}
        </span>
      </div>
    </div>
  );

  const handleCheckboxChange = async (studentId) => {
    setSelectedStudents((prev) => {
      const newSelection = prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId];

      // Prepare PDF data when checkbox is checked
      if (!prev.includes(studentId)) {
        const pdfData = preparePDFData(studentId);
        setPdfDataMap((prevMap) => new Map(prevMap.set(studentId, pdfData)));
      }

      return newSelection;
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(selectedSeries, searchKeyword, newPage);
  };

  const columns = [
    {
      Header: "#",
      accessor: "checkbox",
      className: "w-16 text-center",
    },
    {
      Header: "No",
      accessor: "no",
      className: "w-16 text-center",
    },
    {
      Header: "Students",
      accessor: "studentname",
      className: "w-64 text-left font-medium",
    },
    {
      Header: "Overall GPA",
      accessor: "overallGPA",
      className: "text-center font-bold",
    },
    {
      Header: "Achievement",
      accessor: "achievement",
      className: "text-center font-bold",
    },
    ...(filteredExamSubjects.length > 0
      ? filteredExamSubjects.map((subject, index) => ({
          Header: (
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-900">
                {subject.subjcode}
              </span>
              <span className="text-xs text-gray-500">{subject.subjdesc}</span>
            </div>
          ),
          accessor: `subject${index + 1}`,
          className: "text-center",
        }))
      : [
          {
            Header: "No subjects available",
            accessor: "noSubjects",
            className: "text-center text-gray-500 italic",
          },
        ]),
  ];

  const data = students
    .filter((student) => {
      const studentResults = examResults.filter(
        (result) => result.studentid === student.studentid
      );
      return studentResults.length > 0;
    })
    .map((student, index) => {
      const studentResults = examResults.filter(
        (result) => result.studentid === student.studentid
      );

      const subjectsData = filteredExamSubjects.reduce(
        (acc, subject, index) => {
          const result = studentResults.find(
            (res) => res.examsubjid === subject.examsubjid
          );

          if (result) {
            const { grade, gpa } = getGradeAndGPA(result.marks, examGrades);
            acc[`subject${index + 1}`] = (
              <div onClick={() => handleGradeClick(result.examresultsid)}>
                <GradeDisplay
                  grade={result.subjgrade}
                  marks={result.marks}
                  gpa={result.subjgpa}
                />
              </div>
            );
          } else {
            acc[`subject${index + 1}`] = (
              <div className="text-gray-400">N/A</div>
            );
          }
          return acc;
        },
        {}
      );

      const { overallGPA, achievement } = calculateOverallStats(
        student.studentid,
        selectedSeries
      );

      return {
        checkbox: (
          <input
            type="checkbox"
            checked={selectedStudents.includes(student.studentid)}
            onChange={() => handleCheckboxChange(student.studentid)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        ),
        no: (currentPage - 1) * pageLimit + index + 1,
        studentname: (
          <div className="py-2">
            <div className="font-medium text-gray-900">
              {student.studentname}
            </div>
            <div className="text-sm text-gray-500">
              ID: {student.studentidno}
            </div>
          </div>
        ),
        studentid: student.studentid,
        ...subjectsData,
        overallGPA: (
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xl font-bold text-blue-500">
              {overallGPA}
            </span>
          </div>
        ),
        achievement: <div className="text-md">{achievement}</div>,
      };
    });

  const examSeriesOptions = [
    { value: "", label: "Select Exam Series" },
    ...examSeries.map((series) => ({
      value: series.examseriesid,
      label: series.examseriesdescription,
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Academic Transcript
            </h1>
            {selectedStudents?.length > 0 && (
              <div className="flex-shrink-0">
                <MultiTranscriptDownload
                  selectedStudents={selectedStudents}
                  pdfDataMap={pdfDataMap}
                />
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Left Column */}
              <div className="flex flex-col space-y-4">
                {/* Exam Series Dropdown */}
                <div className="max-w-xs">
                  <Dropdown
                    id="examSeries"
                    name="examSeries"
                    label="Select Exam Series"
                    options={examSeriesOptions}
                    value={selectedSeries}
                    onChange={handleSeriesChange}
                    className="w-full"
                  />
                </div>

                {/* Info Table */}
                {selectedSeries && selectedSeriesData && (
                  <div className="bg-indigo-100 rounded-lg shadow-sm text-black w-full sm:w-1/2">
                    <div className="px-4 py-5 sm:p-3">
                      <dl className="space-y-3">
                        {[
                          {
                            label: "Exam Series",
                            value: selectedSeriesData.examseriesdescription,
                          },
                          { label: "Exam", value: selectedSeriesData.examname },
                          {
                            label: "Start Date",
                            value: selectedSeriesData.examseriesstartdate
                              ? new Date(
                                  selectedSeriesData.examseriesstartdate
                                ).toLocaleDateString("en-GB")
                              : "-",
                          },
                          {
                            label: "End Date",
                            value: selectedSeriesData.examseriesenddate
                              ? new Date(
                                  selectedSeriesData.examseriesenddate
                                ).toLocaleDateString("en-GB")
                              : "-",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex">
                            <dt className="w-32 flex-shrink-0 text-sm font-medium text-gray-700">
                              {item.label}:
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:flex lg:items-start lg:justify-end">
                <div className="w-full max-w-md">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search Student
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        id="search"
                        placeholder="Enter student name..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Spinner */}
            <Loading open={loading} setOpen={setLoading} />

            {/* Table Section */}
            {hasSearched && (
              <>
                {!selectedSeries && (
                  <ErrorState
                    type="no-series"
                    message="Please select an exam series to view student transcripts."
                    suggestion="Use the dropdown menu above to choose an exam series."
                  />
                )}

                {examGrades.length === 0 && (
                  <ErrorState
                    type="no-grades"
                    message="Exam grade configuration is missing for this exam series."
                    suggestion="Please configure the exam final grades in the grade management section before viewing transcripts."
                  />
                )}

                {selectedSeries && examGrades.length > 0 && (
                  <div className="relative overflow-hidden">
                    <div className="overflow-x-auto ring-1 ring-gray-300 rounded-lg">
                      <div className="inline-block min-w-full align-middle">
                        <Table
                          data={data}
                          columns={columns}
                          page={currentPage}
                          limit={pageLimit}
                          currentPage={currentPage}
                          onPageChange={(newPage) => setCurrentPage(newPage)}
                          detailPage="transcripts"
                          idAccessor="studentid"
                          showNumber={false}
                          showActions={false}
                          className="min-w-full divide-y divide-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
