import React, { useState } from 'react';
import { Plus, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  
  const savedCases = JSON.parse(localStorage.getItem('userCases') || '[]');

  const defaultCases = [
    {
      id: 'CASE-1001',
      title: 'Background verification',
      category: 'Background',
      progress: 100,
      status: 'Evidence gathering phase in downtown sector',
      daysRemaining: '34 Days',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      files: [
        { name: 'Surveillance_Photo_01.jpg', date: 'Oct 21, 2025 | 2:34 PM' },
        { name: 'Property_Records.pdf', date: 'Oct 16, 2025 | 11:03' },
        { name: 'Interview_Recording_04.mp3', date: 'Oct 12, 2025 | 8:59 AM' }
      ]
    },
    {
      id: 'CASE-1002',
      title: 'Whispering Hall',
      category: 'Surveillance',
      progress: 20,
      status: 'Preliminary background checks initiated',
      daysRemaining: '8 Days',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      files: [
        { name: 'Surveillance_Photo_01.jpg', date: 'Oct 21, 2025 | 2:34 PM' },
        { name: 'Property_Records.pdf', date: 'Oct 16, 2025 | 11:03' }
      ]
    },
    {
      id: 'CASE-1003',
      title: 'Background verification',
      category: 'Background',
      progress: 65,
      status: 'Evidence gathering phase in downtown sector',
      daysRemaining: '34 Days',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      files: [
        { name: 'Surveillance_Photo_01.jpg', date: 'Oct 21, 2025 | 2:34 PM' },
        { name: 'Property_Records.pdf', date: 'Oct 16, 2025 | 11:03' },
        { name: 'Interview_Recording_04.mp3', date: 'Oct 12, 2025 | 8:59 AM' }
      ]
    },
    {
      id: 'CASE-1004',
      title: 'Whispering Hall',
      category: 'Surveillance',
      progress: 20,
      status: 'Preliminary background checks initiated',
      daysRemaining: '8 Days',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      files: [
        { name: 'Surveillance_Photo_01.jpg', date: 'Oct 21, 2025 | 2:34 PM' },
        { name: 'Property_Records.pdf', date: 'Oct 16, 2025 | 11:03' }
      ]
    }
  ];
  
  const [investigations] = useState([...savedCases, ...defaultCases]);
  const activeCount = investigations.filter(inv => inv.progress < 100).length;
  const totalCount = investigations.length;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          
          <div className="bg-gradient-to-br from-[#1a2847] to-[#111827] rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/10">
            <p className="text-gray-400 text-xs md:text-sm mb-1">Active Investigations</p>
            <p className="text-3xl md:text-5xl font-bold">{activeCount}</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a2847] to-[#111827] rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/10">
            <p className="text-gray-400 text-xs md:text-sm mb-1">Total Investigations</p>
            <p className="text-3xl md:text-5xl font-bold">{totalCount}</p>
          </div>

          <div
            className="bg-gradient-to-br from-[#D92B3A] to-[#a0202a] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
          >
            <Plus size={36} className="mb-2" />
            <p className="font-bold text-center text-sm md:text-base">
              Request Investigation
            </p>
            <p className="text-xs text-white/80 text-center mt-1">
              Request a new investigation now
            </p>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
          Active Investigations
        </h2>

        {/* Cards */}
        <div className="space-y-6 md:space-y-8">
          {investigations.map((investigation) => (
            <div
              key={investigation.id}
              className="bg-[#111827] rounded-xl md:rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">

                {/* Image */}
                <div className="md:col-span-1">
                  <img
                    src={investigation.image}
                    alt={investigation.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg md:rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-3 flex flex-col justify-between">

                  {/* Top */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    
                    <div>
                      <span className="inline-block bg-[#D92B3A] px-3 py-1 rounded-md text-[10px] md:text-xs font-semibold mb-2">
                        {investigation.category}
                      </span>

                      <h3 className="text-lg md:text-xl font-bold mb-1">
                        {investigation.title}
                      </h3>

                      <p className="text-gray-400 text-xs md:text-sm">
                        Case ID:{' '}
                        <span className="text-white font-semibold">
                          {investigation.id}
                        </span>
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-gray-400">Time Remaining</p>
                      <p className="font-bold text-sm md:text-base">
                        {investigation.daysRemaining}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <p className="text-xs md:text-sm text-gray-400 mb-1">
                      Investigation Progress
                    </p>
                    <div className="w-full h-2 bg-[#1a2847] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D92B3A] to-[#ff4757]"
                        style={{ width: `${investigation.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                      {investigation.progress}%
                    </p>
                  </div>

                  {/* Status */}
                  <p className="text-gray-300 text-xs md:text-sm mb-4">
                    <span className="text-gray-400">Status:</span>{' '}
                    {investigation.status}
                  </p>

                  {/* Bottom */}
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">

                    <button
                      onClick={() =>
                        navigate(
                          `${ROUTES.USER_DASHBOARD_DETAILS}?caseId=${investigation.id}`
                        )
                      }
                      className="bg-[#D92B3A] hover:bg-[#b0202a] px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      <Eye size={14} />
                      View Full Case
                    </button>

                    <div className="flex-1">
                      <p className="text-[10px] md:text-xs text-gray-400 mb-1">
                        Attached Files
                      </p>

                      <div className="space-y-1">
                        {investigation.files.slice(0, 3).map((file, idx) => (
                          <div
                            key={idx}
                            className="flex flex-wrap items-center gap-2 text-gray-300 text-[10px] md:text-xs"
                          >
                            <FileText size={12} />
                            <span>{file.name}</span>
                            <span className="text-gray-500">
                              {file.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserDashboardPage;