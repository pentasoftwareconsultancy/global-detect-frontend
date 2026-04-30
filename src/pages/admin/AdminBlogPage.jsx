import React, { useState } from "react";
import { Search, Plus, Calendar, User, Tag, Eye, Edit, Trash2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";

const BLOGS = [
  { id: 1, title: "The Essential Guide to Private Investigation Services", desc: "Learn about the different types of private investigation services and when you might need them.", date: "2/1/2026", author: "Admin User", category: "Industry Insights", views: "1,247", tags: ["Investigation", "Services", "Guide"], status: "published", image: img1 },
  { id: 2, title: "How Background Checks Can Protect Your Business", desc: "Discover how comprehensive background checks can safeguard your company from potential risks.", date: "1/25/2026", author: "Admin User", category: "Business Security", views: "892", tags: ["Background Check", "Business", "Security"], status: "published", image: img2 },
  { id: 3, title: "Understanding Digital Forensics in Modern Investigations", desc: "An in-depth look at how digital forensics plays a crucial role in contemporary investigative work.", date: "2/15/2026", author: "Admin User", category: "Technology", views: "0", tags: ["Digital Forensics", "Technology", "Investigation"], status: "draft", image: img3 },
];

const AdminBlogPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const navigate = useNavigate();

  const filtered = BLOGS.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || b.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#121F27] text-white p-4 sm:p-6 font-[Montserrat]">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <FileText size={20} className="text-white flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold">Blog Management</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Create, edit, and manage blog posts</p>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_BLOG_CREATE)}
          className="flex items-center gap-1.5 bg-[#D92B3A] hover:bg-[#b82231] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0"
        >
          <Plus size={13} /> <span className="hidden xs:inline">New Post</span><span className="xs:hidden">New</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { title: "Total Posts",  value: "3",     color: "text-white"     },
          { title: "Published",    value: "2",     color: "text-green-400" },
          { title: "Drafts",       value: "1",     color: "text-white"     },
          { title: "Total Views",  value: "2,139", color: "text-blue-400"  },
        ].map(s => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-4 sm:px-5 py-4 sm:py-5">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{s.title}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl px-3 sm:px-4 py-3 flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search size={13} className="text-gray-500 flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-[#1A2832] border border-white/10 text-xs sm:text-sm text-white rounded-lg px-2 sm:px-3 py-1.5 outline-none flex-shrink-0"
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="space-y-4">
        {filtered.map(blog => (
          <div key={blog.id} className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5">

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full sm:w-32 h-44 sm:h-24 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="font-semibold text-sm sm:text-base text-white leading-snug">{blog.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  blog.status === "published"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/10 text-gray-400 border border-white/10"
                }`}>
                  {blog.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 mb-2">{blog.desc}</p>

              <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1"><Calendar size={10} /> {blog.date}</span>
                <span className="flex items-center gap-1"><User size={10} /> {blog.author}</span>
                <span className="flex items-center gap-1"><Tag size={10} /> {blog.category}</span>
                <span className="flex items-center gap-1"><Eye size={10} /> {blog.views} views</span>
              </div>

              <div className="flex gap-2 flex-wrap mb-3">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="text-xs border border-white/10 text-gray-300 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs border border-white/10 text-gray-300 hover:text-white hover:border-white/30 px-3 py-1.5 rounded-md transition">
                  <Edit size={11} /> Edit
                </button>
                <button className="flex items-center gap-1.5 text-xs border border-white/10 text-gray-300 hover:text-white hover:border-white/30 px-3 py-1.5 rounded-md transition">
                  <Trash2 size={11} /> Delete
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
