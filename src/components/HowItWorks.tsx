import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wifi, BrainCircuit, Bell } from 'lucide-react';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <Wifi className="text-cyan-400" size={32} strokeWidth={1.5} />,
      title: 'Capture',
      description: 'The collar continuously captures vital health data including heart rate, respiration, activity, and sleep patterns.',
    },
    {
      icon: <BrainCircuit className="text-purple-500" size={32} strokeWidth={1.5} />,
      title: 'Analyze',
      description: 'Our AI analyzes the data in real-time, establishing baseline health patterns specific to your dog.',
    },
    {
      icon: <Bell className="text-cyan-400" size={32} strokeWidth={1.5} />,
      title: 'Alert',
      description: 'Receive early-warning alerts for potential health issues before they become serious problems.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="section relative bg-gradient-to-b from-charcoal to-midnight py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Smart monitoring for your dog's health, powered by advanced AI technology
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-8 rounded-xl flex flex-col items-center text-center"
            >
              <div className="p-4 bg-white/5 rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;