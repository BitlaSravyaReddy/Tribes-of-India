import { connectToDB } from "@/lib/blogs/db";
import BlogListPageClient from "./BlogListPageClient";

export default async function BlogPage() {
  const { db } = await connectToDB();
  const blogs = await db.collection("blogs").find().sort({ createdAt: -1 }).toArray();

  // Ensure _id becomes a string
  const cleanBlogs = blogs.map((blog: any) => ({
    ...blog,
    _id: blog._id.toString(),
  }));

  return <BlogListPageClient initialBlogs={cleanBlogs} />;
}
