import React from "react";

const detectives = [
  {
    name: "Emma Watson",
    role: "Corporate Fraud",
    email: "e.watson@detectiveagency.com",
    location: "New York",
    status: "On Case",
  },
  {
    name: "James Bond",
    role: "Personal Investigation",
    email: "j.bond@detectiveagency.com",
    location: "Los Angeles",
    status: "On Case",
  },
  {
    name: "Olivia Martinez",
    role: "Missing Persons",
    email: "o.martinez@detectiveagency.com",
    location: "Chicago",
    status: "Available",
  },
];

const StatusBadge = ({ status }) => {
  const styles =
    status === "On Case"
      ? "bg-blue-500/20 text-blue-400"
      : status === "Available"
      ? "bg-green-500/20 text-green-400"
      : "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles}`}>
      {status}
    </span>
  );
};

const Card = ({ d }) => (
  <div className="bg-[#0E1F2B] p-4 rounded-xl w-full">
    <div className="flex justify-between items-center mb-2">
      <p className="font-medium text-sm sm:text-base">{d.name}</p>
      <StatusBadge status={d.status} />
    </div>

    <p className="text-xs lightGray mb-2">{d.role}</p>
    <p className="text-xs lightGray mb-1 break-all">{d.email}</p>
    <p className="text-xs lightGray mb-3">{d.location}</p>

    <div className="flex justify-between text-xs">
      <span className="lightGray">Active Cases</span>
      <span>2</span>
    </div>

    <button className="mt-3 w-full text-xs border border-gray rounded-lg py-1 hover:bg-gray/20">
      View Profile
    </button>
  </div>
);

const AdminDetectiveManagementOnCasePage = () => {
  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-base sm:text-lg font-semibold">Detective Tracking</h1>
        <p className="text-xs lightGray">
          Real-time location tracking and status monitoring
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <input
          placeholder="Search by name, email, or phone..."
          className="bg-[#0E1F2B] px-4 py-2 rounded-lg text-sm w-full max-w-md outline-none"
        />

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          <button className="px-3 py-1 text-xs bg-red text-white rounded whitespace-nowrap">
            All
          </button>
          <button className="px-3 py-1 text-xs bg-[#132735] rounded whitespace-nowrap">
            Active
          </button>
          <button className="px-3 py-1 text-xs bg-[#132735] rounded whitespace-nowrap">
            On Field
          </button>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-[#0E1F2B] rounded-xl p-3 mb-6">
        <p className="text-xs lightGray mb-2">Live Map Tracking</p>

        <div className="h-[200px] sm:h-[300px] bg-[#132735] rounded-lg flex items-center justify-center text-lightGray text-center px-2">
          Map Integration (Google Maps later)
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {detectives.map((d, i) => (
          <Card key={i} d={d} />
        ))}
      </div>

    </div>
  );
};

export default AdminDetectiveManagementOnCasePage;
