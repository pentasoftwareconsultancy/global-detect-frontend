

// /////////////////////////////////////////////////////////////////////////////


import React from "react";
import { ArrowLeft, Download, Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";

const CaseDetails = () => {
  return (
    <div className=" text-white montserrat">

      {/* Back */}
      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </div>

      {/* Title */}
      <h1 className="text-base md:text-lg font-semibold mb-2">
        Background verification Investigation - Case ID - SCV2667
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-red-500 text-xs px-3 py-1 rounded-full">
          High Priority
        </span>
        <span className="bg-gray-600 text-xs px-3 py-1 rounded-full">
          Report Ready
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">

          {/* Case Description */}
          <div className="bg-[#14232d] p-4 rounded-lg">
            <h2 className="text-sm font-semibold mb-2">Case Description</h2>
            <p className="text-xs text-gray-300">
              Locate and recover stolen assets including jewelry and documents.
              Last known location: downtown warehouse district.
            </p>
          </div>

          {/* Case Documents */}
          <div className="bg-[#14232d] p-4 rounded-lg">
            <h2 className="text-sm font-semibold mb-2">Case Documents</h2>
            <p className="text-xs text-gray-400 mb-2">1 file attached</p>

            <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">
              <div>
                <p className="text-sm">Asset_List.pdf</p>
                <p className="text-xs text-gray-400">Updated: 11/12/2026</p>
              </div>
              <Download size={16} />
            </div>
          </div>

          {/* Detective Status */}
          <div className="bg-[#14232d] p-4 rounded-lg">
            <h2 className="text-sm font-semibold mb-2">Detective Status</h2>
            <p className="text-xs text-gray-300">Assigned</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#14232d] p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-4">Case Summary</h2>

          <div className="space-y-3 text-xs text-gray-300">

            <p>
              <strong>Case Number:</strong><br />
              #SC002
            </p>

            <p>
              <strong>Client:</strong><br />
              Sarah Johnson
            </p>

            <p>
              <strong>Created:</strong><br />
              1/20/2026
            </p>

            <p>
              <strong>Investigation Type:</strong><br />
              Background Check
            </p>

          </div>
        </div>
      </div>

      {/* FINAL REPORT */}
      <div className="mt-6 border border-red-500 rounded-lg p-4 bg-[#14232d] relative">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold">Final Report</h2>
          <button className="flex items-center gap-2 bg-red-500 text-xs px-3 py-1 rounded w-fit">
            <Download size={14} />
            Download report
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-2">Generated on 1/30/2026</p>
        <h3 className="text-sm font-semibold mb-2">Summary</h3>
        <p className="text-sm mb-4">
          All assets successfully recovered and documented. Case closed with positive outcome.
        </p>

        <hr className="border-t border-gray-600 my-4" />


        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Key Findings</h3>
          <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
            <li>Assets located in storage unit 547</li>
            <li>All items accounted</li>
            <li>Items returned to client</li>
            <li>No criminal charges filed</li>
          </ul>
        </div>

        <hr className="border-t border-gray-600 my-4" />


        {/* Files */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Report Documents</h2>
          <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">
            <p className="text-sm">Final_Report.pdf</p>
            <button className="bg-red-500 text-xs px-2 py-1 rounded flex items-center gap-1">
              <Download size={12} />
              Download
            </button>
          </div>

          <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">
            <p className="text-sm">Evidence_Photos.zip</p>
            <button className="bg-red-500 text-xs px-2 py-1 rounded flex items-center gap-1">
              <Download size={12} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* ================= NEW SECTION ================= */}

      <div className="mt-8 space-y-4">

        <h2 className="text-sm font-semibold">Provided Information</h2>

        {/* Contact Info */}
        <div className="bg-[#14232d] p-4 rounded-lg">
          <h3 className="text-xs font-semibold mb-3 text-gray-300">
            Contact Information
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Client details from investigation request
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">

            <div>
              <p className="text-gray-400">Full Name</p>
              <p>Sarah Johnson</p>
            </div>

            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <Mail size={12} /> Email
              </p>
              <p>sarah@gmail.com</p>
            </div>

            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <Phone size={12} /> Phone
              </p>
              <p>+1 555 0102</p>
            </div>

            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <MapPin size={12} /> Address
              </p>
              <p>456 Elm St, Los Angeles</p>
            </div>
          </div>
        </div>

        {/* Investigation Details */}
        <div className="bg-[#14232d] p-4 rounded-lg">
          <h3 className="text-xs font-semibold mb-3 text-gray-300">
            Investigation Details
          </h3>

          <div className="text-xs space-y-3">
            <p className="text-sm text-gray-400 mb-4">
              Type and specifics of the investigation
            </p>

            <div>
              <p className="text-gray-400 py-2 ">Investigation Type</p>
              <p className="border border-white/20 rounded-full px-4 py-1 text-sm w-fit">
                Background Check
              </p>
              <hr className="border-white/10 my-4" />

            </div>
            <p className="text-gray-400 py-2 ">Incident Details</p>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <div>
                <p className="text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> Date
                </p>
                <p>01/20/2026</p>
              </div>

              <div>
                <p className="text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> Time
                </p>
                <p>14:30</p>
              </div>


            </div>

            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <MapPin size={12} /> Location
              </p>
              <p>Los Angeles</p>
            </div>

            <div>
              <p className="text-gray-400 flex items-center gap-1">
                Description                </p>
              <p>Comprehensive background investigation needed before entering into business partnership.</p>
            </div>

            <hr className="border-white/10 my-4" />


            <div>
              <p className="text-gray-400 flex items-center gap-1">
                Additional Information
              </p>
              <p>Check financial history, criminal records, and business associations.</p>
            </div>



          </div>


        </div>

        {/* Case Documents */}
        <div className="bg-[#14232d] p-4 rounded-lg">
          <h3 className="text-xs font-semibold mb-3 text-gray-300">
            Case Documents
          </h3>

          <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">
            <p className="text-sm">Subject_Info.pdf</p>
            <Download size={16} />
          </div>
        </div>

        {/* Legal Consent */}
        <div className="bg-[#14232d] p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div>
            <h3 className="text-xs font-semibold text-gray-300">
              Legal Consent
            </h3>
            <p className="text-xs text-gray-400">
              Client has provided legal consent for investigation
            </p>
          </div>

          <span className="bg-red-500 text-xs px-3 py-1 rounded w-fit">
            Consent Given
          </span>
        </div>

      </div>
    </div>
  );
};

export default CaseDetails;