import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { ROUTES } from "../../core/constants/routes.constant.jsx";
import { FaRegClock } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";

import blog from "../../assets/blog.png";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";

const UserBlogDetailPage = () => {
  const navigator = useNavigate();
  return (
<div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white py-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">      {/* Back Button */}
      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6" onClick={() => navigator(ROUTES.HOME)}>
        <FaArrowLeft /> Back to Blogs
      </button>

      {/* Title */}
      <div className="mb-6">
        <span className="bg-red-500 text-xs px-3 py-1 rounded-full">
          Personal Investigation
        </span>

        <h1 className="text-3xl font-bold mt-3">
          Matrimonial Investigations
        </h1>

        <p className="text-gray-400 mt-2 max-w-2xl">
          Understanding the complexities of modern relationships and background verification
        </p>

       
      {/* Meta Info */}
<div className="mt-6">

  <div className="flex items-center justify-between text-sm text-gray-400">

    {/* Left Side */}
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">

      <div className="flex items-center gap-2 whitespace-nowrap">
        <CiCalendar />
        <span>February 20, 2024</span>
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <BsPerson />
        <span>Priya Sharma</span>
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <FaRegClock />
        <span>5 min read</span>
      </div>

    </div>

    {/* Share Button */}
    <button className="flex items-center gap-2 bg-[#1e293b] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#334155] transition whitespace-nowrap">
      <FaShareAlt />
      <span className="hidden sm:inline">Share</span>
    </button>

  </div>

  {/* Divider Line */}
  <div className="mt-4 border-t border-gray-700/50"></div>

</div>
      </div>

      {/* Blog Image */}
      <div className="rounded-xl overflow-hidden mb-6">
        <img
          src={blog}
          alt="blog"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 leading-relaxed">

        <p>
          Matrimonial investigations are sensitive matters that require discretion,
          professionalism, and ethical conduct. Whether conducted before or during marriage,
          these investigations help individuals make informed decisions.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Pre-Matrimonial Investigations
          </h2>
          <p>
            Before entering into marriage, verifying background information, such as employment,
            financial stability, past relationships, and family history, helps reduce risks.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Post-Matrimonial Investigations
          </h2>
          <p>
            During marriage, issues such as infidelity, financial disputes, or hidden secrets
            may arise. Professional investigators help uncover the truth.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Legal and Ethical Framework
          </h2>
          <p>
            Investigations must comply with legal boundaries, respecting privacy laws and ethical standards.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Discretion and Confidentiality
          </h2>
          <p>
            Professional investigators maintain strict confidentiality and ensure sensitive
            information is protected.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            What to Expect
          </h2>
          <p>
            A professional investigation includes surveillance, background checks, and detailed reporting.
          </p>
        </div>

        {/* Conclusion Box */}
       {/* Conclusion Box */}
<div className="relative bg-[#1e293b]/80 p-6 rounded-xl border border-gray-700/50 overflow-hidden">

  {/* Left Red Line */}
  <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-red-500 rounded-full"></div>

  {/* Content */}
  <div className="pl-4">
    <h3 className="text-white font-semibold mb-2 text-lg">
      Conclusion
    </h3>

    <p className="text-gray-300 leading-relaxed">
      Matrimonial investigations serve an important purpose in helping individuals make informed
      decisions about their relationships. When conducted professionally and ethically, they provide
      valuable insights while respecting the dignity and privacy of all involved parties.
    </p>
  </div>

</div>
      </div>

      {/* CTA */}
      <div className="mt-10 bg-red-500 text-center py-6 rounded-xl">
        <h2 className="text-lg font-semibold">
          Need Professional Investigation Services?
        </h2>
        <p className="text-sm mt-2">
          Contact us today for confidential consultation
        </p>

        <button className="mt-5 bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
          Request Investigation
        </button>
      </div>

      {/* Related Articles */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-6">Related Articles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img
              src={blog1}
              alt="Digital Forensics"
              className="h-60 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">March 15, 2024</p>
              <h3 className="text-sm font-semibold text-white leading-snug">
                Understanding Digital Forensics
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img
              src={blog2}
              alt="Corporate Verification"
              className="h-60 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">March 10, 2024</p>
              <h3 className="text-sm font-semibold text-white leading-snug">
                Corporate Background Verification
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img
              src={blog3}
              alt="Fraud Investigation"
              className="h-60 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">March 5, 2024</p>
              <h3 className="text-sm font-semibold text-white leading-snug">
                Online Fraud Investigation Tips
              </h3>
            </div>
          </div>

        </div>
      </div>
</div>
    </div>
  );
};

export default UserBlogDetailPage;