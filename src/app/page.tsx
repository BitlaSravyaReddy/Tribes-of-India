// src/app/page.tsx
import ImageSlider from '@/components/home/ImageSlider';
import FamousTribalPeople from '@/components/home/FamousTribalPeople';
import WhyUseApp from '@/components/home/WhyUseApp';


export default function HomePage() {
  
  return (
    <main className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative">
        <ImageSlider />
      </section>

      {/* Famous Tribal People Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Legendary Tribal Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the inspiring stories of tribal heroes who shaped India's rich cultural heritage
            </p>
          </div>
          <FamousTribalPeople />
        </div>
      </section>

      {/* Why Use Our App Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <WhyUseApp />
        </div>
      </section>
    </main>
  );
}