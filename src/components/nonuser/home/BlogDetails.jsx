import React from "react";
import { useParams } from "react-router-dom";
import { blogsData } from "../../../data/blogsData";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { useEffect } from "react";


const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const blog = blogsData.find((b) => b.id === Number(id));

    const relatedBlogs = blogsData.filter((b) =>
        blog.related.includes(b.id)
    );

    if (!blog) return <div className="text-white p-10">Blog not found</div>;

    return (
        <div className="bg-[#0f1c24] text-white min-h-screen px-4 md:px-10 lg:px-24 py-10">

            {/* 🔹 HEADER */}
            <div className="max-w-6xl mx-auto">

                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {blog.category}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-3">
                    {blog.title}
                </h1>

                <p className="text-gray-400 mb-4">
                    {blog.subtitle || "Understanding insights and investigation processes"}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <CiCalendarDate />
                    <span>{blog.date}</span>
                    <span>      </span>
                    <MdOutlinePerson />
                    <span>{blog.author}</span>
                    <span>      </span>
                    <IoMdTime />
                    <span>{blog.readTime}</span>
                </div>

                {/* 🔹 IMAGE */}
                <div className="rounded-lg overflow-hidden mb-6">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[400px] object-cover"
                    />
                </div>

                {/* 🔹 INTRO */}
                <p className="text-gray-300 leading-relaxed mb-6">
                    {blog.intro}
                </p>

                {/* 🔹 SECTIONS */}
                {blog.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            {section.title}
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            {section.desc}
                        </p>
                    </div>
                ))}

                {/* 🔹 CONCLUSION BOX */}
                <div className="mt-8 bg-white/5 border-l-4 border-red-500 p-5 rounded-md">
                    <h3 className="font-semibold mb-2">Conclusion</h3>
                    <p className="text-gray-400">{blog.conclusion}</p>
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
                                    src={item.image}
                                    className="w-full h-[160px] object-cover"
                                />

                                <div className="p-4">
                                    <p className="text-xs text-gray-400 mb-1">
                                        {item.date}
                                    </p>

                                    <h3 className="text-sm font-medium">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogDetails;