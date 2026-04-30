import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, X, Upload, Save } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";
import { validateOnlyCharacters, validateRequired, restrictToLetters, handlePasteLettersOnly } from "../../hooks/validation";

const AdminCreateBlogPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", imageUrl: "",
    status: "Draft", publishDate: "", imageFile: null,
  });
  const [errors, setErrors] = useState({});

  const inputCls = (err) =>
    `w-full bg-[#1A2832] border ${err ? "border-[#D92B3A]" : "border-white/10"} rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30 transition`;
  const errCls = "text-xs text-[#D92B3A] mt-1";

  const setErr = (k, v) => setErrors(p => ({ ...p, [k]: v }));
  const clearErr = (k) => setErrors(p => { const c = { ...p }; delete c[k]; return c; });

  const onTitleChange = (e) => {
    const val = restrictToLetters(e.target.value);
    setForm(p => ({ ...p, title: val }));
    const err = validateOnlyCharacters(val, "title");
    err ? setErr("title", err) : clearErr("title");
  };

  const onFieldChange = (field, validator, label) => (e) => {
    const val = e.target.value;
    setForm(p => ({ ...p, [field]: val }));
    if (validator) {
      const err = validator(val, label);
      err ? setErr(field, err) : clearErr(field);
    }
  };

  const handleSubmit = () => {
    const e = {};
    const t = validateOnlyCharacters(form.title, "title"); if (t) e.title = t;
    const c = validateRequired(form.content, "content"); if (c) e.content = c;
    const i = validateRequired(form.imageUrl, "featured_image"); if (i) e.imageUrl = i;
    const d = validateRequired(form.publishDate, "publish_date"); if (d) e.publishDate = d;
    setErrors(e);
    if (Object.keys(e).length === 0) console.log("Submit:", form);
  };

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
          onClick={() => navigate(ROUTES.ADMIN_BLOG)}
          className="flex items-center gap-1.5 border border-white/20 hover:border-white/40 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-gray-300 hover:text-white transition flex-shrink-0"
        >
          <X size={13} /> Cancel
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm sm:text-base font-semibold mb-1">Create New Blog Post</h2>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6">Fill in the details below to create your blog post</p>

        {/* Title */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            value={form.title}
            onChange={onTitleChange}
            onPaste={e => handlePasteLettersOnly(e, v => {
              setForm(p => ({ ...p, title: v }));
              const err = validateOnlyCharacters(v, "title");
              err ? setErr("title", err) : clearErr("title");
            })}
            placeholder="Enter blog post title"
            className={inputCls(errors.title)}
          />
          {errors.title && <p className={errCls}>{errors.title}</p>}
        </div>

        {/* Excerpt */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
            placeholder="Brief summary of the blog post"
            rows={3}
            className={inputCls(false) + " resize-none"}
          />
        </div>

        {/* Content */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            value={form.content}
            onChange={onFieldChange("content", validateRequired, "content")}
            placeholder="Write your blog post content here..."
            rows={6}
            className={inputCls(errors.content) + " resize-none"}
          />
          <p className="text-xs text-gray-500 mt-2">Supports Markdown formatting</p>
          {errors.content && <p className={errCls}>{errors.content}</p>}
        </div>

        {/* Featured Image */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-sm font-medium mb-2">Featured Image URL *</label>
          <div className="flex gap-2">
            <input
              value={form.imageUrl}
              onChange={onFieldChange("imageUrl", validateRequired, "featured_image")}
              placeholder="https://example.com/image.jpg"
              className={inputCls(errors.imageUrl) + " flex-1"}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setForm(p => ({ ...p, imageUrl: file.name, imageFile: file }));
                  clearErr("imageUrl");
                }
              }}
            />
            <label
              htmlFor="image-upload"
              className="w-11 h-11 flex items-center justify-center bg-[#1A2832] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/30 transition cursor-pointer flex-shrink-0"
            >
              <Upload size={16} />
            </label>
          </div>
          {errors.imageUrl && <p className={errCls}>{errors.imageUrl}</p>}
        </div>

        {/* Status + Publish Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="relative">
              <select
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className={inputCls(false) + " appearance-none cursor-pointer pr-10"}
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Publish Date *</label>
            <input
              type="date"
              value={form.publishDate}
              onChange={onFieldChange("publishDate", validateRequired, "publish_date")}
              className={inputCls(errors.publishDate)}
            />
            {errors.publishDate && <p className={errCls}>{errors.publishDate}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-[#FF4959] hover:bg-[#b82231] px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Save size={14} /> Create Post
          </button>
          <button
            onClick={() => navigate(ROUTES.ADMIN_BLOG)}
            className="flex items-center justify-center px-5 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBlogPage;
