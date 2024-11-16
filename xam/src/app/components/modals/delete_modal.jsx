import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAlert } from "@/app/context/AlertContext";

export default function Delete_modal({
  open,
  setOpen,
  page,
  fields,
  entityData,
  dropdowns,
}) {
  // Initialize form data with existing entity data
  const initialFormData = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: entityData[field.name] || "" }),
    {}
  );

  const [formData, setFormData] = useState(initialFormData);

  const { showAlert } = useAlert();

  useEffect(() => {
    if (open) {
      const updatedFormData = { ...initialFormData };
      fields.forEach((field) => {
        if (
          dropdowns &&
          dropdowns[field.name] &&
          dropdowns[field.name].length > 0
        ) {
          updatedFormData[field.name] =
            entityData[field.name] || dropdowns[field.name][0].value;
        }
      });
      setFormData(updatedFormData);
    }
  }, [open, fields, dropdowns, entityData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/${page}/${entityData[`${page}id`]}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Entity deletion succeeded
        showAlert(
          "success",
          `${page.charAt(0).toUpperCase() + page.slice(1)} deleted successfully`
        );
        console.log(
          `${page.charAt(0).toUpperCase() + page.slice(1)} deleted successfully`
        );

        setOpen(false);
      } else {
        // Entity deletion failed, get the error message from the response
        const errorData = await res.json();
        showAlert("error", errorData.error || `Error deleting ${page}`);
        console.error(`Error deleting ${page}:`, errorData.error);
      }
    } catch (error) {
      // Handle network or unexpected errors
      showAlert("error", "Request failed. Please try again.");
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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <TrashIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mt-2 mb-3"
                      >
                        Delete {page.charAt(0).toUpperCase() + page.slice(1)}
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        {fields.map((field, index) => (
                          <div key={index} className="mb-3">
                            <label
                              htmlFor={field.name}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {field.label}
                            </label>
                            <div className="mt-1">
                              {dropdowns && dropdowns[field.name] ? (
                                <select
                                  name={field.name}
                                  id={field.name}
                                  required
                                  value={formData[field.name]}
                                  disabled
                                  onChange={handleInputChange}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                >
                                  {dropdowns[field.name].map((option, idx) => (
                                    <option key={idx} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  name={field.name}
                                  id={field.name}
                                  readOnly
                                  value={formData[field.name]}
                                  onChange={handleInputChange}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Delete
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
