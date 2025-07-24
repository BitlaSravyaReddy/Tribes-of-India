import { NextResponse } from "next/server";
import { translateText } from "@/lib/blogs/translate"; // adjust path if needed

// Mock blog data (you can later replace with real DB)
const mockBlogs = [
  {
    id: 1,
    title: "write_your_blog", // keys matching your translation files
    content: "share_your_voice_with_the_tribal_community",
    author: "Admin",
    date: "2023-01-15"
  },
  {
    id: 2,
    title: "start_writing",
    content: "This is some generic English content that will be translated.",
    author: "User1",
    date: "2024-01-10"
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "English";

  const translatedBlogs = await Promise.all(
    mockBlogs.map(async (blog) => ({
      ...blog,
      title: await translateText(blog.title, "English", lang),
      content: await translateText(blog.content, "English", lang)
    }))
  );

  return NextResponse.json(translatedBlogs);
}
