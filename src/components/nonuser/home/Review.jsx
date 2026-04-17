import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Star } from 'lucide-react';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: '/avtar.png'
    },
    {
      id: 2,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: '/avtar.png'
    },
    {
      id: 3,
      name: 'Jorge Monahan',
      role: 'Background Verification',
      content:
        'Libero suscipit unde. Labore cumque voluptatum accusamus fugiat qui voluptates corporis dignissimos.',
      avatar: '/avtar.png'
    }
  ];

  const loopReviews = [...reviews, ...reviews];

  const ReviewCard = ({ review, mobile }) => (
    <div className={mobile ? "w-[47vw] flex-shrink-0" : "w-[340px] md:w-[380px] flex-shrink-0"}>
      {/* Bubble */}
      <div className={`bg-[#e7dfdb] text-gray-800 rounded-2xl relative mb-4 after:content-[''] after:absolute after:top-full after:border-transparent after:border-t-[#e7dfdb] ${
        mobile
          ? 'p-3 after:left-4 after:border-[8px]'
          : 'p-6 mb-6 after:left-10 after:border-[12px]'
      }`}>
        <p className={mobile ? "text-[10px] leading-relaxed" : "text-sm italic leading-relaxed"}>
          "{review.content}"
        </p>
      </div>

      {/* User */}
      <div className="flex items-center gap-2">
        <img
          src={review.avatar}
          alt={review.name}
          className={mobile ? "w-8 h-8 rounded-full border-2 border-white" : "w-14 h-14 rounded-full border-4 border-white"}
        />
        <div className="flex-1">
          <h4 className={mobile ? "font-semibold text-xs" : "font-semibold text-lg"}>{review.name}</h4>
          <p className={mobile ? "text-[10px] text-gray-400" : "text-sm text-gray-400"}>{review.role}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={mobile ? 9 : 14} className="fill-red-500 text-red-500" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-red-500 whitespace-nowrap">
              <RiVerifiedBadgeFill size={mobile ? 9 : 12} />
              <span className={mobile ? "text-[9px]" : "text-xs"}>Verified user</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#121F27] text-white py-10 md:py-2 overflow-hidden ">
      {/* TITLE */}
      <div className="max-w-8xl mx-auto pt-4 md:pt-14 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Reviews</h2>
      </div>

      {/* MOBILE SLIDER - 2 cards visible at a time */}
      <div className="md:hidden relative overflow-hidden">
        <div className="flex gap-3 animate-slide-mobile pl-4">
          {loopReviews.map((review, index) => (
            <ReviewCard key={index} review={review} mobile={true} />
          ))}
        </div>
      </div>

      {/* DESKTOP SLIDER */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 top-0 h-full w-6 md:w-12 lg:w-20 bg-[#121F27] z-10"></div>
        <div className="flex gap-6 animate-slide pl-6 md:pl-12 lg:pl-20">
          {loopReviews.map((review, index) => (
            <ReviewCard key={index} review={review} mobile={false} />
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

          @keyframes slide-mobile {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide-mobile {
            animation: slide-mobile 8s linear infinite;
          }
          .animate-slide-mobile:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default Review;