import React from "react";


const CaseManagementReport = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Generate Comprehensive Case Report
      </h1>

      <textarea
        placeholder="Executive Summary"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <textarea
        placeholder="Key Findings"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <textarea
        placeholder="Evidence Collected"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <textarea
        placeholder="Recommendations"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <textarea
        placeholder="Next Steps"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <textarea
        placeholder="Conclusion"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      <button className="bg-red-600 px-4 py-2 rounded">
        Generate & Send Report
      </button>
    </div>
  );
};

export default CaseManagementReport;