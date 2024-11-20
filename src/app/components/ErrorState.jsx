import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorState = ({ type, message, suggestion }) => {
  return (
    <div className="w-full py-6">
      <div className="rounded-md bg-red-50 p-4 border border-red-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {type === 'no-series' ? 'No Exam Series Selected' : 'Missing Grade Configuration'}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-red-700">{message}</p>
              {suggestion && (
                <p className="mt-1 text-sm text-gray-500">{suggestion}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;