"use client";
import { useState, useEffect } from "react";
import Add_modal from "@/app/components/modals/add_modal";
import Edit_modal from "@/app/components/modals/edit_modal";
import Delete_modal from "@/app/components/modals/delete_modal";
import Table from "@/app/components/Table";

export default function SeriesDetails({ params }) {
  const { id } = params;
  const [series, setSeries] = useState({});
  const [exams, setExams] = useState([]);
  const [examFinalGrades, setExamFinalGrades] = useState([]);
  const [selectedExamFinalGrade, setSelectedExamFinalGrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examSeriesOptions, setExamSeriesOptions] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(`/api/examseries/${id}`);
      const data = await response.json();
      setSeries(data || {});
    };

    const fetchExams = async () => {
      const response = await fetch(`/api/exam`);
      const data = await response.json();
      setExams(data.exams || []);
    };

    const fetchExamFinalGrades = async () => {
      const response = await fetch(`/api/examfinalgrade?studentid=${id}`);
      const data = await response.json();
      setExamFinalGrades(data.examFinalGrades || []);
    };

    fetchSeries();
    fetchExams();
    fetchExamFinalGrades();
    fetchExamSeriesOptions();
  }, [id, isModalOpen, isEditModalOpen, isDeleteModalOpen]);

  const fetchExamSeriesOptions = async () => {
    const response = await fetch("/api/examseries");
    const data = await response.json();
    setExamSeriesOptions(
      data.examSeries.map((examSerie) => ({
        value: examSerie.examseriesid,
        label: examSerie.examseriesdescription,
      }))
    );
  };

  const fields = [
    {
      label: "",
      name: "examfinalgradeid",
      type: "hidden",
    },
    {
      label: "Exam Series ID",
      name: "examseriesid",
      type: "hidden",
      value: id,
    },
    {
      label: "Sequence",
      name: "examfinalgradeseq",
      type: "number",
    },
    {
      label: "Final Percent",
      name: "finalpercent",
      type: "number",
    },
    {
      label: "Overall Grade",
      name: "overallgrade",
      type: "text",
    },
    {
      label: "Overall Grade Point",
      name: "overallgradepoint",
      type: "number",
    },
    {
      label: "Overall Rank",
      name: "overallrank",
      type: "text",
    },
  ];

  const columns = [
    {
      Header: "Sequence",
      accessor: "examfinalgradeseq",
      className: "w-24 text-center",
    },
    {
      Header: "Final Percent",
      accessor: "finalpercent",
      className: "w-48 text-center",
    },
    {
      Header: "Overall Grade",
      accessor: "overallgrade",
      className: "w-48 text-center",
    },
    {
      Header: "Overall Grade Point",
      accessor: "overallgradepoint",
      className: "w-48 text-center",
    },
    {
      Header: "Overall Rank",
      accessor: "overallrank",
      className: "w-48 text-center",
    },
  ];

  const openEditModal = (examFinalGrade) => {
    setSelectedExamFinalGrade(examFinalGrade);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (examFinalGrade) => {
    setSelectedExamFinalGrade(examFinalGrade);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"examfinalgrade"}
          fields={fields}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      {isEditModalOpen && selectedExamFinalGrade && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"examfinalgrade"}
          fields={fields}
          entityData={selectedExamFinalGrade}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      {isDeleteModalOpen && selectedExamFinalGrade && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"examfinalgrade"}
          fields={fields}
          entityData={selectedExamFinalGrade}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Series Details
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
                            htmlFor="id"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            ID
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="id"
                                name="id"
                                type="text"
                                autoComplete="id"
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={series.examseriesid || ""}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="exam_name"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Exam ID
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="exam_name"
                                name="exam_name"
                                type="text"
                                autoComplete="exam_name"
                                value={series.exam_name || ""}
                                readOnly
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="examseriesdescription"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Series
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="examseriesdescription"
                                name="examseriesdescription"
                                type="text"
                                autoComplete="examseriesdescription"
                                value={series.examseriesdescription || ""}
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
        <h1 className="text-xl font-semibold text-gray-900 ">
          Exam Final Grades
        </h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <div className="flex items-end">
                <div className="">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Grades
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table
          data={examFinalGrades}
          columns={columns}
          page={1}
          limit={10}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="examfinalgradeid"
        />
      </div>
    </>
  );
}
