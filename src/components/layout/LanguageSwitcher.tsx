'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../i18n';

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) setSelectedLang(storedLang);
    setHasMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    localStorage.setItem('i18nextLng', lng);
    window.location.reload(); // refresh to apply the language
  };

  if (!hasMounted) return null;

  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => changeLanguage(e.target.value)}
        value={localStorage.getItem('i18nextLng') || 'en'}
      >
        {['en', 'gon', 'bhil', 'sat'].map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
