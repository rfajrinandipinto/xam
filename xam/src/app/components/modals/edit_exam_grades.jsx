import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAlert } from "@/app/context/AlertContext";

export default function Edit_exam_grades({
  open,
  setOpen,
  examresultsid,
  onGradeUpdated,
}) {
  const [examResult, setExamResult] = useState(null);
  const [mark, setMark] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);
  const [grades, setGrades] = useState([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchExamResult = async () => {
      const response = await fetch(`/api/examresults/${examresultsid}`);
      const data = await response.json();
      const result = data.examResult;
      setExamResult(result);
      setMark(result.marks);
      setSelectedGrade({
        subjgrade: result.subjgrade,
        subjgpa: result.subjgpa,
        subjresult: result.subjresults,
      });

      const fetchGrades = async () => {
        const response = await fetch(
          `/api/subjgrade?subjectID=${result.examsubjid}`
        );
        const data = await response.json();
        setGrades(data.subjGrades || []);
      };

      fetchGrades();
    };

    fetchExamResult();
  }, [examresultsid]);

  const handleInputChange = (e) => {
    let mark = parseFloat(e.target.value);
    if (mark > 100) {
      mark = 100;
    }
    setMark(mark);

    if (!isNaN(mark)) {
      findGrade(mark);
    } else {
      setMark(0);
      setSelectedGrade({}); // Reset if input is not a valid number
    }

    // Enable the update button only if the mark is changed
    setIsUpdateEnabled(mark !== examResult.marks);
  };

  const findGrade = (mark) => {
    const sortedGrades = [...grades].sort((a, b) => b.subjmin - a.subjmin);
    const foundGrade = sortedGrades.find((grade) => mark >= grade.subjmin);
    setSelectedGrade(foundGrade || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const examResultData = {
      marks: mark,
      subjgpa: selectedGrade.subjgpa,
      subjgrade: selectedGrade.subjgrade,
      subjresults: selectedGrade.subjresult,
    };

    try {
      const res = await fetch(`/api/examresults/${examresultsid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examResultData),
      });

      if (res.ok) {
        console.log("Exam result updated successfully");
        onGradeUpdated(); // Call the callback function to refetch grades
        setOpen(false);
      } else {
        const errorData = await res.json();
        console.error("Error updating exam result:", errorData.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  if (!examResult) {
    return null; // or a loading indicator
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UserPlusIcon
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mt-2 mb-3"
                      >
                        Edit Exam Grades
                      </Dialog.Title>
                      <div className="mt-2 w-full flex">
                        <div className=" w-1/2 pr-5">
                          <label
                            htmlFor="student"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Student
                          </label>
                          <input
                            type="text"
                            id="student"
                            name="student"
                            value={examResult.studentname}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                          />
                        </div>
                      </div>
                      <div className="mt-2 w-full flex">
                        <div className=" w-1/2 pr-5">
                          <label
                            htmlFor="examSeries"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Exam Series
                          </label>
                          <input
                            type="text"
                            id="examSeries"
                            name="examSeries"
                            value={examResult.examseriesdescription}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                          />
                        </div>
                        <div className=" w-1/2 pr-5">
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={examResult.subjdesc}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                          />
                        </div>
                      </div>
                      <div className="mt-2 ">
                        <div className="w-1/2 pr-5 mr-5">
                          <label
                            htmlFor="mark"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Marks
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="mark"
                              id="mark"
                              value={mark}
                              onChange={handleInputChange}
                              required
                              max={100}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:flex sm:items-start mt-3">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"></div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-5 border-t">
                      <div className="mt-2 w-full flex">
                        <div className="mr-5">
                          <label
                            htmlFor="grade"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Grade
                          </label>
                          <div className="flex items-center w-20 h-20 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  sm:text-4xl font-bold mr-5">
                            {selectedGrade.subjgrade || "N/A"}
                          </div>
                        </div>
                        <div className=" mr-3">
                          <label
                            htmlFor="gpa"
                            className="block text-sm font-medium text-gray-700"
                          >
                            GPA
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="gpa"
                              id="gpa"
                              value={selectedGrade.subjgpa || ""}
                              readOnly
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label
                            htmlFor="rank"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rank
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="rank"
                              id="rank"
                              value={selectedGrade.subjresult || ""}
                              readOnly
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                        !isUpdateEnabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isUpdateEnabled}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}