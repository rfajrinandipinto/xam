"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon as PlusIconOutline,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Add_exams_subject from "@/app/components/modals/add_exam _subject";

export default function ExamSeriesDetails({ params }) {
  const { id } = params;
  const [examSeries, setExamSeries] = useState([]);
  const [examSubject, setExamSubject] = useState([]);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  useEffect(() => {
    const fetchExamSeries = async () => {
      const response = await fetch(`/api/exam_series/${id}`);
      const data = await response.json();
      setExamSeries(data || []);
    };

    fetchExamSeries();

    const fetchExamSubject = async () => {
      const response = await fetch(`/api/exam_subject?seriesID=${id}`);
      const data = await response.json();
      setExamSubject(data.exam_subject || []);
    };

    fetchExamSubject();
  }, []);

  useEffect(() => {
    console.log(examSubject);
  }, [examSubject]);

  return (
    <>
      {isSubjectModalOpen && (
        <Add_exams_subject
          open={isSubjectModalOpen}
          setOpen={setIsSubjectModalOpen}
          exam_series_id={examSeries.id}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Exam Series Details
        </h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col mb-5">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <form>
                  <div className="space-y-12">
                    <div className=" pb-12">
                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="username"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                              <input
                                id="username"
                                name="username"
                                type="text"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={examSeries.name}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="username"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Exam
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                              <input
                                id="exam"
                                name="exam"
                                type="text"
                                autoComplete="exam"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={examSeries.exam_name}
                                readOnly
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
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900 ">Subjects</h1>
              <div className="flex items-end">
                <div className="">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                    onClick={() => setIsSubjectModalOpen(true)}
                  >
                    Add Subject
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
                        Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Subject
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Taken
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Current
                      </th>

                      <th
                        scope="col"
                        className=" text-center px-3 py-3.5 text-sm font-semibold text-gray-900"
                      >
                        Failed
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
                    {examSubject.map((subject) => (
                      <tr key={subject.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {subject.code}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {subject.description}
                        </td>
                        <td className=" text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          30
                        </td>
                        <td className="text-center  whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          5
                        </td>
                        <td className=" text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          0
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium ">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Link href={`/subjects/${subject.id}`}>
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

                            <span className="sr-only">, {subject.name}</span>
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
