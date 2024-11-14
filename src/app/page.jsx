"use client";

import { useState, useEffect } from "react";
import Table from "@/app/components/Table";
import Dropdown from "@/app/components/Dropdown";
import Loading from "./components/loading";
import Add_exams_grades from "@/app/components/modals/add_exam _grades";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchExamResults = async (examseriesid = null) => {
    let url = `/api/examresults?limit=100`;
    if (examseriesid) {
      url += `&examseriesid=${examseriesid}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setExamResults(data.examResults || []);
  };

  const fetchExamSubjects = async (examseriesid = null) => {
    let url = `/api/examsubj?limit=100`;
    if (examseriesid) {
      url += `&examseriesid=${examseriesid}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setExamSubjects(data.examSubjs || []);
  };

  const fetchExamSeries = async () => {
    const response = await fetch(`/api/examseries`);
    const data = await response.json();
    setExamSeries(data.examSeries || []);
  };

  const fetchStudents = async () => {
    const response = await fetch("/api/student");
    const data = await response.json();
    setStudents(data.students || []);
  };

  const fetchExams = async () => {
    const response = await fetch(`/api/exam`);
    const data = await response.json();
    setExams(data.exams || []);
  };

  useEffect(() => {
    setLoading(true);

    fetchStudents();
    fetchExamSeries();
    fetchExamResults();
    fetchExamSubjects();
    fetchExams();

    setLoading(false);
  }, []);

  const handleExamChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedExam(selectedOption);
    setSelectedSeries(null);
    if (selectedOption === "all") {
      await fetchExamSeries();
    } else {
      const response = await fetch(`/api/examseries?examid=${selectedOption}`);
      const data = await response.json();
      setExamSeries(data.examSeries || []);
    }
  };

  const handleSeriesChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedSeries(selectedOption);
    if (selectedOption === "all") {
      await fetchExamResults();
      await fetchExamSubjects();
    } else {
      await fetchExamResults(selectedOption);
      await fetchExamSubjects(selectedOption);
    }
  };

  const columns = [
    {
      Header: "Students",
      accessor: "studentname",
      className: "w-48 text-left sticky left-0",
    },
    ...examSubjects.map((subject, index) => ({
      Header: `${subject.subjcode}`,
      accessor: `subject${index + 1}`,
      className: "text-center",
    })),
  ];

  function getGradeClass(grade) {
    switch (grade) {
      case "A+":
      case "A":
      case "A-":
        return "bg-green-600";
      case "B+":
      case "B":
      case "B-":
        return "bg-blue-500";
      case "C+":
      case "C":
      case "C-":
        return "bg-yellow-500";
      case "D+":
      case "D":
      case "D-":
        return "bg-orange-500";
      case "F+":
      case "F":
      case "F-":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  }

  const data = students
    .filter((student) => {
      const studentResults = examResults.filter(
        (result) => result.studentid === student.studentid
      );
      return studentResults.length > 0;
    })
    .map((student) => {
      const studentResults = examResults.filter(
        (result) => result.studentid === student.studentid
      );

      const subjectsData = examSubjects.reduce((acc, subject, index) => {
        const result = studentResults.find(
          (res) => res.examsubjid === subject.examsubjid
        );
        acc[`subject${index + 1}`] = result ? (
          <div>
            <div
              className={`inline-flex justify-center rounded-md border border-transparent ${getGradeClass(
                result.subjgrade
              )} w-14 h-14 items-center text-white shadow-sm  sm:text-xl font-bold`}
            >
              {result.subjgrade}
            </div>

            <div className="flex justify-center items-center mt-1">
              <div className="inline-flex justify-center w-7 h-7 rounded-md border border-transparent bg-black items-center text-white shadowmd  sm:text-md font-bold mx-1">
                {" "}
                {result.marks}
              </div>
              |
              <div className="inline-flex justify-center w-10 h-7 rounded-md border border-transparent bg-green-600 items-center text-white shadow-sm  sm:text-md font-bold mx-1">
                {" "}
                {result.subjgpa}
              </div>
            </div>
          </div>
        ) : (
          ""
        );
        return acc;
      }, {});

      return {
        studentname: student.studentname,
        studentid: student.studentid,
        ...subjectsData,
      };
    });

  const examOptions = [
    { value: "all", label: "All" },
    ...exams.map((exam) => ({
      value: exam.examid,
      label: exam.examname,
    })),
  ];

  const examSeriesOptions = [
    { value: "all", label: "All" },
    ...examSeries.map((series) => ({
      value: series.examseriesid,
      label: series.examseriesdescription,
    })),
  ];

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 md:px-24 pb-4 ">
        <h1 className="text-2xl font-semibold text-gray-900 ">Dashboard</h1>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-24">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <div className="flex">
                <Dropdown
                  id="exam"
                  name="exam"
                  label="Select Exam"
                  options={examOptions}
                  defaultValue="all"
                  onChange={handleExamChange}
                />
                <Dropdown
                  id="examSeries"
                  name="examSeries"
                  label="Select Exam Series"
                  options={examSeriesOptions}
                  defaultValue="all"
                  onChange={handleSeriesChange}
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Exam Grades
              </button>
            </div>
          </div>
        </div>

        <Loading open={loading} setOpen={setLoading} />
        <Table
          data={data}
          columns={columns}
          page={1}
          limit={10}
          detailPage="students"
          idAccessor="studentid"
          showActions={false}
        />
      </div>

      {isAddModalOpen && (
        <Add_exams_grades
          open={isAddModalOpen}
          setOpen={setIsAddModalOpen}
          subjects={examSubjects}
        />
      )}
    </>
  );
}
