// src/components/layout/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Tribes of India</h3>
                <p className="text-gray-400 text-sm">Cultural Heritage Platform</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Preserving and celebrating the rich cultural heritage of India's diverse tribal communities through technology, education, and authentic storytelling.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: '📘' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'Instagram', icon: '📷' },
                { name: 'YouTube', icon: '📺' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Interactive Map', href: '/map' },
                { name: 'Chatbot', href: '/chatbot' },
                { name: 'E-Store', href: '/e-store' },
                { name: 'News', href: '/news' },
                { name: 'Analytics', href: '/analytics' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="text-orange-500 mr-2">▶</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contact & Support</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">📧</span>
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:info@tribesofindia.com" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    info@tribesofindia.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">📞</span>
                <div>
                  <p className="text-gray-300">Phone</p>
                  <a href="tel:+91-xxx-xxx-xxxx" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    +91-XXX-XXX-XXXX
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">📍</span>
                <div>
                  <p className="text-gray-300">Address</p>
                  <p className="text-sm text-gray-400">
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2 text-orange-400">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news and updates about tribal communities
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Tribes of India. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with ❤️ for preserving indigenous heritage
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Accessibility'
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400 text-xs text-center">
              This platform is dedicated to promoting and preserving the cultural heritage of India's tribal communities. 
              We work in collaboration with tribal leaders, scholars, and cultural organizations to ensure authentic representation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;