import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Collar + App",
      monthlyPrice: 20,
      annualPrice: 199,
      features: [
        "Smart collar device",
        "Mobile app access",
        "Continuous health monitoring",
        "Personalized health insights",
        "Activity tracking",
        "Sleep analysis",
        "1-year hardware warranty",
        "30-day health data storage",
      ],
      notIncluded: [
        "Veterinarian portal access",
        "Extended 2-year warranty",
        "Premium health analytics",
        "Unlimited data storage",
      ],
      popular: false,
    },
    {
      name: "Collar + App + Vet Portal",
      monthlyPrice: 25,
      annualPrice: 249,
      features: [
        "Smart collar device",
        "Mobile app access",
        "Continuous health monitoring",
        "Personalized health insights",
        "Activity tracking",
        "Sleep analysis",
        "Veterinarian portal access",
        "Sharable health reports",
        "Extended 2-year warranty",
        "Premium health analytics",
        "Unlimited data storage",
        "Priority customer support",
      ],
      notIncluded: [],
      popular: true,
    },
  ];

  const subscriptionVariants = {
    monthly: { x: 0 },
    annual: { x: "100%" },
  };

  return (
    <section id="pricing" className="section py-24 bg-gradient-to-b from-charcoal to-midnight">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Choose the plan that's right for you and your furry friend
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-1 rounded-full inline-flex">
            <div className="relative">
              <div className="flex">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition ${
                    !isAnnual ? "text-white" : "text-gray-400"
                  }`}
                >
                  Monthly
                </button>  
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition ${
                    isAnnual ? "text-white" : "text-gray-400"
                  }`}
                >
                  Annual 
                </button>
              </div>
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                variants={subscriptionVariants}
                animate={isAnnual ? "annual" : "monthly"}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`glass-card rounded-2xl overflow-hidden ${
                plan.popular ? "border-2 border-cyan-500" : "border border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-1.5 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-400 ml-2 pb-1">
                      {isAnnual ? "/mo" : "/mo"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-gray-400 mt-1">
                      Billed annually (${plan.annualPrice * 12})
                    </p>
                  )}
                </div>
                
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Pre-order Now
                </button>
                
                <div>
                  <p className="font-medium mb-4">What's included:</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className="text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <p className="font-medium mb-4 text-gray-400">Not included:</p>
                      <ul className="space-y-3">
                        {plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-500">
                            <X size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            All plans include free shipping. 30-day money-back guarantee.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;