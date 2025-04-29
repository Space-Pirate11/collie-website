import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Stethoscope,
  FileText,
  ActivitySquare,
  HeartPulse
} from 'lucide-react';

const Benefits = () => {
  // Hook to detect when the component is in view
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.1,   // Trigger when 10% of the element is visible
  });

  // Array containing benefit data including icon components
  const benefits = [
    {
      icon: <Stethoscope strokeWidth={1.5} size={32} />, // Icon component instance
      title: 'Early Illness Detection',
      description: 'Identify potential health issues before they become serious problems with AI-powered anomaly detection.'
    },
    {
      icon: <FileText strokeWidth={1.5} size={32} />, // Icon component instance
      title: 'Vet-Ready Reports',
      description: 'Share comprehensive health data with your veterinarian for more informed diagnosis and treatment.'
    },
    {
      icon: <ActivitySquare strokeWidth={1.5} size={32} />, // Icon component instance
      title: 'Activity Optimization',
      description: 'Ensure your dog gets the right amount of exercise based on breed, age, and health condition.'
    },
    {
      icon: <HeartPulse strokeWidth={1.5} size={32} />, // Icon component instance
      title: 'Peace of Mind',
      description: 'Rest easy knowing you\'ll be alerted to changes in your dog\'s health status 24/7.'
    }
  ];

  // Animation variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  // Animation variants for each benefit item (fade in and slide up)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="benefits" className="section py-24 bg-gradient-to-b from-midnight to-charcoal">
      <div className="container-custom"> {/* Ensure container-custom provides necessary padding/max-width */}
        <div className="text-center mb-16">
          {/* Animated Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title" // Make sure 'section-title' is defined in your CSS/Tailwind config
          >
            Benefits
          </motion.h2>
          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle" // Make sure 'subtitle' is defined in your CSS/Tailwind config
          >
            Why Collie is the leading health monitoring solution for your canine companion
          </motion.p>
        </div>

        {/* Animated Grid Container */}
        <motion.div
          ref={ref} // Attach the ref for intersection observer
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate when in view
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" // Responsive grid layout
        >
          {/* Map through benefits data to render each card */}
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants} // Apply item animation variants
              className="glass-card p-8 rounded-xl group hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300" // Styling for the card, ensure 'glass-card' is defined
            >
              {/* Icon Display Structure */}
              {/* 1. Gradient Border Circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-px mb-6">
                 {/* 2. Inner Background Circle */}
                <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                  {/* 3. Icon container with gradient text effect */}
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {/* Render the actual icon component */}
                    {benefit.icon}
                  </div>
                </div>
              </div>
              {/* Benefit Title */}
              <h3 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                {benefit.title}
              </h3>
              {/* Benefit Description */}
              <p className="text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;