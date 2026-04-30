import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from '../../../core/constants/routes.constant';
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { authService } from "../../../core/services/auth.service";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                const res = await authService.getBlogById(id);
                const data = res?.data?.data || null;
                setBlog(data);

                // fetch related blogs by matching tags
                if (data?.tags?.length > 0) {
                    const allRes = await authService.getPublishedBlogs();
                    const allBlogs = allRes?.data?.data?.blogs || [];
                    const related = allBlogs
                        .filter(b => b.id !== data.id && b.tags?.some(t => data.tags.includes(t)))
                        .slice(0, 3);
                    setRelatedBlogs(related);
                }
            } catch (err) {
                console.error("Blog Details Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetails();
    }, [id]);

    if (loading) return <div className="text-white p-10">Loading...</div>;
    if (!blog) return <div className="text-white p-10">Blog not found</div>;

    return (
        <div className="bg-[#0f1c24] text-white min-h-screen px-4 md:px-10 lg:px-24 py-10">

            {/* 🔹 HEADER */}
            <div className="max-w-6xl mx-auto">

                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {blog.tags?.[0] || 'General'}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-3">
                    {blog.title}
                </h1>

                <p className="text-gray-400 mb-4">
                    {blog.excerpt || "Understanding insights and investigation processes"}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <CiCalendarDate />
                    <span>
                        {blog.published_at
                            ? new Date(blog.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span>      </span>
                    <MdOutlinePerson />
                    <span>{blog.author?.name || "Unknown Author"}</span>
                    <span>      </span>
                    <IoMdTime />
                    <span>{blog.reading_time ? `${blog.reading_time} min read` : ""}</span>
                </div>

                {/* 🔹 IMAGE */}
                <div className="rounded-lg overflow-hidden mb-6">
                    <img
                        src={blog.featured_image || "https://picsum.photos/800/400"}
                        onError={(e) => { e.target.src = "https://picsum.photos/800/400"; }}
                        alt={blog.title || "Blog"}
                        className="w-full h-[400px] object-cover"
                    />
                </div>

                {/* 🔹 INTRO */}
                <p className="text-gray-300 leading-relaxed mb-6">
                    {blog.excerpt || ""}
                </p>

                {/* 🔹 CONTENT */}
                <div
                    className="text-gray-400 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* 🔹 CONCLUSION BOX */}
                <div className="mt-8 bg-white/5 border-l-4 border-red-500 p-5 rounded-md">
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <p className="text-gray-400">{blog.tags?.join(", ") || "No tags"}</p>
                </div>

                {/* 🔹 CTA */}
                <div className="mt-10 bg-red-500 rounded-xl p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        Need Professional Investigation Services?
                    </h2>
                    <p className="text-sm mb-4">
                        Contact us today for a confidential consultation with our expert investigators.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
                        className="bg-white text-black px-5 py-2 rounded-md font-medium cursor-pointer hover:bg-gray-200 transition"
                    >
                        Request Investigation
                    </button>
                </div>

                {/* 🔹 RELATED ARTICLES */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedBlogs.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/blogs/${item.id}`)}
                                    className="cursor-pointer bg-[#16232c] rounded-xl overflow-hidden hover:scale-[1.02] transition"
                                >
                                    <img
                                        src={item.featured_image }
                                        className="w-full h-[160px] object-cover"
                                        alt={item.title}
                                    />
                                    <div className="p-4">
                                        <p className="text-xs text-gray-400 mb-1">
                                            {item.published_at
                                                ? new Date(item.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                                : ""}
                                        </p>
                                        <h3 className="text-sm font-medium">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};



export default BlogDetails;