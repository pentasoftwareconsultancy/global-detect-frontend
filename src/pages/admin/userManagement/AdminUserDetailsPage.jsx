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

const AdminUserDetailsPage = () => {
  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-xs lightGray mb-1 cursor-pointer">← Back</p>
          <h1 className="text-base sm:text-lg font-semibold">John Smith</h1>
          <p className="text-xs lightGray break-all">john.smith@email.com</p>
        </div>

        <button className="w-full sm:w-auto px-4 py-1 text-xs rounded-lg bg-red text-white">
          Block User
        </button>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Card title="Account Status">
          <Badge text="Active" color="bg-green-500/20 text-green-400" />
        </Card>

        <Card title="Total Cases">
          <p className="text-lg font-semibold">2</p>
        </Card>

        <Card title="Active Cases">
          <p className="text-lg font-semibold">2</p>
        </Card>

        <Card title="Total Spent">
          <p className="text-lg font-semibold">$ 15,000</p>
        </Card>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        {/* PERSONAL INFO */}
        <Card title="Personal Information">
          <p><span className="lightGray">Full Name:</span> John Smith</p>
          <p><span className="lightGray">DOB:</span> Mar 15, 1985</p>
          <p><span className="lightGray">Phone:</span> +1-555-0101</p>
          <p><span className="lightGray">Alternate Phone:</span> +1-555-0201</p>
          <p className="break-all"><span className="lightGray">Email:</span> john.smith@email.com</p>
          <p><span className="lightGray">Aadhar:</span> 2345-5678-2457</p>
          <p><span className="lightGray">Address:</span> New York, NY</p>

          <p className="mt-2 text-xs lightGray">Contact Preference: Email Only</p>
          <Badge text="Enabled" color="bg-red text-white mt-1 inline-block" />
        </Card>

        {/* ACCOUNT INFO */}
        <Card title="Account Information">
          <p><span className="lightGray">Account Type:</span> Individual</p>
          <p><span className="lightGray">Joined:</span> Dec 01, 2025</p>
          <p><span className="lightGray">Last Login:</span> Feb 05, 2026</p>
          <p><span className="lightGray">Payment:</span> Credit Card</p>
        </Card>

        {/* VERIFICATION */}
        <Card title="Verification Status">
          <div className="flex gap-2 flex-wrap mb-2">
            <Badge text="Email Verified" color="bg-green-500/20 text-green-400" />
            <Badge text="Phone Verified" color="bg-green-500/20 text-green-400" />
            <Badge text="Identity Verified" color="bg-green-500/20 text-green-400" />
          </div>

          <p className="text-xs lightGray">Verified on Dec 01, 2025</p>
        </Card>

        {/* BILLING */}
        <Card title="Billing Information">
          <p><span className="lightGray">Address:</span> New York, NY</p>
          <p><span className="lightGray">Completed Cases:</span> 2</p>
          <p><span className="lightGray">Total Spent:</span> $15,000</p>
        </Card>

      </div>

      {/* ADMIN NOTES */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl mb-4">
        <h3 className="text-sm lightGray mb-2">Admin Notes</h3>
        <p className="text-sm lightGray">
          Long-term client, corporate investigations specialist.
        </p>
      </div>

      {/* CASE HISTORY */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl overflow-x-auto">
        <h3 className="text-sm lightGray mb-3">Case History</h3>

        <table className="w-full text-sm table-fixed min-w-[800px]">
          <thead className="text-lightGray border-b border-gray/20">
            <tr>
              <th className="text-left py-3 w-[10%]">Case ID</th>
              <th className="text-left w-[25%]">Title</th>
              <th className="w-[15%]">Status</th>
              <th className="w-[15%]">Priority</th>
              <th className="w-[15%]">Created</th>
              <th className="w-[10%]">Detective</th>
              <th className="w-[10%] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray/10">
              <td className="py-3">C001</td>
              <td>Corporate Fraud Investigation</td>

              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                  In Progress
                </span>
              </td>

              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                  High
                </span>
              </td>

              <td>Jan 15, 2026</td>
              <td>det-1</td>

              <td className="text-center">👁</td>
            </tr>

            <tr>
              <td className="py-3">C002</td>
              <td>Asset Recovery Investigation</td>

              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  Completed
                </span>
              </td>

              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                  Medium
                </span>
              </td>

              <td>Jan 10, 2026</td>
              <td>det-2</td>

              <td className="text-center">👁</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminUserDetailsPage;