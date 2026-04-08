import React from 'react';


const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'Private and Personal Investigation Case Insights',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: "/image 11.png"
    },
    {
      id: 2,
      title: 'Corporate Fraud and Internal Risk Investigations',
      author: 'Jason Francisco',
      date: 'August 20, 2022',
      image: "/image 12.png"
    },
    {
      id: 3,
      title: 'Comprehensive Background Verification and Screening Processes',
      author: 'Elizabeth Slavin',
      date: 'August 20, 2022',
      image: "/image 14.png"
    },
    {
      id: 4,
      title: 'Cybercrime and Digital Forensic Investigations',
      author: 'Ernie Smith',
      date: 'August 20, 2022',
      image: "/image 10.png"
    },
    {
      id: 5,
      title: 'Property Ownership and Asset Verification Investigations',
      author: 'Eric Smith',
      date: 'August 20, 2022',
      image: "/image 9.png"
    },
    {
      id: 6,
      title: 'Litigation Support and Court Dispute Investigations',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: "/image 15.png"
    }
  ];

  return (
    <section id="blog" className="bg-[#0b1120] text-white py-20 px-4 md:px-8 lg:px-16">
      
      <div className="max-w-7xl mx-auto">
        
        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h2>

        <p className="text-gray-400 mb-14 max-w-3xl leading-relaxed">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-xl font-semibold mb-8">Latest Post</h3>
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {blogs.map((blog) => (
            <div key={blog.id} className="group cursor-pointer">
              
              {/* IMAGE */}
              <div className="relative h-[220px] overflow-hidden rounded-xl mb-5">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* TITLE */}
              <h4 className="text-lg font-semibold mb-3 group-hover:text-red-500 transition-colors leading-snug">
                {blog.title}
              </h4>

              {/* AUTHOR */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-xs font-bold">
                  {blog.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{blog.author}</p>
                  <p className="text-xs text-gray-500">{blog.date}</p>
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