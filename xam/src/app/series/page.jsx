"use client";
import { useState, useEffect } from "react";
import Add_modal from "../components/modals/add_modal";
import Edit_modal from "../components/modals/edit_modal";
import Delete_modal from "../components/modals/delete_modal";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";

import {
  PlusIcon as PlusIconOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ExamSeries() {
  const [examSeries, setExamSeries] = useState([]);
  const [selectedExamSeries, setSelectedExamSeries] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("all");
  const limit = 10;

  const fields = [
    {
      label: "",
      name: "examseriesid",
      type: "hidden",
    },
    {
      label: "Exam ID",
      name: "examid",
      type: "text",
    },
    {
      label: "Description",
      name: "examseriesdescription",
      type: "text",
    },
  ];

  useEffect(() => {
    fetchExamSeries();
    fetchExams();
  }, [page, keyword, selectedExam]);

  const columns = [
    { Header: "ID", accessor: "examseriesid", className: "w-24 text-center" },
    {
      Header: "Exam",
      accessor: "exam_name",
      className: "w-48 text-center",
    },
    {
      Header: "Description",
      accessor: "examseriesdescription",
      className: "w-96 text-left",
    },
  ];

  const fetchExams = async () => {
    const response = await fetch("/api/exam");
    const data = await response.json();
    setExams([
      { value: "all", label: "All" },
      ...data.exams.map((exam) => ({
        value: exam.examid,
        label: exam.examname,
      })),
    ]);
  };

  const fetchExamSeries = async () => {
    let url = `/api/examseries?search=${keyword}&page=${page}&limit=${limit}`;
    if (selectedExam !== "all") {
      url += `&examid=${selectedExam}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setExamSeries(data.examSeries);
    setTotal(data.total);
  };

  const handleSearch = () => {
    setPage(1);
    fetchExamSeries();
  };

  const handleExamChange = async (e) => {
    const selectedOption = e.target.value;
    setSelectedExam(selectedOption);
    setPage(1); // Reset page to 1 when filters change
    fetchExamSeries();
  };

  const totalPages = Math.ceil(total / limit);

  const openEditModal = (examSeries) => {
    setSelectedExamSeries(examSeries);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (examSeries) => {
    setSelectedExamSeries(examSeries);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"examseries"}
          fields={fields}
          dropdowns={{ examid: exams }}
        />
      )}
      {isEditModalOpen && selectedExamSeries && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"examseries"}
          fields={fields}
          entityData={selectedExamSeries}
          dropdowns={{ examid: exams }}
        />
      )}
      {isDeleteModalOpen && selectedExamSeries && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"examseries"}
          fields={fields}
          entityData={selectedExamSeries}
          dropdowns={{ examid: exams }}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 w-">
        <h1 className="text-2xl font-semibold text-gray-900 ">Exam Series</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between mb-5">
              <div className="w-64">
                <div className="flex">
                  <input
                    name="keyword"
                    id="keyword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-2 text-black"
                    placeholder="search exam series"
                    onChange={(e) => setKeyword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                    onClick={handleSearch}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5"></MagnifyingGlassIcon>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add Exam Series
              </button>
            </div>
            <Dropdown
              id="exam"
              name="exam"
              label="Select Exam"
              options={exams}
              defaultValue="all"
              onChange={handleExamChange}
            />
          </div>
        </div>
        <Table
          data={examSeries}
          columns={columns}
          page={page}
          limit={limit}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="examseriesid"
          detailPage="examseries"
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
