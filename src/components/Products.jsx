import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Star, MessageCircle } from 'lucide-react';

const Products = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const products = [
    {
      id: 1,
      name: "Pure Turmeric Face Pack",
      category: "Skincare",
      price: "₹299",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      description: "Natural turmeric and honey blend for glowing skin"
    },
    {
      id: 2,
      name: "Herbal Hair Oil",
      category: "Hair Care",
      price: "₹449",
      image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      description: "Ayurvedic blend for strong, healthy hair"
    },
    {
      id: 3,
      name: "Organic Body Scrub",
      category: "Body Care",
      price: "₹349",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      description: "Exfoliating scrub with natural sea salt"
    },
    {
      id: 4,
      name: "Neem & Basil Soap",
      category: "Cleansing",
      price: "₹149",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      description: "Antibacterial soap for sensitive skin"
    },
    {
      id: 5,
      name: "Rose Water Toner",
      category: "Skincare",
      price: "₹199",
      image: "https://images.pexels.com/photos/4202926/pexels-photo-4202926.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      description: "Pure rose water for natural skin toning"
    },
    {
      id: 6,
      name: "Coconut Body Butter",
      category: "Body Care",
      price: "₹399",
      image: "https://images.pexels.com/photos/4465540/pexels-photo-4465540.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      description: "Rich moisturizer with pure coconut oil"
    }
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, products.length));
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span style={{ color: 'rgb(190, 150, 63)' }}>Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our carefully curated collection of natural products, each crafted with love and the finest ingredients nature has to offer.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, visibleCount).map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                    {product.category}
                  </div> */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className='items-start justify-between lg:flex md:flex'>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                    </div>
                    <span className='flex items-center gap-1.5 mb-2.5 lg:mb-0 md:mb-0'>
                      <span className="text-2xl font-bold" style={{ color: 'rgb(190, 150, 63)' }}>{product.price}</span>
                      <span className="text-1xl font-light line-through" style={{ color: '#c9c9c9' }}>{product.price}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                      <MessageCircle className="w-4 h-4" />
                      <span>Enquire Now</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(product.id)}
                      className="flex items-center space-x-2 rounded-full underline text-[#c9c9c9] font-semibold cursor-pointer transition-all duration-300 transform hover:text-blue-950"
                      styl={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                      {/* <MessageCircle className="w-4 h-4" /> */}
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          {visibleCount < products.length && (
            <div className="text-center mt-16">
              <button className="px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{
                  borderColor: 'rgb(190, 150, 63)',
                  color: 'rgb(190, 150, 63)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(190, 150, 63)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(190, 150, 63)';
                }}
                onClick={handleViewMore}
              >
                View More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;