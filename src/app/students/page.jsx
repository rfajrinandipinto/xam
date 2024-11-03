"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Add_modal from "../components/modals/add_modal";
import Edit_modal from "../components/modals/edit_modal";
import Delete_modal from "../components/modals/delete_modal";

import {
  PlusIcon as PlusIconOutline,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

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
    const fetchUsers = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data.students || []);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data.students || []);
    };

    fetchUsers();
  }, [isModalOpen, isEditModalOpen]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/students?search=${keyword}`);
      const data = await response.json();

      if (data.students) {
        setStudents(data.students);
      } else {
        alert("No students found.");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to search for students.");
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
      const response = await fetch("/api/students");
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
          page={"students"}
          fields={fields}
        />
      )}
      {isEditModalOpen && selectedStudent && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"students"}
          fields={fields}
          studentData={selectedStudent}
        />
      )}
      {isDeleteModalOpen && selectedStudent && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"students"}
          fields={fields}
          studentData={selectedStudent}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
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
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className=" divide-x divide-gray-300">
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-3 text-center text-sm font-semibold text-gray-900 "
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Courses
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {students.map((student, index) => (
                      <tr
                        key={student.studentid}
                        className=" divide-x divide-gray-300"
                      >
                        <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm font-medium text-gray-900  text-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-center">
                          {student.studentidno}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {student.studentname}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          1
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium ">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900 mx-1"
                          >
                            <Link href={`/students/${student.studentid}`}>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-transparent bg-blue-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <InformationCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </Link>

                            <span className="sr-only">
                              , {student.studentname}
                            </span>
                          </a>
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900 mx-1"
                          >
                            <button
                              type="button"
                              className="inline-flex items-center rounded-full border border-transparent bg-yellow-500 p-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                              onClick={(e) => openEditModal(student)}
                            >
                              <PencilSquareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>

                            <span className="sr-only">
                              , {student.studentname}
                            </span>
                          </a>
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900 mx-1"
                          >
                            <button
                              type="button"
                              className="inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              onClick={(e) => openDeleteModal(student)}
                            >
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>

                            <span className="sr-only">
                              , {student.studentname}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
