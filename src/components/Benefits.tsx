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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: <Stethoscope className="text-cyan-400" strokeWidth={1.5} size={32} />, // Added className
      title: 'Early Illness Detection',
      description:
        'Identify potential health issues before they become serious problems with AI-powered anomaly detection.'
    },
    {
      icon: <FileText className="text-purple-500" strokeWidth={1.5} size={32} />, // Added className
      title: 'Vet-Ready Reports',
      description:
        'Share comprehensive health data with your veterinarian for more informed diagnosis and treatment.'
    },
    {
      icon: <ActivitySquare className="text-cyan-400" strokeWidth={1.5} size={32} />, // Added className
      title: 'Activity Optimization',
      description:
        'Ensure your dog gets the right amount of exercise based on breed, age, and health condition.'
    },
    {
      icon: <HeartPulse className="text-purple-500" strokeWidth={1.5} size={32} />, // Added className
      title: 'Peace of Mind',
      description:
        "Rest easy knowing you'll be alerted to changes in your dog's health status 24/7."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="benefits"
      className="section py-24 bg-gradient-to-b from-midnight to-charcoal"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Benefits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Why Collie is the leading health monitoring solution for your canine
            companion
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-8 rounded-xl group hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300"
            >
              {/* Icon Display Structure - Simplified */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-px mb-6">
                <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                  {/* Render the icon directly - its color is now set via className */}
                  {benefit.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;