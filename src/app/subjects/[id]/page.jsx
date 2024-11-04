"use client";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";

export default function SubjectDetails({ params }) {
  const { id } = params;
  const [subject, setSubject] = useState({});
  const [examSeries, setExamSeries] = useState([]);
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await fetch(`/api/examsubj/${id}`);
      const data = await response.json();
      setSubject(data || {});
    };

    const fetchExamSeries = async () => {
      const response = await fetch(`/api/examseries`);
      const data = await response.json();
      setExamSeries(data.examSeries || []);
    };

    const fetchExams = async () => {
      const response = await fetch(`/api/exams`);
      const data = await response.json();
      setExams(data.exams || []);
    };

    fetchSubject();
    fetchExamSeries();
    fetchExams();
  }, [id]);

  const examSeriesOptions = examSeries.map((examSerie) => ({
    value: examSerie.examseriesid,
    label: examSerie.examseriesdescription,
  }));

  const examOptions = exams.map((exam) => ({
    value: exam.examid,
    label: exam.examname,
  }));

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Subject Details
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
                                value={subject.examsubjid || ""}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="examseries"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Exam Series
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="examseries"
                                name="examseries"
                                type="text"
                                autoComplete="examseries"
                                value={subject.examseriesdescription || ""}
                                readOnly
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="subjcode"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Subject Code
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="subjcode"
                                name="subjcode"
                                type="text"
                                autoComplete="subjcode"
                                value={subject.subjcode || ""}
                                readOnly
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="subjdesc"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="subjdesc"
                                name="subjdesc"
                                type="text"
                                autoComplete="subjdesc"
                                value={subject.subjdesc || ""}
                                readOnly
                                className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="subjearncredit"
                            className="block text-sm leading-6 text-gray-900 font-bold"
                          >
                            Earned Credit
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="subjearncredit"
                                name="subjearncredit"
                                type="text"
                                autoComplete="subjearncredit"
                                value={subject.subjearncredit || ""}
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
    </>
  );
}
