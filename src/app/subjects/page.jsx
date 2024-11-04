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

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [examSeriesOptions, setExamSeriesOptions] = useState([]);
  const limit = 10;

  const fields = [
    {
      label: "",
      name: "examsubjid",
      type: "hidden",
    },
    {
      label: "Exam Series ID",
      name: "examseriesid",
      type: "text",
    },
    {
      label: "Subject Code",
      name: "subjcode",
      type: "text",
    },
    {
      label: "Description",
      name: "subjdesc",
      type: "text",
    },
    {
      label: "Earned Credit",
      name: "subjearncredit",
      type: "number",
    },
  ];

  useEffect(() => {
    fetchSubjects();
    fetchExamSeriesOptions();
  }, [page, keyword]);

  const columns = [
    { Header: "ID", accessor: "examsubjid", className: "w-24 text-center" },
    {
      Header: "Exam Series",
      accessor: "examseriesdescription",
      className: "w-48 text-center",
    },
    {
      Header: "Subject Code",
      accessor: "subjcode",
      className: "w-48 text-center",
    },
    {
      Header: "Description",
      accessor: "subjdesc",
      className: "w-96 text-left",
    },
    {
      Header: "Earned Credit",
      accessor: "subjearncredit",
      className: "w-24 text-center",
    },
  ];

  const fetchExamSeriesOptions = async () => {
    const response = await fetch("/api/examseries");
    const data = await response.json();
    setExamSeriesOptions(
      data.examSeries.map((series) => ({
        value: series.examseriesid,
        label: series.examseriesdescription,
      }))
    );
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/api/examsubj");
      const data = await response.json();
      setSubjects(data.examSubjs || []);
    };

    fetchSubjects();
  }, [isModalOpen, isEditModalOpen]);

  const fetchSubjects = async () => {
    const response = await fetch(
      `/api/examsubj?search=${keyword}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    setSubjects(data.examSubjs);
    setTotal(data.total);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSubjects();
  };

  const totalPages = Math.ceil(total / limit);

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (subject) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/api/examsubj");
      const data = await response.json();
      setSubjects(data.examSubjs || []);
    };
    fetchSubjects();
  }, [isEditModalOpen, isModalOpen, isDeleteModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"examsubj"}
          fields={fields}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      {isEditModalOpen && selectedSubject && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"examsubj"}
          fields={fields}
          entityData={selectedSubject}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      {isDeleteModalOpen && selectedSubject && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"examsubj"}
          fields={fields}
          entityData={selectedSubject}
          dropdowns={{ examseriesid: examSeriesOptions }}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 w-">
        <h1 className="text-2xl font-semibold text-gray-900 ">Exam Subjects</h1>
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
                    placeholder="search exam subjects"
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
                Add Exam Subject
              </button>
            </div>
          </div>
        </div>
        <Table
          data={subjects}
          columns={columns}
          page={page}
          limit={limit}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="examsubjid"
          detailPage="subjects"
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
