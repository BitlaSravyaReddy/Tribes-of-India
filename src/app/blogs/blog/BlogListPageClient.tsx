"use client";

import { useState, useEffect } from "react";
import { Blog } from "../../../types/blogs";
import BlogCard from "../../../components/blogs/BlogCard";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogListPageClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const { language, setLanguage, t } = useLanguage(); // ✅ use from context
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  useEffect(() => {
    const fetchTranslatedBlogs = async () => {
      if (language === "English") {
        setBlogs(initialBlogs);
        return;
      }

      try {
        const res = await fetch(`/api/translateBlogs?lang=${language}`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Translation failed", error);
      }
    };

    fetchTranslatedBlogs();
  }, [language]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">{t("tribal_stories")}</h1>

      <div className="flex justify-end mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded-xl border shadow-sm"
        >
          <option value="English">English</option>
          <option value="Santhali">Santhali</option>
          <option value="Gondi">Gondi</option>
          <option value="Bhili">Bhili</option>
          <option value="Kurmali">Kurmali</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
