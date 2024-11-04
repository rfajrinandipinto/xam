"use client";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";

export default function StudentDetails({ params }) {
  const { id } = params;
  const [student, setStudent] = useState({});
  const [exams, setExams] = useState([]);
  const [examSeries, setExamSeries] = useState([]);
  const [examSubject, setExamSubjects] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`/api/students/${id}`);
      const data = await response.json();
      setStudent(data || {});
    };

    const fetchExams = async () => {
      const response = await fetch(`/api/exams`);
      const data = await response.json();
      setExams(data.exams || []);
    };

    const fetchExamSeries = async () => {
      const response = await fetch(`/api/exam_series`);
      const data = await response.json();
      setExamSeries(data.exam_series || []);
    };

    fetchExamSeries();
    fetchStudent();
    fetchExams();
  }, [id]);

  const examOptions = exams.map((exam) => ({
    value: exam.examid,
    label: exam.examname,
  }));

  const examSeriesOptions = examSeries.map((examSerie) => ({
    value: examSerie.examseriesid,
    label: examSerie.examseriesdescription,
  }));

  return (
    <>
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
              <div className="flex">
                <Dropdown
                  id="exams"
                  name="exams"
                  label="Exams"
                  options={examOptions}
                  defaultValue=""
                  onChange={(e) => setExamSubjects(e.target.value)}
                />
                <Dropdown
                  id="exams"
                  name="examseries"
                  label="Series"
                  options={examSeriesOptions}
                  defaultValue=""
                />
              </div>

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
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Marks
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        GPA
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Grade
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Rank
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
