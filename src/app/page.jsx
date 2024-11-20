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
  const [selectedSeriesData, setSelectedSeriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedExamResultId, setSelectedExamResultId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (
    examseriesid = null,
    keyword = "",
    page = 1,
    limit = 10
  ) => {
    let url = `/api/dashboard?page=${page}&limit=${limit}`;
    if (examseriesid) {
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
    setTotalPages(Math.ceil(data.total / limit));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/dashboard?limit=1&orderby=createddate&order=desc`
      );
      const data = await response.json();
      const latestSeries = data.examSeries[0];
      setSelectedSeries(latestSeries.examseriesid);
      setSelectedSeriesData(latestSeries);
      await fetchData(latestSeries.examseriesid, "", page);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Extend the loading duration by 500ms
    };

    loadData();
  }, [page]);

  const handleSeriesChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedSeries(selectedOption);
    setLoading(true);
    const response = await fetch(`/api/examseries/${selectedOption}`);
    const data = await response.json();
    setSelectedSeriesData(data.examSeries);
    await fetchData(selectedOption, searchKeyword, page);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    await fetchData(selectedSeries, searchKeyword, page);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleGradeAdded = async () => {
    setLoading(true);
    await fetchData(selectedSeries, searchKeyword, page);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Extend the loading duration by 500ms
  };

  const handleGradeClick = (examresultsid) => {
    setSelectedExamResultId(examresultsid);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredExamSubjects = examSubjects.filter((subject) => {
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
          Header: (
            <div className="relative group">
              {subject.subjcode}
              <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                {subject.subjdesc}
              </div>
            </div>
          ),
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
              <div className="flex justify-center items-center mt-1 cursor-pointer">
                <div
                  className={`inline-flex justify-center rounded-md border border-transparent ${getGradeClass(
                    result.subjgrade
                  )} w-7 h-7 items-center text-white shadow-sm  sm:text-l font-bold  mx-1`}
                >
                  {result.subjgrade}
                </div>
                |
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

  const examSeriesOptions = [
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
              <div className="flex flex-col">
                <div className="w-52 mb-3">
                  <Dropdown
                    id="examSeries"
                    name="examSeries"
                    label="Select Exam Series"
                    options={examSeriesOptions}
                    defaultValue={selectedSeries}
                    onChange={handleSeriesChange}
                  />
                </div>
                <div className=" rounded-lg bg-indigo-100 shadow text-black">
                  <div className="px-4 py-5 sm:p-3">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-indigo-100 divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-700 font-bold">
                            Exam Series
                          </td>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            :{" "}
                            {selectedSeriesData?.examseriesdescription || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-700 font-bold">
                            Exam
                          </td>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            : {selectedSeriesData?.examname || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-700 font-bold">
                            Start Date
                          </td>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            :{" "}
                            {selectedSeriesData?.examseriesstartdate
                              ? new Date(
                                  selectedSeriesData.examseriesstartdate
                                ).toLocaleDateString("en-GB")
                              : "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-700 font-bold">
                            End Date
                          </td>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            :{" "}
                            {selectedSeriesData?.examseriesenddate
                              ? new Date(
                                  selectedSeriesData.examseriesenddate
                                ).toLocaleDateString("en-GB")
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add Exam Grades
                  </button>
                </div>

                <div className="flex mt-4 justify-end">
                  <div className="w-72">
                    <div className="">
                      <label
                        htmlFor="exam"
                        className="block font-medium text-gray-900"
                      >
                        Search Student
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Search Students"
                          value={searchKeyword}
                          onChange={handleSearchChange}
                          className="w-full mt-1 block rounded-md border-gray-300 py-2 pl-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
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
          </div>
        </div>

        <Loading open={loading} setOpen={setLoading} />
        <Table
          data={data}
          columns={columns}
          page={page}
          limit={10}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          detailPage="students"
          idAccessor="studentid"
          showActions={false}
        />
      </div>

      {isAddModalOpen && (
        <Add_exams_grades
          open={isAddModalOpen}
          setOpen={setIsAddModalOpen}
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