import React from 'react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'Private and Personal Investigation Case Insights',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: "/image 11.png",
      profile: "/profile1.png"
    },
    {
      id: 2,
      title: 'Corporate Fraud and Internal Risk Investigations',
      author: 'Jason Francisco',
      date: 'August 20, 2022',
      image: "/image 12.png",
      profile: "/profile2.png"
    },
    {
      id: 3,
      title: 'Comprehensive Background Verification and Screening Processes',
      author: 'Elizabeth Slavin',
      date: 'August 20, 2022',
      image: "/image 14.png",
      profile: "/profile3.png"
    },
    {
      id: 4,
      title: 'Cybercrime and Digital Forensic Investigations',
      author: 'Ernie Smith',
      date: 'August 20, 2022',
      image: "/image 10.png",
      profile: "/profile4.png"
    },
    {
      id: 5,
      title: 'Property Ownership and Asset Verification Investigations',
      author: 'Eric Smith',
      date: 'August 20, 2022',
      image: "/image 9.png",
      profile: "/profile5.png"
    },
    {
      id: 6,
      title: 'Litigation Support and Court Dispute Investigations',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: "/image 15.png",
      profile: "/profile1.png"
    },
    {
      id: 7,
      title: 'OSINT Based Intelligence and Online Investigations',
      author: 'Jason Francisco',
      date: 'August 20, 2022',
      image: "/image 16.png",
      profile: "/profile2.png"
    },
    {
      id: 8,
      title: 'Field Surveillance and On-Ground Verification Operations',
      author: 'Elizabeth Slavin',
      date: 'August 20, 2022',
      image: "/image 17.png",
      profile: "/profile3.png"
    },
    {
      id: 9,
      title: 'Security Threat Analysis and Risk Assessment Investigations',
      author: 'Ernie Smith',
      date: 'August 20, 2022',
      image: "/image 18.png",
      profile: "/profile4.png"
    }

  ];

  return (
    <section className="bg-[#121F27] text-white py-20 px-4 md:px-8 lg:px-20">

      <div className="max-w-8xl mx-auto">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h2>

        <p className="text-gray-400 mb-10 max-w-3xl leading-relaxed">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-xl font-semibold mb-8">Latest Post</h3>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {blogs.map((blog) => (
            <div key={blog.id}>

              {/* IMAGE */}
              <div className="h-[220px] overflow-hidden rounded-m mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-lg font-semibold mb-4 leading-snug h-[3.6rem] overflow-hidden">
                {blog.title}
              </h4>

              {/* AUTHOR ROW */}
              <div className="flex items-center gap-3 text-sm text-gray-400">

                {/* PROFILE IMAGE */}
                <img
                  src={blog.profile}
                  alt={blog.author}
                  className="w-8 h-8 rounded-full object-cover"
                />

                {/* NAME + DATE SAME ROW */}
                <div className="flex items-center gap-3">
                  <p className="text-white font-medium pr-2">{blog.author}</p>
                  
                  <p className="text-gray-500">{blog.date}</p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Blogs;