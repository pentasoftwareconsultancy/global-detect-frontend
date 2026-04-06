import React from 'react';
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

  // duplicate for infinite loop
  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Reviews</h2>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-slide">

            {loopReviews.map((review, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-shrink-0"
              >
                {/* Bubble */}
                <div className="bg-white text-gray-800 p-6 rounded-2xl relative mb-6 after:content-[''] after:absolute after:top-full after:left-10 after:border-[12px] after:border-transparent after:border-t-white">
                  <p className="text-sm italic leading-relaxed">
                    "{review.content}"
                  </p>
                </div>

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full border-2 border-red-500"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold text-base">{review.name}</h4>
                    <p className="text-xs text-gray-400 mb-1">{review.role}</p>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-red-500 text-red-500" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded text-[10px] text-red-500 font-medium border border-red-500/20">
                    <CheckCircle size={10} />
                    Verified
                  </div>
                </div>
              </div>
            ))}

          </div>
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
            animation: slide 5s linear infinite;
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