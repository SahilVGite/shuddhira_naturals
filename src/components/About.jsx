import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Leaf, Heart, Award } from 'lucide-react';

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "All our products are made from pure, natural ingredients sourced responsibly from nature."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Love",
      description: "Each product is crafted with care and attention to detail, ensuring the highest quality for your wellness."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "We maintain the highest standards in production, testing, and packaging to deliver excellence."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span style={{ color: 'rgb(190, 150, 63)' }}>Shuddhira Naturals</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of nature to heal, nourish, and rejuvenate. Our journey began with a simple 
              mission: to bring you the purest, most effective natural products that honor both your wellness and our planet.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Our Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every ingredient we use is carefully selected for its purity and potency. We work directly with 
                farmers and suppliers who share our commitment to sustainable, ethical practices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From ancient Ayurvedic wisdom to modern scientific research, we combine traditional knowledge 
                with contemporary innovation to create products that truly make a difference in your daily wellness routine.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-1 rounded-full" style={{ backgroundColor: 'rgb(190, 150, 63)' }}></div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Naturally Pure
                </span>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Natural ingredients"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                100%<br/>Pure
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;