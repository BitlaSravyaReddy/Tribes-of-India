import React from 'react';
import Link from 'next/link';

const categories = [
  'Culture',
  'Politics',
  'Education',
  'Health',
  'Arts',
  'Environment',
  'Economy',
  'Technology'
];

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Tribal News</span>
              </a>
            </Link>
          </div>
          <div className="flex space-x-4 items-center overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;