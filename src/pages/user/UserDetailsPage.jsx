
import React from "react";
import { ROUTES } from "../../core/constants/routes.constant";
import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {authService} from '../../core/services/auth.service'; // adjust path



import { ArrowLeft, Download, Mail, Phone, MapPin, Clock, Calendar, FileText, User, Copy, FileSearch, CheckCircle } from "lucide-react";

const CaseDetails = () => {
  const { id } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!id) {
        console.error('No case ID provided');
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getCaseDetails(id);
        setCaseData(res.data);
      } catch (err) {
        console.error('Error fetching case details:', err);
        setCaseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!caseData) return <p>Case not found or failed to load.</p>;


  return (
    <div className="text-white montserrat w-full max-w-full overflow-x-hidden px-4 md:px-0">
      <div className="bg-[#14232d] p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-4 cursor-pointer">
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </div>

        {/* Title */}
     <h1 className="text-base md:text-lg font-semibold mb-2 break-words">
  {caseData
    ? `${caseData.title} - Case ID - ${caseData.caseId}`
    : "Loading case details..."}
</h1> 
        

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3 mb-6">

          <span className="bg-red-500 text-sm px-3 py-1 rounded-lg whitespace-nowrap">
            High Priority
          </span>

          <span className="bg-gray-600 text-sm px-3 py-1 rounded-lg whitespace-nowrap">
            Report Ready
          </span>

        </div>
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

            <div className="flex justify-between items-center border border-gray-600 p-3 rounded-md">

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-400" />

                <div>
                  <p className="text-sm text-white">Asset_List.pdf</p>
                  <p className="text-xs text-gray-400">Updated: 11/12/2026</p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <Download size={16} className="text-gray-400 cursor-pointer" />

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

          <div className="space-y-4 text-xs text-gray-300">

            {/* Case Number */}
         <div className="flex items-start gap-2">
  <FileText className="w-4 h-4 mt-0.5 text-gray-400" />

  <p>
    <strong>Case Number:</strong><br />
    <span>#{caseData?.caseNumber || "N/A"}</span>
  </p>
</div>
            <div className="border-b border-gray-600 mt-3"></div>

            {/* Client */}
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-0.5 text-gray-400" />
              <p>
                <strong>Client:</strong><br />
                Sarah Johnson
              </p>
            </div>

            <div className="border-b border-gray-600 mt-3"></div>

            {/* Created */}
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
              <p>
                <strong>Created:</strong><br />
                1/20/2026
              </p>
            </div>
            <div className="border-b border-gray-600 mt-3"></div>

            {/* Investigation Type */}
            <div className="flex items-start gap-2">
              <FileSearch size={18} className="text-gray-400" />
              <div>
                <strong>Investigation Type:</strong><br />
                <span>{caseData?.investigationType}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FINAL REPORT */}
      <div className="mt-6 border border-red-500 rounded-lg p-4 bg-[#14232d] relative">


        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">

          {/* LEFT SIDE (Icon + Title) */}
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-red-500" />
            <h2 className="text-sm font-semibold text-white">Final Report</h2>
          </div>

          {/* RIGHT SIDE (Button) */}
          <button className="flex items-center gap-2 bg-red-500 text-s px-3 py-1 rounded w-fit">
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
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-red-500 mt-0.5" />
              Assets located in storage unit 547
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-red-500 mt-0.5" />
              All items accounted
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-red-500 mt-0.5" />
              Items returned to client
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-red-500 mt-0.5" />
              No criminal charges filed
            </li>
          </ul>
        </div>

        <hr className="border-t border-gray-600 my-4" />


        {/* Files */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Report Documents</h2>
          <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-red-500" />

              <div>
                <p className="text-sm text-white">Final_Report.pdf</p>
                <p className="text-xs text-gray-400">PDF</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <button className="bg-red-500 text-s px-2 py-1 rounded flex items-center gap-1">
              <Download size={12} />
              Download
            </button>

          </div>

          <div className="flex justify-between items-center bg-[#0f1c24] p-3 rounded-md">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-red-500" />

              <div>
                <p className="text-sm text-white">Evidence_Photos.zip</p>
                <p className="text-xs text-gray-400">ZIP</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <button className="bg-red-500 text-s px-2 py-1 rounded flex items-center gap-1">
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
             <p>{caseData?.clientName}</p> 
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
          <div className="flex items-center gap-2 mb-3">
            <FileSearch size={17} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-300">
              Investigation Details
            </h3>
          </div>


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
               <p>{caseData?.createdAt}</p>
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
              <p className="text-gray-400 flex items-center gap-1 text-sm">
                Description
              </p>
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

          <p className="text-xs text-gray-400 mb-3">1 file(s) attached</p>

          <div className="flex items-center gap-3 bg-[#0f1c24] p-3 rounded-md border border-white/10">

            {/* ICON */}
            <FileText size={18} className="text-gray-400" />

            {/* TEXT */}
            <div>
              <p className="text-sm text-white">Subject_Info.pdf</p>
              <p className="text-xs text-gray-400">Uploaded: 1/20/2026</p>
            </div>

          </div>

        </div>

        {/* Legal Consent */}
        <div className="bg-[#14232d] p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3">

          {/* LEFT SIDE */}
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-red-500 mt-0.5" />

            <div>
              <h3 className="text-sm font-Arial text-gray-300">
                Legal Consent
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <span className="bg-red-500 text-10 px px px-2 py-0.5 rounded">
                  Consent Given
                </span>

                <p className="text-xs text-gray-400">
                  Client has provided legal consent for investigation
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CaseDetails;