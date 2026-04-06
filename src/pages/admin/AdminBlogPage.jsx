import React from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "The Essential Guide to Private Investigation Services",
    desc: "Learn about the different types of private investigation services and when you might need them.",
    date: "2/1/2026",
    author: "Admin User",
    category: "Industry Insights",
    views: "1,247",
    tags: ["Investigation", "Services", "Guide"],
    status: "published",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
  {
    id: 2,
    title: "How Background Checks Can Protect Your Business",
    desc: "Discover how comprehensive background checks can safeguard your company from potential risks.",
    date: "1/25/2026",
    author: "Admin User",
    category: "Business Security",
    views: "892",
    tags: ["Background Check", "Business", "Security"],
    status: "published",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  },
  {
    id: 3,
    title: "Understanding Digital Forensics in Modern Investigations",
    desc: "An in-depth look at how digital forensics plays a crucial role in contemporary investigative work.",
    date: "2/15/2026",
    author: "Admin User",
    category: "Technology",
    views: "0",
    tags: ["Digital Forensics", "Technology", "Investigation"],
    status: "draft",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
];

const AdminBlogPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Blog Management</h1>
          <p className="text-gray-400 text-sm">
            Create, edit, and manage blog posts
          </p>
        </div>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto justify-center">
          <FaPlus /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1e293b] p-4 rounded-xl w-full">
          <p className="text-gray-400 text-sm">Total Posts</p>
          <h2 className="text-lg sm:text-xl font-semibold">3</h2>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-xl w-full">
          <p className="text-gray-400 text-sm">Published</p>
          <h2 className="text-lg sm:text-xl font-semibold text-green-400">2</h2>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-xl w-full">
          <p className="text-gray-400 text-sm">Drafts</p>
          <h2 className="text-lg sm:text-xl font-semibold">1</h2>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-xl w-full">
          <p className="text-gray-400 text-sm">Total Views</p>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-400">2,139</h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center bg-[#1e293b] px-4 py-2 rounded-lg w-full">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search blog posts..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <select className="bg-[#1e293b] px-4 py-2 rounded-lg text-sm outline-none w-full sm:w-auto">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#1e293b] rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt=""
              className="w-full sm:w-28 h-40 sm:h-20 object-cover rounded-lg"
            />

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <h2 className="font-semibold text-base sm:text-lg">{blog.title}</h2>

                <span
                  className={`text-xs px-2 py-1 rounded-full self-start sm:self-auto ${
                    blog.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {blog.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-1">{blog.desc}</p>

              <div className="text-xs text-gray-400 mt-2 flex flex-wrap gap-2 sm:gap-4">
                <span>{blog.date}</span>
                <span>{blog.author}</span>
                <span>{blog.category}</span>
                <span>{blog.views} views</span>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#0f172a] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="flex items-center gap-1 bg-[#334155] px-3 py-1 rounded text-sm hover:bg-[#475569] w-full sm:w-auto justify-center">
                  <FiEdit /> Edit
                </button>
                <button className="flex items-center gap-1 bg-[#334155] px-3 py-1 rounded text-sm hover:bg-[#475569] w-full sm:w-auto justify-center">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogPage;