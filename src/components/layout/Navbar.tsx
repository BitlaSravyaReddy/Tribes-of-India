// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import LanguageSwitcher  from './LanguageSwitcher'; //
import { useHasMounted } from "@/hooks/useHasMounted";
import { Gem } from "lucide-react"; // Gem = 💠 icon
import { Camera, Sparkles } from 'lucide-react';



import { useTranslation } from 'react-i18next'; //
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { t } = useTranslation(); //
  const pathname = usePathname(); //
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [hasMounted, setHasMounted] = useState(false);
  const hasMounted= useHasMounted();

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  const navItems = [
  { name: hasMounted ? t('navigation.home') : 'Home', href: '/' },
  { name: hasMounted ? t('navigation.map') : 'Map', href: '/map' },
  { name: hasMounted ? t('navigation.chatbot') : 'Chatbot', href: '/chatbot' },
  { name: hasMounted ? t('navigation.estore') : 'E-Store', href: '/e-store' },
  { name: hasMounted ? t('navigation.news') : 'News', href: '/news' },
  { name: hasMounted ? t('navigation.analytics') : 'Analytics', href: '/analytics' },
  { name: hasMounted ? t('navigation.blogs') : 'Blogs', href: '/blogs' },
];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div className="hidden sm:block">
  {hasMounted ? (
    <>
      <h1 className="text-xl font-bold text-gray-800">{t('navigation.title')}</h1>
      <p className="text-xs text-gray-600">{t('navigation.subtitle')}</p>
    </>
  ) : (
    <>
      <h1 className="text-xl font-bold text-gray-800" suppressHydrationWarning>
        Tribes of India
      </h1>
      <p className="text-xs text-gray-600" suppressHydrationWarning>
        Cultural Heritage
      </p>
    </>
  )}
</div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            { hasMounted &&  navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <LanguageSwitcher/>
          {/* Try-On Icon */}
<Link
  href="/tryon"
  className="ml-4 text-gray-700 hover:text-orange-600 transition-colors duration-200 flex items-center"
  title="Try On Jewelry"
>
  <div className="relative ml-4">
  <Camera className="w-5 h-5 text-gray-700 hover:text-orange-600" />
  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
</div>

</Link>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div> 
        </div>

        {/* Mobile Navigation */}
         {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )} 
      </div>
    </nav>
  );
};

export default Navbar;