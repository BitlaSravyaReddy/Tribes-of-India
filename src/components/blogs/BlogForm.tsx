"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

// Dynamically import the virtual keyboard to avoid SSR issues
const Keyboard = dynamic(() => import("react-simple-keyboard").then((m) => m.default), {
  ssr: false
});
import "react-simple-keyboard/build/css/index.css";

interface VirtualLayouts {
  [key: string]: {
    default: string[];
  };
}

const layouts: VirtualLayouts = {
  Santhali: {
    default: [
      "ᱚ ᱛ ᱜ ᱝ ᱞ ᱟ ᱠ ᱡ ᱢ ᱣ ᱤ ᱥ ᱦ ᱧ ᱨ",
      "ᱩ ᱪ ᱫ ᱬ ᱭ ᱮ ᱯ ᱰ ᱱ ᱲ ᱳ ᱴ ᱵ ᱶ ᱷ",
      "{space} {bksp}"
    ]
  },
  Bhili: {
    default: [
      "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ",
      "क ख ग घ च छ ज झ ट ठ ड ढ",
      "त थ द ध न प फ ब भ म य",
      "र ल व स श ष ह {space} {bksp}"
    ]
  },
  Gondi: {
    default: [
      "𑵱 𑵲 𑵳 𑵴 𑵵 𑵶 𑵷 𑵸 𑵹 𑵺 𑵻 𑵼",
      "𑵽 𑵾 𑵿 𑶀 𑶁 𑶂 𑶃 𑶄 𑶅 𑶆 𑶇 𑶈",
      "{space} {bksp}"
    ]
  },
  Kurmali: {
    default: [
      "ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଏ ଐ ଓ ଔ",
      "କ ଖ ଗ ଘ ଚ ଛ ଜ ଝ ଟ ଠ ଡ ଢ",
      "ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ",
      "ର ଲ ଵ ସ ଶ ଷ ହ {space} {bksp}"
    ]
  }
};

export default function BlogForm() {
  const { language: uiLang, setLanguage, t } = useLanguage();

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    language: uiLang
  });

  const [keyboardInput, setKeyboardInput] = useState("");
  const keyboardRef = useRef<any>(null);
  const [recording, setRecording] = useState(false);

  // Voice Recognition Setup
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN"; // Default to Hindi
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setForm((prev) => ({ ...prev, content: prev.content + " " + transcript }));
        setRecording(false);
      };
      recognition.onerror = () => setRecording(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported in this browser.");
    setRecording(true);
    recognitionRef.current.start();
  };

  const handleKeyboardChange = (input: string) => {
    setKeyboardInput(input);
    setForm((prev) => ({ ...prev, content: input }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Update UI language context when dropdown changes
    if (name === "language") setLanguage(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert(t("submitted"));
      setForm({ ...form, title: "", content: "" });
      setKeyboardInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">{t("write_story")}</h2>

      {/* Title Field */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder={t("blog_title")}
        className="w-full p-3 border rounded-xl shadow-sm"
        required
      />

      {/* Content Field */}
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder={t("blog_content")}
        className="w-full h-40 p-3 border rounded-xl shadow-sm"
        required
      />

      {/* Voice Input */}
      <button
        type="button"
        onClick={startRecording}
        className={`px-4 py-2 rounded-full text-white ${recording ? "bg-red-600" : "bg-green-600"}`}
      >
        {recording ? t("listening") : t("voice_input")}
      </button>

      {/* Virtual Keyboard */}
      {uiLang !== "English" && layouts[uiLang] && (
        <div className="border rounded-xl shadow-inner p-3">
          <Keyboard
            key={uiLang}
            layout={layouts[uiLang]}
            onChange={handleKeyboardChange}
            theme="hg-theme-default hg-layout-default myTheme"
            layoutName="default"
            display={{ "{bksp}": "⌫", "{space}": "⎵" }}
          />
        </div>
      )}

      {/* Language Selector */}
      <select
        name="language"
        value={form.language}
        onChange={handleChange}
        className="w-full p-3 border rounded-xl shadow-sm bg-white"
      >
        <option value="English">English</option>
        <option value="Santhali">Santhali</option>
        <option value="Bhili">Bhili</option>
        <option value="Gondi">Gondi</option>
        <option value="Kurmali">Kurmali</option>
      </select>

      {/* Submit */}
      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90">
        {t("submit_blog")}
      </button>
    </form>
  );
}
