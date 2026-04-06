import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-[#0E1F2B] p-4 rounded-xl w-full">
    <h3 className="text-sm lightGray mb-3">{title}</h3>
    {children}
  </div>
);

const Badge = ({ text, color }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
    {text}
  </span>
);

const AdminDetectiveDetailsPage = () => {
  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-base sm:text-lg font-semibold">Detective Emma Watson</h1>
          <p className="text-xs lightGray">Corporate Fraud</p>
        </div>

        <input
          placeholder="Search"
          className="bg-[#0E1F2B] px-4 py-2 rounded-full text-sm w-full md:w-72 outline-none"
        />
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Current Status">
          <Badge text="On Case" color="bg-blue-500/20 text-blue-400" />
        </Card>

        <Card title="KYC Status">
          <Badge text="Approved" color="bg-green-500/20 text-green-400" />
        </Card>

        <Card title="Active Cases">
          <p className="text-lg font-semibold">2</p>
        </Card>

        <Card title="Rating">
          <p className="text-yellow-400 font-semibold">★ 4.8</p>
        </Card>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        <Card title="Personal Information">
          <p><span className="lightGray">Full Name:</span> Emma Watson</p>
          <p><span className="lightGray">DOB:</span> Apr 15, 1990</p>
          <p><span className="lightGray">Phone:</span> +1-555-0109</p>
          <p><span className="lightGray">Email:</span> e.watson@detectiveagency.com</p>
          <p><span className="lightGray">Address:</span> 123 Wall Street, New York</p>
          <p><span className="lightGray">Nationality:</span> American</p>

          <div className="mt-3">
            <p className="lightGray text-xs">Emergency Contact</p>
            <p>Alice Johnson (Sister)</p>
          </div>
        </Card>

        <Card title="Professional Information">
          <p><span className="lightGray">License:</span> 123456789</p>
          <p><span className="lightGray">State:</span> NY</p>
          <p><span className="lightGray">Experience:</span> 10 years</p>
          <p><span className="lightGray">Agency:</span> ABC Detective Agency</p>
          <p><span className="lightGray">Education:</span> BSc Criminal Justice</p>

          <div className="mt-2 flex gap-2 flex-wrap">
            <span className="bg-[#132735] px-2 py-1 text-xs rounded-full">
              Corporate Fraud
            </span>
            <span className="bg-[#132735] px-2 py-1 text-xs rounded-full">
              Financial Investigation
            </span>
          </div>
        </Card>

        <Card title="Background Check">
          <Badge text="Verified" color="bg-green-500/20 text-green-400" />
          <p className="text-xs lightGray mt-2">No criminal record</p>
        </Card>

        <Card title="Biography">
          <p className="text-sm lightGray">
            Emma Watson is a seasoned detective with over 10 years of experience
            in corporate fraud investigations. She holds a Bachelor of Science
            in Criminal Justice and is certified as a Fraud Examiner.
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
            <tr className="border-b border-gray/10">
              <td>ID Card.pdf</td>
              <td>PDF</td>
              <td>Nov 01, 2025</td>
              <td>
                <Badge text="Verified" color="bg-green-500/20 text-green-400" />
              </td>
              <td className="flex gap-2 justify-center">
                <button className="text-xs">View</button>
                <button className="text-xs">Download</button>
              </td>
            </tr>

            <tr>
              <td>License.pdf</td>
              <td>PDF</td>
              <td>Nov 01, 2025</td>
              <td>
                <Badge text="Verified" color="bg-green-500/20 text-green-400" />
              </td>
              <td className="flex gap-2 justify-center">
                <button className="text-xs">View</button>
                <button className="text-xs">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* REFERENCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card title="Professional References">
          <p>John Doe</p>
          <p className="text-xs lightGray">ABC Detective Agency</p>
        </Card>

        <Card title="Professional References">
          <p>Jane Smith</p>
          <p className="text-xs lightGray">XYZ Detective Agency</p>
        </Card>
      </div>

      {/* ASSIGNED CASES */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl overflow-x-auto">
        <h3 className="text-sm lightGray mb-3">Assigned Cases</h3>

        <table className="w-full text-sm min-w-[700px]">
          <thead className="text-lightGray border-b border-gray/20">
            <tr>
              <th className="text-left">Case ID</th>
              <th>Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray/10">
              <td>C001</td>
              <td>Corporate Investigation</td>
              <td>John Smith</td>
              <td>
                <Badge text="In Progress" color="bg-blue-500/20 text-blue-400" />
              </td>
              <td>
                <Badge text="High" color="bg-red-500/20 text-red-400" />
              </td>
              <td>Jan 15, 2025</td>
            </tr>

            <tr>
              <td>C002</td>
              <td>Asset Recovery</td>
              <td>John Smith</td>
              <td>
                <Badge text="Completed" color="bg-green-500/20 text-green-400" />
              </td>
              <td>
                <Badge text="Low" color="bg-yellow-500/20 text-yellow-400" />
              </td>
              <td>Jan 10, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDetectiveDetailsPage;