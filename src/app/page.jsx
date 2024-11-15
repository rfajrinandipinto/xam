"use client";

import { useState, useEffect } from "react";
import Table from "@/app/components/Table";
import Dropdown from "@/app/components/Dropdown";
import Loading from "./components/loading";
import Add_exams_grades from "@/app/components/modals/add_exam _grades";
import Edit_exam_grades from "@/app/components/modals/edit_exam_grades";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedExamResultId, setSelectedExamResultId] = useState(null);

  const fetchData = async (
    examseriesid = null,
    examid = null,
    keyword = ""
  ) => {
    let url = `/api/dashboard?`;
    if (examseriesid && examseriesid !== "all") {
      url += `&examseriesid=${examseriesid}`;
    }
    if (examid && examid !== "all") {
      url += `&examid=${examid}`;
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
    setExams(data.exams || []);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 500); // Extend the loading duration by 500ms
    };

    loadData();
  }, []);

  const handleExamChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedExam(selectedOption);
    setSelectedSeries("all");
    setLoading(true);
    await fetchData(null, selectedOption, searchKeyword);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleSeriesChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedSeries(selectedOption);
    setLoading(true);
    await fetchData(selectedOption, selectedExam, searchKeyword);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    await fetchData(selectedSeries, selectedExam, searchKeyword);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleGradeAdded = async () => {
    setLoading(true);
    await fetchData(selectedSeries, selectedExam, searchKeyword);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleGradeClick = (examresultsid) => {
    setSelectedExamResultId(examresultsid);
    setIsEditModalOpen(true);
  };

  const filteredExamSubjects = examSubjects.filter((subject) => {
    if (selectedExam !== "all" && subject.examid != selectedExam) {
      return false;
    }
    if (selectedSeries !== "all" && subject.examseriesid != selectedSeries) {
      return false;
    }
    return true;
  });

  const columns = [
    {
      Header: "Students",
      accessor: "studentname",
      className: "w-48 text-left sticky left-0",
    },
    ...(filteredExamSubjects.length > 0
      ? filteredExamSubjects.map((subject, index) => ({
          Header: `${subject.subjcode}`,
          accessor: `subject${index + 1}`,
          className: "text-center",
        }))
      : [
          {
            Header: "No subjects available",
            accessor: "noSubjects",
            className: "text-center",
          },
        ]),
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

      const subjectsData = filteredExamSubjects.reduce(
        (acc, subject, index) => {
          const result = studentResults.find(
            (res) => res.examsubjid === subject.examsubjid
          );
          acc[`subject${index + 1}`] = result ? (
            <div onClick={() => handleGradeClick(result.examresultsid)}>
              <div
                className={`inline-flex justify-center rounded-md border border-transparent ${getGradeClass(
                  result.subjgrade
                )} w-14 h-14 items-center text-white shadow-sm  sm:text-xl font-bold cursor-pointer`}
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
        },
        {}
      );

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
                <div className="w-52">
                  <Dropdown
                    id="exam"
                    name="exam"
                    label="Select Exam"
                    options={examOptions}
                    defaultValue="all"
                    onChange={handleExamChange}
                  />
                </div>
                <div className="w-52">
                  <Dropdown
                    id="examSeries"
                    name="examSeries"
                    label="Select Exam Series"
                    options={examSeriesOptions}
                    defaultValue="all"
                    onChange={handleSeriesChange}
                  />
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Exam Grades
              </button>
            </div>
            <div className="flex mt-4">
              <div className="w-72">
                <div className="mr-5">
                  <label for="exam" class="block font-medium text-gray-900">
                    Search Student
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search Students"
                      value={searchKeyword}
                      onChange={handleSearchChange}
                      className="w-full mt-1 block  rounded-md border-gray-300 py-2 pl-3  text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                    />
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleSearchClick}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
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
          onGradeAdded={handleGradeAdded} // Pass the callback function
        />
      )}

      {isEditModalOpen && (
        <Edit_exam_grades
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          examresultsid={selectedExamResultId}
          onGradeUpdated={handleGradeAdded} // Pass the callback function
        />
      )}
    </>
  );
}
