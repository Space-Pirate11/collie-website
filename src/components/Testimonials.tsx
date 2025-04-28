import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Golden Retriever Owner",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Collie alerted me about irregular heart patterns before my dog showed any symptoms. The vet confirmed early signs of heart disease, and we were able to start treatment right away.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Veterinarian",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "As a veterinarian, I'm impressed by the accuracy of Collie's health data. It gives us valuable insights that weren't previously accessible without invasive procedures.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Border Collie Owner",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "The activity tracking feature has been a game-changer. I've optimized my dog's exercise routine, and she's more energetic and healthier than ever.",
      rating: 4
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const partners = [
    "Central Pet Hospital",
    "VetTech Associates",
    "PawHealth Clinic",
    "Animal Care Center"
  ];

  return (
    <section className="section py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Hear what pet owners and veterinarians have to say about Collie
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto relative">
            <div className="absolute top-6 right-8">
              <div className="flex">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-gray-400" />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <blockquote className="text-xl italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition mr-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Trusted by veterinarians nationwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="text-gray-300 font-medium text-lg">
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;