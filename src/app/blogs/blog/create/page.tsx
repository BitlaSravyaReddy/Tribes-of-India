"use client";
import BlogForm from "../../../../components/blogs/BlogForm";
import { useLanguage } from "@/context/LanguageContext";

export default function CreateBlogPage() {
  const { t } = useLanguage(); // ✅ use here too

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">{t("write_story")}</h1>
      <BlogForm />
    </div>
  );
}
