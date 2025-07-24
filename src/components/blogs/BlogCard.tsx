import { Blog } from "@/types/blogs";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 space-y-3">
      <h2 className="text-xl font-semibold text-indigo-700">{blog.title}</h2>
      <p className="text-gray-600 text-sm">by {blog.author} ({blog.language})</p>
      <p className="text-gray-800 line-clamp-3">{blog.translatedContent || blog.content}</p>
    </div>
  );
}
