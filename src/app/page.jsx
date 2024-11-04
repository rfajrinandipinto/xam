"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Table from "@/app/components/Table";
import {
  InformationCircleIcon,
  PlusIcon as PlusIconOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [examSubjects, setExamSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/student");
      const data = await response.json();
      setStudents(data.students || []);
    };

    const fetchExamSubjects = async () => {
      const response = await fetch(`/api/examsubj`);
      const data = await response.json();
      setExamSubjects(data.examSubjs || []);
    };

    const fetchExamResults = async () => {
      const response = await fetch(`/api/examresults`);
      const data = await response.json();
      setExamResults(data.examResults || []);
    };

    fetchStudents();
    fetchExamSubjects();
    fetchExamResults();
  }, []);

  const columns = [
    {
      Header: "Students",
      accessor: "studentname",
      className: "w-48 text-left",
    },
    ...examSubjects.map((subject, index) => ({
      Header: `${subject.subjcode}`,
      accessor: `subject${index + 1}`,
      className: "w-48 text-center",
    })),
  ];

  const data = students.map((student) => {
    const studentResults = examResults.filter(
      (result) => result.studentid === student.studentid
    );

    const subjectsData = examSubjects.reduce((acc, subject, index) => {
      const result = studentResults.find(
        (res) => res.examsubjid === subject.examsubjid
      );
      acc[`subject${index + 1}`] = result
        ? `${result.marks} | ${result.subjgpa} | ${result.subjgrade}`
        : "";
      return acc;
    }, {});

    return {
      studentname: student.studentname,
      studentid: student.studentid,
      ...subjectsData,
    };
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
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
          data={data}
          columns={columns}
          page={1}
          limit={10}
          detailPage="students"
          idAccessor="studentid"
        />
      </div>
    </>
  );
}
