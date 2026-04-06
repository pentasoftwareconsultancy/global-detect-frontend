import React from 'react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'Private and Personal Investigation Case Insights',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?q=80&w=2071&auto=format&fit=crop',
      category: 'Latest Post'
    },
    {
      id: 2,
      title: 'Corporate Fraud and Internal Risk Investigations',
      author: 'Jason Francisco',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1454165833767-027ff33027b6?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Comprehensive Background Verification and Screening Processes',
      author: 'Elizabeth Slavin',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Cybercrime and Digital Forensic Investigations',
      author: 'Ernie Smith',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Property Ownership and Asset Verification Investigations',
      author: 'Eric Smith',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Litigation Support and Court Dispute Investigations',
      author: 'Tracey Wilson',
      date: 'August 20, 2022',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <section id="blog" className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24">
    <section className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Blogs</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-xl font-bold mb-6">Latest Post</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-lg font-bold mb-3 group-hover:red transition-colors line-clamp-2">
                {blog.title}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red/20 border border-red flex items-center justify-center text-[10px] font-bold">
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
    </section>
  );
};

export default Blogs;