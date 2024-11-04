"use client";
import { useState, useEffect } from "react";
import Table from "@/app/components/Table";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Edit_modal from "@/app/components/modals/edit_modal";
import Delete_modal from "@/app/components/modals/delete_modal";
import Add_exams_grades from "@/app/components/modals/add_exam _grades";

export default function StudentDetails({ params }) {
  const { id } = params;
  const [student, setStudent] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`/api/student/${id}`);
      const data = await response.json();
      setStudent(data || {});
    };

    const fetchExamResults = async () => {
      const response = await fetch(`/api/examresults?studentid=${id}`);
      const data = await response.json();
      setExamResults(data.examResults || []);
    };

    const fetchExams = async () => {
      const response = await fetch(`/api/exam`);
      const data = await response.json();
      setExams(data.exams || []);
    };

    const fetchExamSeries = async () => {
      const response = await fetch(`/api/examseries`);
      const data = await response.json();
      setExamSeries(data.examSeries || []);
    };

    const fetchExamSubjects = async () => {
      const response = await fetch(`/api/examsubj`);
      const data = await response.json();
      setExamSubjects(data.examSubjs || []);
    };

    fetchStudent();
    fetchExamResults();
    fetchExams();
    fetchExamSeries();
    fetchExamSubjects();
  }, [id]);

  useEffect(() => {
    setFilteredResults(
      examResults.filter((result) =>
        result.subjdesc.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, examResults]);

  const columns = [
    { Header: "Exam", accessor: "examName", className: "w-48 text-left" },
    { Header: "Series", accessor: "seriesName", className: "w-48 text-left" },
    { Header: "Subject", accessor: "subjdesc", className: "w-48 text-left" },
    { Header: "Marks", accessor: "marks", className: "w-24 text-center" },
    { Header: "GPA", accessor: "subjgpa", className: "w-24 text-center" },
    { Header: "Grade", accessor: "subjgrade", className: "w-24 text-center" },
    { Header: "Rank", accessor: "subjresults", className: "w-24 text-center" },
    {
      Header: "Action",
      accessor: "action",
      className: "w-24 text-center",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-yellow-500 p-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mx-1"
            onClick={() => openEditModal(row.original)}
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => openDeleteModal(row.original)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = filteredResults.map((result) => {
    const exam = exams.find((exam) => exam.examid === result.examseriesid);
    const series = examSeries.find(
      (series) => series.examseriesid === result.examseriesid
    );

    return {
      ...result,
      examName: exam ? exam.examname : "N/A",
      seriesName: series ? series.examseriesdescription : "N/A",
    };
  });

  const openEditModal = (result) => {
    setSelectedResult(result);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (result) => {
    setSelectedResult(result);
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  return (
    <>
      {isEditModalOpen && selectedResult && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"examresults"}
          fields={[
            { label: "Marks", name: "marks", type: "number" },
            { label: "GPA", name: "subjgpa", type: "number" },
            { label: "Grade", name: "subjgrade", type: "text" },
            { label: "Rank", name: "subjresults", type: "text" },
          ]}
          entityData={selectedResult}
        />
      )}
      {isDeleteModalOpen && selectedResult && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"examresults"}
          entityData={selectedResult}
        />
      )}
      {isAddModalOpen && (
        <Add_exams_grades
          open={isAddModalOpen}
          setOpen={setIsAddModalOpen}
          studentId={id}
          subjects={examSubjects}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Student Details
        </h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <form>
                  <div className="space-y-12">
                    <div className=" pb-12">
                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="idno"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            ID
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="idno"
                                name="idno"
                                type="text"
                                autoComplete="idno"
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={student.studentidno || ""}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={student.studentname || ""}
                                readOnly
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 mt-3">
        <h1 className="text-xl font-semibold text-gray-900 ">Exams Grades</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <div className="w-64">
                <div className="flex">
                  <input
                    name="keyword"
                    id="keyword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-2 text-black"
                    placeholder="Search subjects"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={openAddModal}
              >
                Add Grades
              </button>
            </div>
          </div>
        </div>
        <Table
          data={data}
          columns={columns}
          page={1}
          limit={10}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>
    </>
  );
}
