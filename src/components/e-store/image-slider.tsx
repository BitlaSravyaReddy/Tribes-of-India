"use client";
import { usePathname } from 'next/navigation';
import LanguageSwitcher  from '../layout/LanguageSwitcher'; //
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTranslation } from 'react-i18next'; //
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/e-store/utils";



export function ImageSlider() {
  const { t } = useTranslation(); //
  const pathname = usePathname(); //
  const hasMounted= useHasMounted();
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const slides =   [

  {
    image: "https://images.hindustantimes.com/img/2022/09/08/1600x900/raimond-klavins-AO5HvvqJ93Q-unsplash_1662629470561_1662629493045_1662629493045.jpg",
    imageHint: "tribal art",
    title: t("slider.art_of_tradition.title"),
    subtitle: t("slider.art_of_tradition.subtitle"),
    link: "/shop?category=Handicrafts",
  },
  {
    image: "https://static.wixstatic.com/media/671e84_e2d51f7164d04bb99b26b5f0a8bfa853~mv2.jpeg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/671e84_e2d51f7164d04bb99b26b5f0a8bfa853~mv2.jpeg",
    imageHint: "handmade jewelry",
    title: t("slider.woven_stories.title"),
    subtitle: t("slider.woven_stories.subtitle"),
    link: "/shop?category=Clothing",
  },
  {
    image: "https://www.aurusjewels.com/cdn/shop/files/Custom-made_indian_wedding_necklace.png?v=1684396749",

    imageHint: "tribal women",
    title: t("slider.jewelry_tale.title"),
    subtitle: t("slider.jewelry_tale.subtitle"),
    link: "/shop?category=Jewelry",
  },
] 
;
 



  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);
  
  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, nextSlide]);
 if(!hasMounted) {
    return null; // Prevent rendering on the server side
  }
  return (
    <div className="h-[400px] md:h-[600px] w-full m-auto relative group">
      <div
        className="w-full h-full bg-center bg-cover duration-500"
      >
        <Image
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={slides[currentIndex].imageHint}
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg mb-4">
            {slides[currentIndex].title}
          </h1>
          <p className="text-lg md:text-2xl font-body mb-8">
            {slides[currentIndex].subtitle}
          </p>
          <Button asChild size="lg">
            <Link href={slides[currentIndex].link}>Shop Now</Link>
          </Button>
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 rounded-full bg-gray-200 hover:bg-blend-color"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 rounded-full bg-gray-200 hover:bg-background/75"
        onClick={nextSlide}
      >
        <ChevronRight />
      </Button>
      
      <div className="flex top-4 justify-center py-2 absolute bottom-5 left-0 right-0">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={cn(
                "text-2xl cursor-pointer p-2 transition-colors",
                currentIndex === slideIndex ? "text-white" : "text-white/50"
            )}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
}
