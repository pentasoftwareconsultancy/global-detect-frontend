import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-[#0E1F2B] p-4 rounded-xl">
    <h3 className="text-sm lightGray mb-3">{title}</h3>
    {children}
  </div>
);

const Badge = ({ text, color }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
    {text}
  </span>
);

const AdminDetectiveKYC = () => {
  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <p className="text-xs lightGray cursor-pointer mb-1">← Back</p>
          <h1 className="text-base sm:text-lg font-semibold">Detective Sophia Anderson</h1>
          <p className="text-xs lightGray">Insurance Fraud</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-1 text-xs rounded-lg bg-green-500/20 text-green-400">
            Approve KYC
          </button>
          <button className="w-full sm:w-auto px-4 py-1 text-xs rounded-lg bg-red-500/20 text-red-400">
            Reject KYC
          </button>
        </div>

      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Card title="Current Status">
          <Badge text="Offline" color="bg-gray-500/20 text-gray-400" />
        </Card>

        <Card title="KYC Status">
          <Badge text="Pending" color="bg-yellow-500/20 text-yellow-400" />
        </Card>

        <Card title="Active Cases">
          <p className="text-lg font-semibold">0</p>
        </Card>

        <Card title="Rating">
          <p className="text-lightGray text-sm">No rating yet</p>
        </Card>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        {/* PERSONAL INFO */}
        <Card title="Personal Information">
          <p><span className="lightGray">Full Name:</span> Sophia Anderson</p>
          <p><span className="lightGray">DOB:</span> Sep 10, 1988</p>
          <p><span className="lightGray">Phone:</span> +1-555-0125</p>
          <p className="break-all"><span className="lightGray">Email:</span> s.anderson@detectiveagency.com</p>
          <p><span className="lightGray">Address:</span> Miami, FL</p>
          <p><span className="lightGray">Nationality:</span> American</p>

          <div className="mt-3">
            <p className="lightGray text-xs">Emergency Contact</p>
            <p>Thomas Anderson (Father)</p>
          </div>
        </Card>

        {/* PROFESSIONAL INFO */}
        <Card title="Professional Information">
          <p><span className="lightGray">License:</span> LS556677</p>
          <p><span className="lightGray">State:</span> FL</p>
          <p><span className="lightGray">Experience:</span> 5 years</p>
          <p><span className="lightGray">Agency:</span> Florida Private Investigations</p>
          <p><span className="lightGray">Education:</span> BSc Insurance & Risk</p>

          <div className="mt-2 flex gap-2 flex-wrap">
            <span className="bg-[#132735] px-2 py-1 text-xs rounded-full">
              Insurance Fraud
            </span>
            <span className="bg-[#132735] px-2 py-1 text-xs rounded-full">
              Claims Investigation
            </span>
          </div>
        </Card>

        {/* BACKGROUND CHECK */}
        <Card title="Background Check">
          <Badge text="Pending" color="bg-yellow-500/20 text-yellow-400" />
          <p className="text-xs lightGray mt-2">Verification in progress</p>
        </Card>

        {/* BIOGRAPHY */}
        <Card title="Biography">
          <p className="text-sm lightGray">
            Sophia Anderson specializes in insurance fraud investigations with 5 years
            of experience. She holds certifications in fraud investigation and claims adjustment.
          </p>
        </Card>

      </div>

      {/* DOCUMENTS */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl mb-4 overflow-x-auto">
        <h3 className="text-sm lightGray mb-3">Submitted Documents</h3>

        <table className="w-full text-sm min-w-[600px]">
          <thead className="text-lightGray border-b border-gray/20">
            <tr>
              <th className="text-left">Document</th>
              <th>Type</th>
              <th>Uploaded</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {["ID Card", "License", "Certification"].map((doc, i) => (
              <tr key={i} className="border-b border-gray/10">
                <td>{doc}.pdf</td>
                <td>PDF</td>
                <td>Feb 01, 2026</td>
                <td>
                  <Badge text="Pending" color="bg-yellow-500/20 text-yellow-400" />
                </td>
                <td className="flex gap-2 justify-center">
                  <button className="text-xs">View</button>
                  <button className="text-xs">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REFERENCES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card title="Professional References">
          <p>Michael Roberts</p>
          <p className="text-xs lightGray">Florida Investigations</p>
        </Card>

        <Card title="Professional References">
          <p>Patricia Williams</p>
          <p className="text-xs lightGray">State Farm Insurance</p>
        </Card>
      </div>

      {/* ASSIGNED CASES */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl">
        <h3 className="text-sm lightGray mb-3">Assigned Cases (0)</h3>

        <p className="text-center text-lightGray text-sm py-6">
          No cases assigned yet
        </p>
      </div>

    </div>
  );
};

export default AdminDetectiveKYC;