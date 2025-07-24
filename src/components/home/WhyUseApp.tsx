// src/components/home/WhyUseApp.tsx
'use client';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const WhyUseApp = () => {
  const features: FeatureItem[] = [
    {
      id: 1,
      title: "Interactive Learning",
      description: "Explore tribal cultures through our interactive map, engaging chatbot, and immersive content that brings history to life.",
      icon: "🗺️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Authentic Products",
      description: "Shop for genuine tribal handicrafts, artwork, and traditional items directly from tribal artisans and communities.",
      icon: "🛍️",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Real-time Updates",
      description: "Stay informed with the latest news, events, and developments related to tribal communities across India.",
      icon: "📰",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Data Insights",
      description: "Access comprehensive analytics and data visualizations about tribal demographics, culture, and development.",
      icon: "📊",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "AI-Powered Chat",
      description: "Get instant answers about tribal history, culture, and traditions through our intelligent chatbot assistant.",
      icon: "🤖",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "Cultural Preservation",
      description: "Contribute to preserving and promoting India's rich tribal heritage for future generations.",
      icon: "🏛️",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Why Choose Our Platform?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover, learn, and connect with India's vibrant tribal heritage through our comprehensive digital platform designed to educate, preserve, and celebrate indigenous cultures.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <span className="filter drop-shadow-sm">
                {feature.icon}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore India's Tribal Heritage?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are discovering and celebrating the rich cultural tapestry of India's indigenous communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Start Exploring
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-orange-500 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
        {[
          { number: "700+", label: "Tribal Communities" },
          { number: "50M+", label: "Tribal Population" },
          { number: "29", label: "States Covered" },
          { number: "10K+", label: "Artifacts Documented" }
        ].map((stat, index) => (
          <div key={index} className="p-6">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUseApp;