import React, { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../core/services/auth.service";

const Blogs = () => {
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (hasFetched.current) return; //  stops 2nd call
    hasFetched.current = true;
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const res = await authService.getPublishedBlogs();
        console.log("BLOG API:", res);

        const data = res?.data?.data?.blogs || [];
        setBlogs(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Blog API Error:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-white">Loading blogs...</p>;
  }

  return (
    <section id="blog" className="bg-[#121F27] text-white pt-8 lg:pt-25 pb-2 lg:py-14 px-4 md:px-8 lg:px-20">
      <div className="max-w-8xl mx-auto">

        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 lg:mb-4">Blogs</h2>

        <p className="text-gray-400 mb-6 lg:mb-10 max-w-3xl leading-relaxed text-xs sm:text-sm lg:text-base">
          Explore expert insights, industry updates, and ethical perspectives on investigations, security, and intelligence. Our blog is designed to inform, educate, and help you make confident decisions—while maintaining complete confidentiality and professional integrity.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-6 lg:mb-8">Latest Post</h3>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">

          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={blog.id || index}
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="cursor-pointer"
              >

                {/* Image */}
                <div className="h-[160px] lg:h-[220px] overflow-hidden rounded-m mb-3 lg:mb-4">

                  <img
                    src={blog.featured_image}
                    alt={blog.title || "Blog image"}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                {/* Title */}
                <h4 className="text-sm lg:text-lg font-semibold mb-3 lg:mb-4 leading-snug">
                  {blog.title}
                </h4>

                {/* Author + Date */}
                <div className="flex items-center gap-2 text-xs text-gray-400">

                  <img
                    src={blog.author?.avatar || undefined}
                    alt={blog.author?.name || "Author"}
                    className="w-6 h-6 rounded-full"
                  />

                  <span className="text-white">
                    {blog.author?.name || "Unknown"}
                  </span>

                  <span>
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      : blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        : ""}
                  </span>

                </div>

              </div>
            ))
          ) : (
            <p className="text-gray-400">No blogs available</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Blogs;