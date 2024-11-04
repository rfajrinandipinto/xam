"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Add_modal from "../components/modals/add_modal";
import Edit_modal from "../components/modals/edit_modal";
import Delete_modal from "../components/modals/delete_modal";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

import {
  PlusIcon as PlusIconOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
      name: "studentid",
      type: "hidden",
    },
    {
      label: "ID",
      name: "studentidno",
      type: "text",
    },
    {
      label: "Name",
      name: "studentname",
      type: "text",
    },
  ];

  useEffect(() => {
    fetchStudents();
  }, [page, keyword]);

  const columns = [
    { Header: "ID", accessor: "studentidno", className: "w-24 text-center" },
    { Header: "Name", accessor: "studentname", className: "w-96 text-left" },
    { Header: "Courses", accessor: "courses", className: "w-24" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/student");
      const data = await response.json();
      setStudents(data.students || []);
    };

    fetchUsers();
  }, [isModalOpen, isEditModalOpen]);

  const fetchStudents = async () => {
    const response = await fetch(
      `/api/student?search=${keyword}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    setStudents(data.students);
    setTotal(data.total);
  };

  const handleSearch = () => {
    setPage(1);
    fetchStudents();
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch("/api/student");
      const data = await response.json();
      setStudents(data.students || []);
    };
    fetchStudent();
  }, [isEditModalOpen, isModalOpen, isDeleteModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"student"}
          fields={fields}
        />
      )}
      {isEditModalOpen && selectedStudent && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"student"}
          fields={fields}
          entityData={selectedStudent}
        />
      )}
      {isDeleteModalOpen && selectedStudent && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"student"}
          fields={fields}
          entityData={selectedStudent}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 w-">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Students Lists
        </h1>
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
                    placeholder="search student"
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
                Add Student
              </button>
            </div>
          </div>
        </div>
        <Table
          data={students}
          columns={columns}
          page={page}
          limit={limit}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="studentid"
          detailPage="students"
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
