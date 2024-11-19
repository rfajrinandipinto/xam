import React, { useState } from 'react';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import TranscriptPDF from './TranscriptPDF';

const MultiTranscriptDownload = ({ selectedStudents, pdfDataMap }) => {
console.log(pdfDataMap)
  const [downloading, setDownloading] = useState(false);

  const downloadAll = async () => {
    setDownloading(true);

    // Loop through each selected student and download their transcript
    for (const studentId of selectedStudents) {
      const pdfData = pdfDataMap.get(studentId);
      console.log(pdfDataMap)

      if (pdfData) {
        const studentIdNo = pdfData.data[0]?.studentidno || 'student';

        // Generate PDF blob
        const blob = await pdf(
          <TranscriptPDF
            data={pdfData.data}
            overallGPA={pdfData.overallGPA}
            achievement={pdfData.achievement}
          />
        ).toBlob();

        // Trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transcript-${studentIdNo}.pdf`;
        link.click();

        // Clean up URL object
        URL.revokeObjectURL(link.href);

        // Add delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    setDownloading(false);
  };

  return (
    <div className="flex flex-col">
      {selectedStudents.length > 1 ? (
        <button
          onClick={downloadAll}
          disabled={downloading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          {downloading ? 'Preparing Downloads...' : `Print Selected (${selectedStudents.length} PDFs)`}
        </button>
      ) : (
        selectedStudents.map((studentId) => {
          const pdfData = pdfDataMap.get(studentId);
          if (!pdfData) return null;

          return (
            <PDFDownloadLink
              key={studentId}
              document={
                <TranscriptPDF
                  data={pdfData.data}
                  overallGPA={pdfData.overallGPA}
                  achievement={pdfData.achievement}
                  examStartDate={pdfData.examseriesstartdate}
                  examEndDate={pdfData.examseriesenddate}
                />
              }
              fileName={`transcript-${pdfData.data[0]?.studentidno || 'student'}.pdf`}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {({ loading }) => (
                <>
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Preparing...' : 'Print Selected'}
                </>
              )}
            </PDFDownloadLink>
          );
        })
      )}
    </div>
  );
};

export default MultiTranscriptDownload;
