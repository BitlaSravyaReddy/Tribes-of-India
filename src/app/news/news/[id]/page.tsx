import { notFound } from "next/navigation";
import { newsData } from "../../news-data";
import Link from "next/link";
import { format, toZonedTime } from "date-fns-tz";

export default function NewsDetail({ params }: { params: { id: string } }) {
  const news = newsData.find((n) => n.id === params.id);
  if (!news) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            <Link href="/">Tribal News</Link>
          </h1>
          <Link href="/" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
            ← Back to News
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={news.image}
            alt={news.headline}
            className="w-full h-96 object-cover"
            width={800}
            height={450}
          />
          <div className="p-8">
            <div className="mb-4">
              <span className="bg-indigo-500 text-white text-sm font-bold px-3 py-1 rounded">
                {news.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.headline}</h1>
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <span className="font-semibold mr-4">{news.channel}</span>
              <time dateTime={news.timestamp}>
                {format(toZonedTime(news.timestamp, news.timezone), "PPpp", { timeZone: news.timezone })}
              </time>
            </div>
            <div className="max-w-none text-gray-700 text-lg leading-relaxed">
              {news.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 