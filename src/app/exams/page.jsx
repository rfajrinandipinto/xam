"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Add_exams from "../components/modals/add_exam";

import {
  PlusIcon as PlusIconOutline,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Add_exams_series from "../components/modals/add_exam _series";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch("/api/exams");
      const data = await response.json();
      setExams(data.exams || []);
    };

    fetchExams();

    const fetchExamSeries = async () => {
      const response = await fetch("/api/exam_series");
      const data = await response.json();
      setExamSeries(data.exam_series || []);
    };

    fetchExamSeries();
  }, []);

  return (
    <>
      {isModalOpen && <Add_exams open={isModalOpen} setOpen={setIsModalOpen} />}
      {isSeriesModalOpen && (
        <Add_exams_series
          open={isSeriesModalOpen}
          setOpen={setIsSeriesModalOpen}
          exam={exams}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">Exams Lists</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <div className="w-52">
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-700"
                >
                  Exams
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                  defaultValue="Canada"
                >
                  {exams.map((exam) => (
                    <option>{exam.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <div className="">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Exam
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setIsSeriesModalOpen(true)}
                  >
                    Add Exam Series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        Exam
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Series
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total Students
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
                    {examSeries.map((series) => (
                      <tr key={series.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {series.exam_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {series.name}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          1
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium ">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Link href={`/exams/${series.id}`}>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <InformationCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </Link>

                            <span className="sr-only">, {series.name}</span>
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
