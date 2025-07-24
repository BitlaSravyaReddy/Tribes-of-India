import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/blogs/db";
import { translateText } from "@/lib/blogs/translate";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { db } = await connectToDB();

  let translatedContent = body.content;
  if (body.language !== "English") {
    translatedContent = await translateText(body.content, body.language, "English");
  }

  const blog = {
    ...body,
    translatedContent,
    createdAt: new Date().toISOString(),
  };

  await db.collection("blogs").insertOne(blog);
  return NextResponse.json({ success: true });
}
