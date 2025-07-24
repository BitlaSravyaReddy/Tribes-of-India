// context/LanguageContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string; // 't' function for translations
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the current language, default to 'English'
  const [language, setLanguage] = useState<string>('English');

  // Simple translation function (you'd expand this with more robust logic)
  const t = (key: string): string => {
    // This is a placeholder for your actual translations.
    // In a real app, you might fetch these from a JSON file or an API.
    const translations: { [key: string]: { [lang: string]: string } } = {
      write_your_blog: {
        English: "Write Your Blog",
        Santhali: "ᱚᱞ ᱢᱮ ᱟᱯᱱᱟᱨ ᱵᱽᱞᱚᱜᱽ",
        Bhili: "ᱛᱟᱢᱟᱨᱚ ᱵᱽᱞᱚᱜᱽ ᱞᱤᱠᱷᱚ",
        Gondi: "ᱢᱟᱨᱤ ᱵᱽᱞᱚᱜᱽ ᱮᱞᱩ",
        Kurmali: "ᱛᱚᱦᱚᱨ ᱵᱽᱞᱚᱜᱽ ᱞᱤᱠᱷᱚ"
      },
      share_your_voice_with_the_tribal_community: {
        English: "Share your voice with the tribal community.",
        Santhali: "ᱟᱯᱱᱟᱨ ᱨᱚᱲ ᱟᱫᱤᱵᱟᱥᱤ ᱥᱚᱢᱟᱡᱽ ᱥᱟᱶ ᱥᱮᱭᱟᱨ ᱢᱮ᱾",
        Bhili: "ᱛᱟᱢᱟᱨᱚ ᱟᱣᱟᱡᱽ ᱟᱫᱤᱵᱟᱥᱤ ᱥᱚᱢᱟᱡᱽ ᱥᱟᱶ ᱥᱮᱭᱟᱨ ᱠᱚᱨᱚ᱾",
        Gondi: "ᱢᱟᱨᱤ ᱨᱚᱲ ᱟᱫᱤᱵᱟᱥᱤ ᱥᱚᱢᱟᱡᱽ ᱥᱟᱶ ᱥᱮᱭᱟᱨ ᱠᱮᱨᱚ᱾",
        Kurmali: "ᱛᱚᱦᱚᱨ ᱠᱟᱛᱷᱟ ᱟᱫᱤᱵᱟᱥᱤ ᱥᱚᱢᱟᱡᱽ ᱥᱟᱶ ᱥᱮᱭᱟᱨ ᱠᱚᱨᱚ᱾"
      },
      view_blogs: {
        English: "View Blogs",
        Santhali: "ᱵᱽᱞᱚᱜᱽ ᱧᱮᱞ ᱢᱮ",
        Bhili: "ᱵᱽᱞᱚᱜᱽ ᱫᱮᱠᱷᱚ",
        Gondi: "ᱵᱽᱞᱚᱜᱽ ᱧᱮᱞ ᱠᱮᱨᱚ",
        Kurmali: "ᱵᱽᱞᱚᱜᱽ ᱧᱮᱞ ᱠᱚᱨᱚ"
      },
      start_writing: {
        English: "Start Writing",
        Santhali: "ᱚᱞ ᱮᱦᱚᱵ ᱢᱮ",
        Bhili: "ᱞᱤᱠᱷᱵᱟ ᱥᱩᱨᱩ ᱠᱚᱨᱚ",
        Gondi: "ᱚᱞ ᱮᱦᱚᱵ ᱠᱮᱨᱚ",
        Kurmali: "ᱞᱤᱠᱷᱵᱟ ᱥᱩᱨᱩ ᱠᱚᱨᱚ"
      }
      // Add more translations as needed
    };
    return translations[key]?.[language] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};