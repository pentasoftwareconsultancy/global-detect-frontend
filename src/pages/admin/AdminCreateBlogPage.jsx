import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, X, Upload, Save } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";

const AdminCreateBlogPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    status: "Draft",
    publishDate: "",
  });

  const inputCls = "w-full bg-[#0d1b2a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30 transition";

  const onChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#08141B] text-white p-6 font-[Montserrat]">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText size={22} className="text-white" />
          <div>
            <h1 className="text-2xl font-bold">Blog Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create, edit, and manage blog posts</p>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_BLOG)}
          className="flex items-center gap-2 border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition"
        >
          <X size={14} /> Cancel
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#0E1F2B] border border-white/5 rounded-xl p-6">
        <h2 className="text-base font-semibold mb-1">Create New Blog Post</h2>
        <p className="text-sm text-gray-400 mb-6">Fill in the details below to create your blog post</p>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            value={form.title}
            onChange={onChange("title")}
            placeholder="Enter blog post title"
            className={inputCls}
          />
        </div>

        {/* Excerpt */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={onChange("excerpt")}
            placeholder="Brief summary of the blog post"
            rows={3}
            className={inputCls + " resize-none"}
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            value={form.content}
            onChange={onChange("content")}
            placeholder="Write your blog post content here..."
            rows={6}
            className={inputCls + " resize-none"}
          />
          <p className="text-xs text-gray-500 mt-2">Supports Markdown formatting</p>
        </div>

        {/* Featured Image URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Featured Image URL</label>
          <div className="relative">
            <input
              value={form.imageUrl}
              onChange={onChange("imageUrl")}
              placeholder="https://example.com/image.jpg"
              className={inputCls + " pr-12"}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
              <Upload size={16} />
            </button>
          </div>
        </div>

        {/* Status + Publish Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={onChange("status")}
              className={inputCls + " appearance-none cursor-pointer"}
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Publish Date</label>
            <input
              type="date"
              value={form.publishDate}
              onChange={onChange("publishDate")}
              className={inputCls}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#D92B3A] hover:bg-[#b82231] px-5 py-2.5 rounded-lg text-sm font-medium transition">
            <Save size={14} /> Create Post
          </button>
          <button
            onClick={() => navigate(ROUTES.ADMIN_BLOG)}
            className="px-5 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBlogPage;
