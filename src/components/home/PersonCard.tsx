// src/components/home/PersonCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface TribalPerson {
  id: number;
  name: string;
  tribe: string;
  title: string;
  description: string;
  imageUrl: string;
  achievements: string[];
  state: string;
}

interface PersonCardProps {
  person: TribalPerson;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={person.imageUrl}
          alt={person.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          unoptimized
        />
        {/* Overlay with state */}
        <div className="absolute top-4 right-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {person.state}
          </span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
              {person.name}
            </h3>
            <span className="text-sm text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
              {person.tribe}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            {person.title}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {person.description}
        </p>

        {/* Achievements - Show on hover */}
        <div className={`transition-all duration-300 ${
          isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Achievements:</h4>
            <ul className="space-y-1">
              {person.achievements.map((achievement, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className={`transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } mt-4`}>
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm">
            Learn More
          </button>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-0 h-0 border-l-[30px] border-l-orange-500 border-b-[30px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default PersonCard;