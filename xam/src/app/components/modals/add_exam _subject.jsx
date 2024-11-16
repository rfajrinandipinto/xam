import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function Add_exams_subject({ open, setOpen, exam_series_id }) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [credit, setCredit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const examSubjectData = {
      code,
      description,
      credit,
      exam_series_id,
    };

    try {
      const res = await fetch("/api/exam_subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examSubjectData),
      });

      if (res.ok) {
        console.log("Exam Subject created successfully");
        window.location.reload();
        setOpen(false);
      } else {
        const errorData = await res.json();
        console.error("Error creating exam series :", errorData.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

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
                        Add Exam Subject
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        <div className="mb-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Code
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="code"
                              id="code"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="description"
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Credit
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="credit"
                              id="credit"
                              value={credit}
                              onChange={(e) => setCredit(e.target.value)}
                              required
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
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Submit
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
