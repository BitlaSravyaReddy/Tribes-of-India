// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tribes of India - Discover Indigenous Heritage',
  description: 'Explore the rich cultural heritage, traditions, and stories of India\'s diverse tribal communities.',
  keywords: 'tribes, india, indigenous, culture, heritage, traditional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// // If you want to use Geist instead, uncomment the next lines:
// // import { GeistSans } from 'geist/font/sans';
// // import { GeistMono } from 'geist/font/mono';

// import './globals.css';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import { Toaster } from '@/components/ui/toaster';

// const inter = Inter({ subsets: ['latin'] });
// // If using Geist instead of Inter:
// // const geistSans = GeistSans;
// // const geistMono = GeistMono;

// export const metadata: Metadata = {
//   title: 'Tribes of India - Discover Indigenous Heritage',
//   description: 'Explore the rich cultural heritage, traditions, and stories of India\'s diverse tribal communities.',
//   keywords: 'tribes, india, indigenous, culture, heritage, traditional',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} antialiased`} // Replace with `${geistSans.variable} ${geistMono.variable} font-sans antialiased` if using Geist
//       >
//         <Navbar />
//         <div className="pt-16">
//           {children}
//         </div>
//         <Footer />
//         <Toaster />
//       </body>
//     </html>
//   );
// }
