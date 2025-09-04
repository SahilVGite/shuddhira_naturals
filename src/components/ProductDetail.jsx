
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowLeft, Star, MessageCircle, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');

  // Mock product data - in real app this would come from API
  const products = [
    {
      id: 1,
      name: "Pure Turmeric Face Pack",
      category: "Skincare",
      price: "₹299",
      images: [
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      rating: 4.8,
      description: "Natural turmeric and honey blend for glowing skin",
      longDescription: "Our Pure Turmeric Face Pack is a luxurious blend of organic turmeric, raw honey, and carefully selected herbs that work together to brighten, nourish, and rejuvenate your skin. This time-tested formula draws from ancient Ayurvedic wisdom to deliver modern skincare results.",
      ingredients: ["Organic Turmeric", "Raw Honey", "Sandalwood Powder", "Rose Water", "Neem Extract"],
      benefits: ["Brightens skin tone", "Reduces inflammation", "Anti-aging properties", "Natural glow", "Fights acne"],
      howToUse: [
        "Mix 1-2 teaspoons with rose water or milk",
        "Apply evenly on clean face and neck",
        "Leave for 15-20 minutes until dry",
        "Rinse with lukewarm water",
        "Use 2-3 times per week for best results"
      ],
      reviews: [
        {
          id: 1,
          name: "Priya Sharma",
          rating: 5,
          comment: "Amazing product! My skin feels so soft and glowing after using this face pack. Highly recommended!",
          date: "2024-12-15"
        },
        {
          id: 2,
          name: "Anjali Patel",
          rating: 5,
          comment: "Love the natural ingredients. No harsh chemicals and gives instant glow. Will definitely buy again.",
          date: "2024-12-10"
        },
        {
          id: 3,
          name: "Meera Singh",
          rating: 4,
          comment: "Good quality product. Takes time to show results but worth the wait. Packaging is also nice.",
          date: "2024-12-05"
        }
      ]
    },
    {
      id: 2,
      name: "Herbal Hair Oil",
      category: "Hair Care",
      price: "₹449",
      images: [
        "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      rating: 4.9,
      description: "Ayurvedic blend for strong, healthy hair",
      longDescription: "Our Herbal Hair Oil is a potent blend of traditional Ayurvedic herbs and oils that nourish your scalp and strengthen your hair from root to tip.",
      ingredients: ["Coconut Oil", "Amla Extract", "Bhringraj", "Fenugreek", "Curry Leaves"],
      benefits: ["Promotes hair growth", "Reduces hair fall", "Adds natural shine", "Strengthens roots"],
      howToUse: [
        "Warm the oil slightly before use",
        "Massage gently into scalp and hair",
        "Leave for 2-3 hours or overnight",
        "Wash with mild shampoo"
      ],
      reviews: [
        {
          id: 1,
          name: "Kavya Reddy",
          rating: 5,
          comment: "Best hair oil I've ever used! My hair fall has reduced significantly.",
          date: "2024-12-12"
        }
      ]
    }
  ];

  const product = products.find(p => p.id === parseInt(id || '1'));
  const relatedProducts = products.filter(p => p.id !== (product && product.id) && p.category === (product && product.category));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/shuddhira_naturals')}
            className="px-6 py-3 bg-amber-500 text-white cursor-pointer rounded-lg hover:bg-amber-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const scrollToContact = () => {
    navigate('/shuddhira_naturals', { state: { scrollToContact: true, productName: product.name } });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-amber-600 transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/#products')} className="hover:text-amber-600 transition-colors">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group">
              <img 
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'border-amber-500 shadow-lg' 
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {/* <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                  {product.category}
                </span>
              </div> */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{product.reviews.length} reviews</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{product.longDescription}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold" style={{ color: 'rgb(190, 150, 63)' }}>
                  {product.price}
                </span>
                <button className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={scrollToContact}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 text-white font-semibold cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  style={{ backgroundColor: 'rgb(190, 150, 63)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enquire Now</span>
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  Contact us for bulk orders and custom requirements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'usage', label: 'How to Use' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    selectedTab === tab.id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">{product.longDescription}</p>
              </div>
            )}

            {selectedTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Natural Ingredients</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(190, 150, 63)' }}></div>
                      <span className="text-gray-700 font-medium">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'benefits' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'usage' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use</h3>
                <div className="space-y-4">
                  {product.howToUse.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating} out of 5)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: 'rgb(190, 150, 63)' }}>
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related <span style={{ color: 'rgb(190, 150, 63)' }}>Products</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{relatedProduct.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold" style={{ color: 'rgb(190, 150, 63)' }}>
                        {relatedProduct.price}
                      </span>
                      <span className="text-sm text-amber-600 font-medium">View Details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-8 left-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
        style={{ backgroundColor: 'rgb(190, 150, 63)' }}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductDetail;