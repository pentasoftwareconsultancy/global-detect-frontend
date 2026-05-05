import React, { useState, useEffect, useCallback } from "react";
import {
  Search, Plus, Calendar, User, Eye, Edit, Trash2,
  FileText, Loader2, AlertCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../core/constants/routes.constant";
import { authService } from "../../core/services/auth.service";

/* ─── helpers ─── */
const fmt = (val, fallback = "0") =>
  val !== undefined && val !== null ? String(val) : fallback;

const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const StatusBadge = ({ status }) => {
  const map = {
    published: "bg-green-500/20 text-green-400 border-green-500/30",
    draft:     "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    archived:  "bg-gray-500/10  text-gray-400  border-white/10",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize ${map[status] ?? map.archived}`}>
      {status}
    </span>
  );
};

/* ─── skeleton card ─── */
const SkeletonCard = () => (
  <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-5 flex gap-4 animate-pulse">
    <div className="w-32 h-24 rounded-lg bg-white/5 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
    </div>
  </div>
);

/* ─── main component ─── */
const AdminBlogPage = () => {
  const navigate = useNavigate();

  // stats
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // list
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [listLoading, setListLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  // delete
  const [deletingId, setDeletingId] = useState(null);

  /* ── fetch stats ── */
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await authService.getBlogStats();
      setStats(res?.data?.data ?? res?.data ?? null);
    } catch {
      // non-critical — silently fail
    } finally {
      setStatsLoading(false);
    }
  }, []);

  /* ── fetch blogs ── */
  const fetchBlogs = useCallback(async (page = 1) => {
    setListLoading(true);
    try {
      const res = await authService.getAllBlogsAdmin({
        page,
        limit: pagination.limit,
        status: statusFilter,
        search,
        sort: "newest",
      });
      const data = res?.data?.data ?? res?.data ?? {};
      setBlogs(data.blogs ?? []);
      setPagination((p) => ({
        ...p,
        page: data.pagination?.page ?? page,
        total: data.pagination?.total ?? 0,
        totalPages: data.pagination?.totalPages ?? 1,
      }));
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to load blogs");
    } finally {
      setListLoading(false);
    }
  }, [statusFilter, search, pagination.limit]);

  /* ── initial load ── */
  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchBlogs(1); }, [statusFilter, search]);

  /* ── search debounce ── */
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  /* ── delete ── */
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await authService.deleteBlog(id);
      toast.success("Blog deleted");
      fetchBlogs(pagination.page);
      fetchStats();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  /* ── stat cards data ── */
  const statCards = [
    { title: "Total Posts",  value: fmt(stats?.totalPosts),   color: "text-white"       },
    { title: "Published",    value: fmt(stats?.publishedPosts), color: "text-green-400" },
    { title: "Drafts",       value: fmt(stats?.draftPosts),   color: "text-yellow-400"  },
    { title: "Total Views",  value: fmt(stats?.totalViews),   color: "text-blue-400"    },
  ];

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 font-[Montserrat]">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <FileText size={20} className="text-white shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold">Blog Management</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Create, edit, and manage blog posts
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_BLOG_CREATE)}
          className="flex items-center gap-1.5 bg-[#FF4959] hover:bg-[#b82231] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition shrink-0"
        >
          <Plus size={13} /> New Post
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {statCards.map((s) => (
          <div
            key={s.title}
            className="bg-[#1A2832] border border-white/5 rounded-xl px-4 sm:px-5 py-4 sm:py-5"
          >
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{s.title}</p>
            {statsLoading ? (
              <div className="h-8 w-16 bg-white/5 rounded animate-pulse" />
            ) : (
              <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl px-3 sm:px-4 py-3 flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search size={13} className="text-gray-500 shrink-0" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search blog posts..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1A2832] border border-white/10 text-xs sm:text-sm text-white rounded-lg px-2 sm:px-3 py-1.5 outline-none shrink-0"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          
        </select>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {listLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : blogs.length === 0 ? (
          <div className="bg-[#1A2832] border border-white/5 rounded-xl p-10 flex flex-col items-center gap-3 text-gray-400">
            <AlertCircle size={32} className="opacity-40" />
            <p className="text-sm">No blog posts found</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              {/* Thumbnail */}
              {blog.featured_image ? (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full sm:w-32 h-44 sm:h-24 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-full sm:w-32 h-44 sm:h-24 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <FileText size={24} className="text-gray-600" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-sm sm:text-base text-white leading-snug line-clamp-2">
                    {blog.title}
                  </h2>
                  <StatusBadge status={blog.status} />
                </div>

                {blog.excerpt && (
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {fmtDate(blog.published_at ?? blog.created_at)}
                  </span>
                  {blog.author && (
                    <span className="flex items-center gap-1">
                      <User size={10} /> {blog.author.name ?? "Admin"}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye size={10} /> {fmt(blog.views_count, "0")} views
                  </span>
                  {blog.reading_time && (
                    <span className="text-gray-500">{blog.reading_time} min read</span>
                  )}
                </div>

                {/* Tags */}
                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs border border-white/10 text-gray-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`${ROUTES.ADMIN_BLOG_CREATE}?edit=${blog.id}`)}
                    className="flex items-center gap-1.5 text-xs border border-white/10 text-gray-300 hover:text-white hover:border-white/30 px-3 py-1.5 rounded-md transition"
                  >
                    <Edit size={11} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    disabled={deletingId === blog.id}
                    className="flex items-center gap-1.5 text-xs border border-white/10 text-gray-300 hover:text-[#FF4959] hover:border-[#FF4959]/40 px-3 py-1.5 rounded-md transition disabled:opacity-40"
                  >
                    {deletingId === blog.id ? (
                      <Loader2 size={11} className="animate-spin" />
                    ) : (
                      <Trash2 size={11} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!listLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
          <span>
            Showing {(pagination.page - 1) * pagination.limit + 1}–
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchBlogs(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-white font-medium px-1">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchBlogs(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;