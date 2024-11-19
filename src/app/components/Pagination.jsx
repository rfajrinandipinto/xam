// src/components/Pagination.jsx
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 1) {
    return null; // Do not render pagination if totalPages is invalid
  }

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-4">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(page * 10, totalPages * 10)}
          </span>{" "}
          of <span className="font-medium">{totalPages * 10}</span> results
        </p>
      </div>
      <div>
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <button
            onClick={() => onPageChange(page - 1)}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            disabled={page === 1}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              aria-current={page === index + 1 ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === index + 1
                  ? "bg-indigo-600 text-white"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              } focus:z-20 focus:outline-offset-0`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(page + 1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            disabled={page === totalPages}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
