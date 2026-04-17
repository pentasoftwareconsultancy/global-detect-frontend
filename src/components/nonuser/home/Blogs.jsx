import React from 'react';
import { useNavigate } from "react-router-dom";
import { blogsData } from "../../../data/blogsData";

const Blogs = () => {
  const blogs = blogsData;
  const navigate = useNavigate();

  return (
    <section id="blog" className="bg-[#121F27] text-white pt-8 lg:pt-25 pb-2 lg:py-14 px-4 md:px-8 lg:px-20">

      <div className="max-w-8xl mx-auto">

        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 lg:mb-4">Blogs</h2>

        <p className="text-gray-400 mb-6 lg:mb-10 max-w-3xl leading-relaxed text-xs sm:text-sm lg:text-base">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-6 lg:mb-8">Latest Post</h3>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.id}`)}
              className="cursor-pointer"
            >

              <div className="h-[160px] lg:h-[220px] overflow-hidden rounded-m mb-3 lg:mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-sm lg:text-lg font-semibold mb-3 lg:mb-4 leading-snug">
                {blog.title}
              </h4>

              <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-gray-400">
                <img
                  src={blog.profile}
                  alt={blog.author}
                  className="w-6 lg:w-8 h-6 lg:h-8 rounded-full object-cover"
                />
                <div className="flex items-center gap-2 lg:gap-3">
                  <p className="text-white font-medium pr-1 lg:pr-2">{blog.author}</p>
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