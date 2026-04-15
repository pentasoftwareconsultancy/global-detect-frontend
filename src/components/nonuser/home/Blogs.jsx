import React from 'react';
import { useNavigate } from "react-router-dom";
import { blogsData } from "../../../data/blogsData";


const Blogs = () => {
  const blogs = blogsData;

  const navigate = useNavigate();

  return (
    <section id="blog" className="bg-[#121F27] text-white pt-25 py-14 px-4 md:px-8 lg:px-20">

      <div className="max-w-8xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h2>

        <p className="text-gray-400 mb-10 max-w-3xl leading-relaxed">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-xl font-semibold mb-8">Latest Post</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {blogs.map((blog) => (
  <div
    key={blog.id}
    onClick={() => navigate(`/blogs/${blog.id}`)}
    className="cursor-pointer"
  >

              <div className="h-[220px] overflow-hidden rounded-m mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-lg font-semibold mb-4 leading-snug ">
                {blog.title}
              </h4>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <img
                  src={blog.profile}
                  alt={blog.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
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
