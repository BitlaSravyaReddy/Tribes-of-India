"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsData, NewsItem } from "./news-data";
import { format, toZonedTime } from "date-fns-tz";

const getUnique = (arr: string[]) => Array.from(new Set(arr));

const categories = getUnique(newsData.map((n) => n.category));
const channels = getUnique(newsData.map((n) => n.channel));

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("48");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string>("");

  const now = Date.now();
  const filteredNews = useMemo(() => {
    return newsData.filter((n) => {
      const newsTime = new Date(n.timestamp).getTime();
      const timeLimit = parseInt(selectedTime, 10) * 60 * 60 * 1000;
      const withinTimeLimit = now - newsTime <= timeLimit;
      const matchesSearch =
        !search || n.headline.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory || n.category === selectedCategory;
      const matchesChannel =
        !selectedChannel || n.channel === selectedChannel;
      return (
        withinTimeLimit &&
        matchesSearch &&
        matchesCategory &&
        matchesChannel
      );
    });
  }, [search, selectedTime, selectedCategory, selectedChannel, now]);

  const suggestions = useMemo(() => {
    if (!search) return [];
    return newsData
      .filter((n) =>
        n.headline.toLowerCase().startsWith(search.toLowerCase())
      )
      .map((n) => n.headline);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Tribal News
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search headlines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              {search && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow-lg">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                      onClick={() => setSearch(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <select
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="48">Last 48 Hours</option>
              <option value="24">Last 24 Hours</option>
              <option value="18">Last 18 Hours</option>
              <option value="12">Last 12 Hours</option>
              <option value="6">Last 6 Hours</option>
            </select>
            <select
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              <option value="">All Channels</option>
              {channels.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredNews.length === 0 && (
            <div className="col-span-full text-center text-gray-500 text-xl py-12">
              No news found for the selected filters.
            </div>
          )}
          {filteredNews.map((news) => (
            <Link
              href={`/news/${news.id}`}
              key={news.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.headline}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={250}
                  loading="lazy"
                />
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                  {news.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-3">
                  {news.headline}
                </h2>
                <div className="text-sm text-gray-600 mt-auto">
                  <span className="font-semibold">{news.channel}</span>
                  <br />
                  <time dateTime={news.timestamp} className="text-xs text-gray-500">
                    {format(toZonedTime(news.timestamp, news.timezone), "PPpp", { timeZone: news.timezone })}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
