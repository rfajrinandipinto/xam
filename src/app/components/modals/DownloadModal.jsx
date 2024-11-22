import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const DownloadModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedCount 
}) => {
  const [selectedDocs, setSelectedDocs] = useState({
    transcript: true,
    attendance: false
  });

  const handleCheckboxChange = (docType) => {
    setSelectedDocs(prev => ({
      ...prev,
      [docType]: !prev[docType]
    }));
  };

  const handleConfirm = () => {
    onConfirm(selectedDocs);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Download Documents
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Select documents to download for {selectedCount} selected student{selectedCount > 1 ? 's' : ''}:
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <input
                        id="transcript"
                        type="checkbox"
                        checked={selectedDocs.transcript}
                        onChange={() => handleCheckboxChange('transcript')}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label 
                        htmlFor="transcript"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Academic Transcript
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="attendance"
                        type="checkbox"
                        checked={selectedDocs.attendance}
                        onChange={() => handleCheckboxChange('attendance')}
                        disabled
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                      />
                      <label
                        htmlFor="attendance"
                        className="ml-2 block text-sm font-medium text-gray-700 disabled:opacity-50"
                      >
                        Attendance (Coming Soon)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={!Object.values(selectedDocs).some(Boolean)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                    Print Selected
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DownloadModal;