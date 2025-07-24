// src/components/home/ImageSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
 
}

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Gond Tribal Art",
      description: "Discover the vibrant traditional art forms of the Gond tribe, known for their intricate patterns and nature-inspired designs.",
      imageUrl: "/images/slider/gond-art.jpg",
      location: "Madhya Pradesh",
      
    },
    {
      id: 2,
      title: "Santhal Dance Festival",
      description: "Experience the energetic dance performances during Santhal festivals, celebrating harvest and community spirit.",
      imageUrl: "/images/slider/santhal-dance.jpg",
      location: "Jharkhand"
    },
    {
      id: 3,
      title: "Warli Village Life",
      description: "Explore the simple yet profound lifestyle of Warli tribes, living in harmony with nature for centuries.",
      imageUrl: "/images/slider/warli-village.jpg",
      location: "Maharashtra"
    },
    {
      id: 4,
      title: "Bhil Tribal Crafts",
      description: "Marvel at the exceptional craftsmanship of Bhil artisans, creating beautiful pottery and traditional artifacts.",
      imageUrl: "/images/slider/bhil-crafts.jpg",
      location: "Rajasthan"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="relative h-full w-full">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              // width={500}
  //height={300}
  unoptimized 
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <div className="mb-4">
                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {slide.location}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                {slide.title}
              </h1>
              <div className={`transform transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 shadow-lg">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;