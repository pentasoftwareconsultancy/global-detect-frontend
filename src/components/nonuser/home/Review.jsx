import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Star, CheckCircle } from 'lucide-react';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: 'https://i.pravatar.cc/150?u=jorge'
    },
    {
      id: 2,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: 'https://i.pravatar.cc/150?u=mona'
    },
    {
      id: 3,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: 'https://i.pravatar.cc/150?u=jorge2'
    }
  ];

  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="bg-[#121F27] text-white py-10 md:py-2 overflow-hidden">
      {/* TITLE (WITH PADDING) */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Reviews
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative">

        {/* LEFT MASK (this hides slider inside padding area) */}
        <div className="absolute left-0 top-0 h-full w-6 md:w-12 lg:w-20 bg-[#121F27] z-10"></div>
        {/* TRACK */}
        <div className="flex gap-6 animate-slide pl-6 md:pl-12 lg:pl-20">
          {loopReviews.map((review, index) => (
            <div
              key={index}
              className="w-[340px] md:w-[380px] flex-shrink-0"
            >
              {/* Bubble */}
              <div className="bg-[#e7dfdb] text-gray-800 p-6 rounded-2xl relative mb-6 after:content-[''] after:absolute after:top-full after:left-10 after:border-[12px] after:border-transparent after:border-t-[#e7dfdb]">
                <p className="text-sm italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full border-4 border-white-500"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.role}</p>

                  {/* ⭐ + VERIFIED SAME ROW */}
                  <div className="flex items-center justify-between mt-1">

                    {/* STARS */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-red-500 text-red-500" />
                      ))}
                    </div>

                    {/* VERIFIED */}
                    <div className="flex items-center gap-1 text-red-500 text-xs whitespace-nowrap ">
                      <RiVerifiedBadgeFill  />
                      Verified user
                    </div>

                  </div>
                </div>



              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-slide {
            animation: slide 8s linear infinite;
          }

          .animate-slide:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default Review;