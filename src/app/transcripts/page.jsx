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
} from "../utils/examResult";
import MultiTranscriptDownload from "../components/MultiTranscriptDownload";
import { formatDate } from "../utils/formatDate";

export default function Transcript() {
  const [students, setStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [examGrades, setExamGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedExamResultId, setSelectedExamResultId] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [pdfDataMap, setPdfDataMap] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10);

  const fetchData = async (examseriesid = null, keyword = "") => {
    let url = `/api/dashboard?`;
    if (examseriesid && examseriesid !== "all") {
      url += `&examseriesid=${examseriesid}`;
    }
    if (keyword) {
      url += `&search=${keyword}`;
    }

    console.log("Fetching data with URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched data:", data);

    setStudents(data.students || []);
    setExamSubjects(data.examSubjects || []);
    setExamResults(data.examResults || []);
    setExamSeries(data.examSeries || []);
  };

  const fetchExamGrades = async (examseriesid = null) => {
    try {
      const url = examseriesid
        ? `/api/examfinalgrade?examseriesid=${examseriesid}`
        : '/api/examfinalgrade';
      const response = await fetch(url);
      const data = await response.json();
      console.log("Exam grades fetched:", data);
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

  const calculateOverallStats = (studentid, examseriesid) => {
    if (examGrades.length === 0) {
      return { overallGPA: 0, achievement: "N/A" };
    }

    const studentResults = examResults.filter(
      (result) =>
        result.studentid === studentid &&
        result.examseriesid.toString() === examseriesid.toString()
    );

    if (studentResults.length === 0) {
      return { overallGPA: 0, achievement: "N/A" };
    }

    let totalGPAPoints = 0;
    let totalCredits = 0;

    studentResults.forEach((result) => {
      const subject = examSubjects.find(
        (subj) => subj.examsubjid === result.examsubjid
      );
      if (subject && result.marks) {
        const { grade, gpa } = getGradeAndGPA(result.marks, examGrades);
        totalGPAPoints += gpa * subject.subjearncredit;
        totalCredits += subject.subjearncredit;
      }
    });

    const overallGPA =
      totalCredits > 0 ? (totalGPAPoints / totalCredits).toFixed(2) : 0;

    const achievement = getOverallAchievement(parseFloat(overallGPA));

    return { overallGPA, achievement };
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

    // Calculate overall GPA
    const totalCredits = results.reduce(
      (sum, course) => sum + course.subjearncredit,
      0
    );
    const totalGPAPoints = results.reduce(
      (sum, course) => sum + course.subjgpa * course.subjearncredit,
      0
    );
    const overallGPA =
      totalCredits > 0 ? (totalGPAPoints / totalCredits).toFixed(2) : "0.00";
    const achievement = getOverallAchievement(parseFloat(overallGPA));

    return {
      data: results,
      overallGPA,
      achievement,
      examseriesstartdate: formatDate(
        currentExamSeries?.examseriesstartdate || ""
      ),
      examseriesenddate: formatDate(currentExamSeries?.examseriesenddate || ""),
    };
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
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedSeries) {
      alert("Please select an exam series first");
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
          {gpa.toFixed(1)}
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

  const columns = [
    {
      Header: "",
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
                <GradeDisplay grade={grade} marks={result.marks} gpa={gpa} />
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
        <div className="bg-white rounded-lg shadow">
          {/* Header with justified content */}
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Academic Transcript
            </h1>
            {selectedStudents.length > 0 && (
              <MultiTranscriptDownload
                selectedStudents={selectedStudents}
                pdfDataMap={pdfDataMap}
              />
            )}
          </div>

          <div className="p-6 relative overflow-hidden text-gray-700">
            {/* Modified Form Layout */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-8">
                {/* Left Side - Exam Series Filter */}
                <div>
                  <Dropdown
                    id="examSeries"
                    name="examSeries"
                    label="Exam Series"
                    options={examSeriesOptions}
                    value={selectedSeries}
                    onChange={handleSeriesChange}
                    className="w-full"
                  />
                </div>

                {/* Right Side - Search Input and Button */}
                <div className="space-y-4">
                  <div className="relative">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Search Student
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        placeholder="Enter student name..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Search Records
                  </button>
                </div>
              </div>
            </form>

            {/* Loading Spinner */}
            <Loading open={loading} setOpen={setLoading} />

            {/* Display Results Table */}
            {hasSearched && examGrades.length > 0 && (
              <Table
                data={data}
                columns={columns}
                page={currentPage}
                limit={pageLimit}
                detailPage="transcripts"
                idAccessor="studentid"
                showNumber={false}
                showActions={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
