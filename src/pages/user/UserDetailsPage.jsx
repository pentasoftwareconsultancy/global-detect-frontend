import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Image, Video, Calendar, User, MapPin } from 'lucide-react';

const UserDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get('caseId') || 'CASE-1001';

  const caseDetails = {
    id: caseId,
    title: 'Background Verification',
    category: 'Background',
    status: 'In Progress',
    progress: 65,
    description: 'Comprehensive background verification investigation for employment purposes. Investigation includes criminal record check, employment history verification, and reference validation.',
    detective: {
      name: 'John Detective',
      id: 'DET-001',
      experience: '10 years'
    },
    timeline: [
      { date: 'Oct 21, 2025', event: 'Evidence gathering phase completed', status: 'completed' },
      { date: 'Oct 16, 2025', event: 'Detective assigned to case', status: 'completed' },
      { date: 'Oct 12, 2025', event: 'Case initiated', status: 'completed' },
      { date: 'Nov 15, 2025', event: 'Final report expected', status: 'pending' }
    ],
    files: [
      { name: 'Surveillance_Photo_01.jpg', type: 'image', size: '2.4 MB', date: 'Oct 21, 2025' },
      { name: 'Property_Records.pdf', type: 'document', size: '1.2 MB', date: 'Oct 16, 2025' },
      { name: 'Interview_Recording_04.mp3', type: 'audio', size: '5.8 MB', date: 'Oct 12, 2025' },
      { name: 'Background_Check.pdf', type: 'document', size: '890 KB', date: 'Oct 10, 2025' }
    ],
    location: 'Downtown Sector, City Center',
    startDate: 'Oct 10, 2025',
    expectedEndDate: 'Nov 15, 2025',
    daysRemaining: 25
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'image': return <Image size={20} className="text-blue-400" />;
      case 'document': return <FileText size={20} className="text-green-400" />;
      case 'audio': return <Video size={20} className="text-purple-400" />;
      default: return <FileText size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10">
  <div className="max-w-6xl mx-auto">

    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 md:mb-8 transition-all text-sm"
    >
      <ArrowLeft size={18} />
      Back to Dashboard
    </button>

    {/* Header */}
    <div className="bg-[#111827] rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 mb-6 md:mb-8">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>
          <span className="inline-block bg-[#D92B3A] text-white px-3 py-1 rounded-md text-[10px] md:text-xs font-semibold mb-2 md:mb-3">
            {caseDetails.category}
          </span>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            {caseDetails.title}
          </h1>

          <p className="text-gray-400 text-xs md:text-sm">
            Case ID:{' '}
            <span className="text-white font-semibold">
              {caseDetails.id}
            </span>
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs md:text-sm text-gray-400 mb-1">Status</p>
          <span className="inline-block bg-yellow-500/20 text-yellow-500 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm">
            {caseDetails.status}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 md:mb-6">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <p className="text-xs md:text-sm text-gray-400">
            Investigation Progress
          </p>
          <p className="text-xs md:text-sm font-semibold">
            {caseDetails.progress}%
          </p>
        </div>

        <div className="w-full h-2.5 md:h-3 bg-[#1a2847] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D92B3A] to-[#ff4757]"
            style={{ width: `${caseDetails.progress}%` }}
          />
        </div>
      </div>

      <p className="text-gray-300 text-sm md:text-base">
        {caseDetails.description}
      </p>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

      {/* Left */}
      <div className="lg:col-span-2 space-y-6 md:space-y-8">

        {/* Timeline */}
        <div className="bg-[#111827] rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
            Investigation Timeline
          </h2>

          <div className="space-y-5 md:space-y-6">
            {caseDetails.timeline.map((item, index) => (
              <div key={index} className="flex gap-3 md:gap-4">

                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                      item.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  />
                  {index < caseDetails.timeline.length - 1 && (
                    <div className="w-[2px] h-10 md:h-12 bg-white/10 my-2" />
                  )}
                </div>

                <div className="flex-1 pb-4 md:pb-6">
                  <p className="text-white font-semibold text-sm md:text-base mb-1">
                    {item.event}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="bg-[#111827] rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
            Attached Files
          </h2>

          <div className="space-y-3">
            {caseDetails.files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-[#0b1120] rounded-lg md:rounded-xl border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-white font-medium text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>

                <button className="self-start sm:self-auto text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6 md:space-y-8">

        {/* Detective */}
        <div className="bg-[#111827] rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/10">
          <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
            Assigned Detective
          </h3>

          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D92B3A] to-[#a0202a] rounded-full flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="font-semibold text-white text-sm md:text-base">
                {caseDetails.detective.name}
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                {caseDetails.detective.id}
              </p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-400">
            Experience:{' '}
            <span className="text-white">
              {caseDetails.detective.experience}
            </span>
          </p>
        </div>

        {/* Case Info */}
        <div className="bg-[#111827] rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/10">
          <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
            Case Information
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs md:text-sm text-gray-400">Location</p>
                <p className="text-white text-sm md:text-base">
                  {caseDetails.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs md:text-sm text-gray-400">Start Date</p>
                <p className="text-white text-sm md:text-base">
                  {caseDetails.startDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs md:text-sm text-gray-400">
                  Expected End Date
                </p>
                <p className="text-white text-sm md:text-base">
                  {caseDetails.expectedEndDate}
                </p>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t border-white/10">
              <p className="text-xs md:text-sm text-gray-400 mb-1">
                Time Remaining
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#D92B3A]">
                {caseDetails.daysRemaining} Days
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default UserDetailsPage;