"use client";
import { useState, useEffect } from "react";
import Add_modal from "../components/modals/add_modal";
import Edit_modal from "../components/modals/edit_modal";
import Delete_modal from "../components/modals/delete_modal";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

import {
  PlusIcon as PlusIconOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ExamsList() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fields = [
    {
      label: "",
      name: "examid",
      type: "hidden",
    },
    {
      label: "Name",
      name: "examname",
      type: "text",
    },
  ];

  useEffect(() => {
    fetchExams();
  }, [page, keyword]);

  const columns = [
    { Header: "ID", accessor: "examid", className: "w-24 text-center" },
    { Header: "Name", accessor: "examname", className: "w-96 text-left" },
  ];

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch("/api/exam");
      const data = await response.json();
      setExams(data.exams || []);
    };

    fetchExams();
  }, [isModalOpen, isEditModalOpen]);

  const fetchExams = async () => {
    const response = await fetch(
      `/api/exam?search=${keyword}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    setExams(data.exams);
    setTotal(data.total);
  };

  const handleSearch = () => {
    setPage(1);
    fetchExams();
  };

  const totalPages = Math.ceil(total / limit);

  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (exam) => {
    setSelectedExam(exam);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch("/api/exam");
      const data = await response.json();
      setExams(data.exams || []);
    };
    fetchExams();
  }, [isEditModalOpen, isModalOpen, isDeleteModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"exam"}
          fields={fields}
        />
      )}
      {isEditModalOpen && selectedExam && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"exam"}
          fields={fields}
          entityData={selectedExam}
        />
      )}
      {isDeleteModalOpen && selectedExam && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"exam"}
          fields={fields}
          entityData={selectedExam}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 w-">
        <h1 className="text-2xl font-semibold text-gray-900 ">Exams Lists</h1>
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
                    placeholder="search exam"
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
                Add Exam
              </button>
            </div>
          </div>
        </div>
        <Table
          data={exams}
          columns={columns}
          page={page}
          limit={limit}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="examid"
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
