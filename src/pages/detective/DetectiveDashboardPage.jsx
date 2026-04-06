import React, { useState } from 'react';
import { MapPin, Search, Filter, FileText } from 'lucide-react';

const DetectiveDashboardPage = () => {
  const [cases] = useState([
    {
      id: 1,
      title: 'Corporate Embezzlement Investigation',
      description: 'Suspected financial irregularities in company accounts. Need thorough investigation of transactions from the past 6 months.',
      client: 'John Smith',
      status: 'Insights Submitted',
      adminFeedback: 'Admin Feedback',
      feedbackStatus: 'Active',
      progress: 45,
      type: 'urgent'
    },
    {
      id: 2,
      title: 'Asset Recovery Investigation',
      description: 'Locate and recover stolen assets including jewelry and documents. Last known location: downtown warehouse district.',
      client: 'John Smith',
      status: 'Report Ready',
      adminFeedback: '',
      progress: 85,
      type: 'new'
    }
  ]);

  return (
    <div className="bg-[#0b1120] text-white min-h-screen px-4 sm:px-6 md:px-10 lg:px-12 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-[#3a4651] rounded-xl p-4 sm:p-6">
          <p className="text-gray-300 text-xs sm:text-sm mb-2">Total Investigations</p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#dc3545] mb-1">05</p>
        </div>
        <div className="bg-[#3a4651] rounded-xl p-4 sm:p-6">
          <p className="text-gray-300 text-xs sm:text-sm mb-2">Active Investigation</p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#dc3545] mb-1">02</p>
        </div>
        <div className="bg-[#dc3545] rounded-xl p-4 sm:p-6">
          <p className="text-gray-200 text-xs sm:text-sm mb-2">Admin Changes requested</p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1">01</p>
          <p className="text-xs text-gray-200">Require resubmission</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-[#3a4651] rounded-xl p-4 sm:p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={18} className="text-[#dc3545]" />
          <h2 className="text-base sm:text-lg font-semibold text-white">Current Location</h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 mb-4">
          Your real-time location for case tracking
        </p>

        <div className="w-full h-52 sm:h-64 bg-gray-700 rounded-lg overflow-hidden relative">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7589&layer=mapnik"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="Current Location Map"
          />
          <div className="absolute top-3 left-3 bg-white text-black px-2 py-1 rounded text-xs font-medium">+</div>
          <div className="absolute top-10 left-3 bg-white text-black px-2 py-1 rounded text-xs font-medium">-</div>
        </div>

        <p className="text-[10px] sm:text-xs text-gray-400 mt-3">
          Lat: 40.7128 | Lng: -74.0060 | Last updated: 1/1/2025, 10:30:00 AM
        </p>
      </div>

      {/* Assigned Cases */}
      <div className="mb-8">

        {/* HEADER + FILTERS */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Assigned Cases</h2>
            <p className="text-xs sm:text-sm text-gray-400">2 cases assigned</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            {/* SEARCH */}
            <div className="relative w-full sm:w-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#3a4651] border-0 rounded-lg py-2 pl-9 pr-3 text-xs sm:text-sm w-full sm:w-60 md:w-72 focus:outline-none text-white placeholder:text-gray-400"
              />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-2 sm:gap-3">
              <button className="flex items-center gap-2 bg-[#3a4651] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white w-full sm:w-auto justify-center">
                <Filter size={14} />
                All Status
              </button>

              <button className="flex items-center gap-2 bg-[#3a4651] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white w-full sm:w-auto justify-center">
                <Filter size={14} />
                All Priority
              </button>
            </div>

          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-[#3a4651] rounded-xl p-4 sm:p-6">

              <div className="flex items-start justify-between mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-semibold flex-1 text-white">
                  {caseItem.title}
                </h3>

                <span className="px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold bg-[#dc3545] text-white whitespace-nowrap">
                  {caseItem.type}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 mb-5 leading-relaxed">
                {caseItem.description}
              </p>

              <div className="space-y-2 sm:space-y-3 mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Client:</span>
                  <span className="text-white font-medium">{caseItem.client}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white font-medium">{caseItem.status}</span>
                </div>

                {caseItem.adminFeedback && (
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">{caseItem.adminFeedback}:</span>
                    <span className="text-[#dc3545] font-medium">{caseItem.feedbackStatus}</span>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <div className="w-full h-2 bg-[#2a3441] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#dc3545] rounded-full transition-all duration-300"
                    style={{ width: `${caseItem.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full bg-[#2a3441] hover:bg-[#1e2329] text-white py-2.5 sm:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-gray-600 text-sm">
                <FileText size={14} />
                View Details
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetectiveDashboardPage;