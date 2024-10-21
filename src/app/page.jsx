"use client";

import { Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";

import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  PlusIcon as PlusIconOutline,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon as PlusIconMini,
} from "@heroicons/react/20/solid";

const people2 = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [selected, setSelected] = useState(people2[3]);
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 ">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1 w-52">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-white bg-indigo-600"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {person.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setOpen(true)}
              >
                Add Exam
              </button>

              {/* <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                      </button> */}
            </div>

            <div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6"
                  >
                    <dt>
                      <div className="absolute rounded-md bg-indigo-500 p-3">
                        <item.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline ">
                      <p className="text-2xl font-semibold text-gray-900">
                        {item.stat}
                      </p>
                      <p
                        className={classNames(
                          item.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600",
                          "ml-2 flex items-baseline text-sm font-semibold"
                        )}
                      >
                        {item.changeType === "increase" ? (
                          <ArrowUpIcon
                            className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowDownIcon
                            className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                            aria-hidden="true"
                          />
                        )}

                        <span className="sr-only">
                          {" "}
                          {item.changeType === "increase"
                            ? "Increased"
                            : "Decreased"}{" "}
                          by{" "}
                        </span>
                        {item.change}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Students
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center"
                      >
                        Subject 1
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center"
                      >
                        Subject 2
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center"
                      >
                        Subject 3
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center"
                      >
                        Subject 4
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center"
                      >
                        Subject 5
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    ))}
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    ))}
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    ))}
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    ))}
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          <table className="w-full">
                            <tr className="divide-x divide-gray-200">
                              <td className="px-2"> 70</td>
                              <td className="px-2"> B</td>
                              <td className="px-2"> 3.5</td>
                            </tr>
                          </table>
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
