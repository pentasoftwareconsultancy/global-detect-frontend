import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText, X, Upload, Save, Loader2, ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import { ROUTES } from "../../core/constants/routes.constant";
import { authService } from "../../core/services/auth.service";
import {
  validateOnlyCharacters,
  validateRequired,
  restrictToLetters,
  handlePasteLettersOnly,
} from "../../hooks/validation";

const AdminCreateBlogPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit"); // present when editing
  const isEditMode = Boolean(editId);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    status: "draft",
    publishDate: "",
  });
  const [errors, setErrors] = useState({});

  // Image state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Page-level loading (fetching blog for edit)
  const [isFetching, setIsFetching] = useState(isEditMode);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ─── prefill when editing ─── */
  useEffect(() => {
    if (!isEditMode) return;

    const load = async () => {
      setIsFetching(true);
      try {
        const res = await authService.getBlogByIdAdmin(editId);
        const blog = res?.data?.data ?? res?.data ?? {};

        // Parse publish date to yyyy-mm-dd for the date input
        const rawDate = blog.published_at ?? blog.created_at ?? "";
        const publishDate = rawDate ? rawDate.slice(0, 10) : "";

        setForm({
          title:       blog.title       ?? "",
          excerpt:     blog.excerpt     ?? "",
          content:     blog.content     ?? "",
          status:      blog.status      ?? "draft",
          publishDate,
        });

        // Prefill image — treat existing URL as already "uploaded"
        if (blog.featured_image) {
          setImagePreview(blog.featured_image);
          setUploadedImageUrl(blog.featured_image);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message ?? "Failed to load blog");
        navigate(ROUTES.ADMIN_BLOG);
      } finally {
        setIsFetching(false);
      }
    };

    load();
  }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── helpers ─── */
  const inputCls = (err) =>
    `w-full bg-[#121F27] border ${
      err ? "border-[#D92B3A]" : "border-white/10"
    } rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30 transition`;
  const errCls = "text-xs text-[#D92B3A] mt-1";

  const setErr = (k, v) => setErrors((p) => ({ ...p, [k]: v }));
  const clearErr = (k) =>
    setErrors((p) => {
      const c = { ...p };
      delete c[k];
      return c;
    });

  /* ─── field handlers ─── */
  const onTitleChange = (e) => {
    const val = restrictToLetters(e.target.value);
    setForm((p) => ({ ...p, title: val }));
    const err = validateOnlyCharacters(val, "title");
    err ? setErr("title", err) : clearErr("title");
  };

  const onFieldChange = (field, validator, label) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (validator) {
      const err = validator(val, label);
      err ? setErr(field, err) : clearErr(field);
    }
  };

  /* ─── image selection → auto-upload ─── */
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErr("image", "Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr("image", "Image must be smaller than 5 MB");
      return;
    }

    clearErr("image");
    setImageFile(file);
    setUploadedImageUrl("");
    setImagePreview(URL.createObjectURL(file));

    setIsUploadingImage(true);
    try {
      const res = await authService.uploadBlogImage(file);
      const url = res?.data?.data?.url || res?.data?.url;
      if (!url) throw new Error("No URL returned from upload");
      setUploadedImageUrl(url);
      clearErr("image");
      toast.success("Image uploaded successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Image upload failed";
      setErr("image", msg);
      toast.error(msg);
    } finally {
      setIsUploadingImage(false);
    }
  };

  /* ─── form validation ─── */
  const validate = () => {
    const e = {};
    const t = validateOnlyCharacters(form.title, "title");
    if (t) e.title = t;
    const c = validateRequired(form.content, "content");
    if (c) e.content = c;
    if (!uploadedImageUrl) e.image = "Please upload a featured image";
    if (!form.publishDate) e.publishDate = "Publish date is required";
    return e;
  };

  /* ─── submit (create or update) ─── */
  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title:          form.title,
        excerpt:        form.excerpt || undefined,
        content:        form.content,
        featured_image: uploadedImageUrl,
        status:         form.status,
        published_at:
          form.status === "published" && form.publishDate
            ? new Date(form.publishDate).toISOString()
            : undefined,
      };

      if (isEditMode) {
        await authService.updateBlog(editId, payload);
        toast.success("Blog post updated successfully!");
      } else {
        await authService.createBlog(payload);
        toast.success("Blog post created successfully!");
      }

      navigate(ROUTES.ADMIN_BLOG);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        `Failed to ${isEditMode ? "update" : "create"} blog`;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── full-page loader while fetching blog data ─── */
  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#121F27] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 size={32} className="animate-spin text-[#FF4959]" />
          <p className="text-sm">Loading blog post…</p>
        </div>
      </div>
    );
  }

  /* ─── render ─── */
  return (
    <div className="min-h-screen text-white p-4 sm:p-6 font-[Montserrat]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <FileText size={20} className="text-white shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold">Blog Management</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              {isEditMode ? "Edit blog post" : "Create, edit, and manage blog posts"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_BLOG)}
          className="flex items-center gap-1.5 border border-white/20 hover:border-white/40 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-gray-300 hover:text-white transition shrink-0"
        >
          <X size={13} /> Cancel
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-6">
        <h2 className="text-sm sm:text-base font-semibold mb-1">
          {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6">
          Fill in the details below to {isEditMode ? "update your" : "create your"} blog post
        </p>

        {/* Title */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            value={form.title}
            onChange={onTitleChange}
            onPaste={(e) =>
              handlePasteLettersOnly(e, (v) => {
                setForm((p) => ({ ...p, title: v }));
                const err = validateOnlyCharacters(v, "title");
                err ? setErr("title", err) : clearErr("title");
              })
            }
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
            onChange={(e) =>
              setForm((p) => ({ ...p, excerpt: e.target.value }))
            }
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
            rows={8}
            className={inputCls(errors.content) + " resize-none"}
          />
          <p className="text-xs text-gray-500 mt-2">Supports Markdown formatting</p>
          {errors.content && <p className={errCls}>{errors.content}</p>}
        </div>

        {/* Featured Image */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-sm font-medium mb-2">Featured Image *</label>

          {/* Preview */}
          {imagePreview && (
            <div className="mb-3 relative w-full max-w-sm rounded-lg overflow-hidden border border-white/10">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
              {isUploadingImage && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 size={28} className="animate-spin text-white" />
                </div>
              )}
              {uploadedImageUrl && !isUploadingImage && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {isEditMode && !imageFile ? "Current image" : "Uploaded ✓"}
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              type="button"
              onClick={() => !isUploadingImage && fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition w-full ${
                errors.image
                  ? "border-[#D92B3A] text-[#D92B3A]"
                  : uploadedImageUrl
                  ? "border-green-500 text-green-400"
                  : "border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
              } disabled:cursor-not-allowed`}
            >
              {isUploadingImage ? (
                <>
                  <Loader2 size={15} className="animate-spin shrink-0" />
                  <span className="truncate">Uploading…</span>
                </>
              ) : uploadedImageUrl ? (
                <>
                  <Upload size={15} className="shrink-0" />
                  <span className="truncate">
                    {imageFile ? "Uploaded ✓ — click to change" : "Click to change image"}
                  </span>
                </>
              ) : (
                <>
                  <ImageIcon size={15} className="shrink-0" />
                  <span className="truncate">
                    {imageFile ? imageFile.name : "Choose image…"}
                  </span>
                </>
              )}
            </button>
          </div>

          {errors.image && <p className={errCls}>{errors.image}</p>}
          {uploadedImageUrl && (
            <p className="text-xs text-green-400 mt-1 truncate">{uploadedImageUrl}</p>
          )}
        </div>

        {/* Status + Publish Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                className={inputCls(false) + " appearance-none cursor-pointer pr-10"}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▾
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Publish Date *</label>
            <input
              type="date"
              value={form.publishDate}
              onChange={onFieldChange("publishDate", validateRequired, "publish_date")}
              className={inputCls(errors.publishDate)}
              style={{ colorScheme: "dark" }}
            />
            {errors.publishDate && <p className={errCls}>{errors.publishDate}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-[#FF4959] hover:bg-[#b82231] disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {isSubmitting
              ? isEditMode ? "Updating…" : "Creating…"
              : isEditMode ? "Update Post" : "Create Post"}
          </button>
          <button
            onClick={() => navigate(ROUTES.ADMIN_BLOG)}
            disabled={isSubmitting}
            className="flex items-center justify-center px-5 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBlogPage;