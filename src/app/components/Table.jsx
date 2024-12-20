// src/components/Table.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@/app/components/Pagination";

export default function Table({
  data,
  columns,
  page,
  limit,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  idAccessor,
  detailPage,
  showActions = true, // New prop with default value
}) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="">
      <div className=" flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-10 align-middle md:px-6 lg:px-8">
            <div className=" shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-300">
                    <th
                      key="No"
                      scope="col"
                      className={`px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-16 `}
                    >
                      No
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.accessor}
                        scope="col"
                        className={`px-3 py-3.5 text-sm font-semibold text-gray-900 ${
                          column.className
                        } ${
                          column.accessor === "studentname"
                            ? "sticky left-0 bg-gray-50 z-10"
                            : ""
                        }`}
                      >
                        {column.Header}
                      </th>
                    ))}
                    {showActions && (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((row, index) => (
                    <tr
                      key={row[idAccessor]}
                      className="divide-x divide-gray-300"
                    >
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-center">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      {columns.map((column) => (
                        <td
                          key={column.accessor}
                          className={`whitespace-nowrap px-3 py-4 text-sm text-gray-900 ${
                            column.className
                          } ${
                            column.accessor === "studentname"
                              ? "sticky left-0 bg-white z-10"
                              : ""
                          }`}
                        >
                          {row[column.accessor]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium">
                          <Link href={`/${detailPage}/${row[idAccessor]}`}>
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
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-yellow-500 p-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mx-1"
                            onClick={() => onEdit(row)}
                          >
                            <PencilSquareIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => onDelete(row)}
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
