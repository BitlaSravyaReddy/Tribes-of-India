// app/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext"; // Adjust this path if different
import { motion } from "framer-motion";


export default function HomePage() {
  const router = useRouter();
  // Destructure language, setLanguage, and t from your language context
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-blue-100 px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center text-indigo-700 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {t("write_your_blog")}
      </motion.h1>

      <motion.p
        className="text-lg text-center text-gray-600 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {t("share_your_voice_with_the_tribal_community")}
      </motion.p>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <select
          // The value of the select is controlled by the 'language' state
          value={language}
          // When the select changes, update the 'language' state using setLanguage
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
          className="mb-6 p-2 rounded-xl border shadow-md bg-white text-gray-800"
        >
          <option value="English">English</option>
          <option value="Santhali">Santhali</option>
          <option value="Bhili">Bhili</option>
          <option value="Gondi">Gondi</option>
          <option value="Kurmali">Kurmali</option>
        </select>
      </motion.div>


      <div className="flex gap-6">
        <motion.button
          onClick={() => router.push("/blogs/blog")}
          className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("view_blogs")}
        </motion.button>

        <motion.button
          onClick={() => router.push("/blogs/blog/create")}
          className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("start_writing")}
        </motion.button>
      </div>
    </div>
  );
}