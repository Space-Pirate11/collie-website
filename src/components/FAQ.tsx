import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the Collie collar track my dog's vitals?",
      answer: "Collie uses advanced sensors to continuously monitor your dog's heart rate, respiration, temperature, and movement patterns. These non-invasive sensors maintain contact with your dog's skin through the collar, collecting data that is then processed by our AI algorithms to identify patterns and potential anomalies."
    },
    {
      question: "Is the collar comfortable for my dog to wear?",
      answer: "Yes, Collie is designed with comfort as a priority. The collar is lightweight, adjustable, and made from hypoallergenic materials. The sensors are low-profile and contoured to fit comfortably against your dog's neck without causing irritation, even during extended wear."
    },
    {
      question: "How accurate is the health monitoring?",
      answer: "Collie's health monitoring has been validated in clinical studies to be over 95% accurate for heart rate and respiratory monitoring when compared to veterinary-grade equipment. Our AI becomes increasingly accurate over time as it learns your dog's unique baseline patterns."
    },
    {
      question: "How long does the battery last?",
      answer: "The Collie collar's rechargeable battery typically lasts 5-7 days on a single charge, depending on usage and settings. Charging takes approximately 2 hours using the included magnetic charging cable."
    },
    {
      question: "Can Collie replace regular vet visits?",
      answer: "Collie is designed to complement, not replace, professional veterinary care. The collar provides valuable health insights and early warning signs that can help make vet visits more productive. We recommend maintaining your regular check-up schedule while using the data from Collie to enhance discussions with your veterinarian."
    }
  ];

  return (
    <section id="faq" className="section py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Everything you need to know about Collie
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/10">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-white/5"
                  aria-expanded={activeIndex === index}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <span className="ml-4">
                    {activeIndex === index ? (
                      <Minus size={20} className="text-cyan-400" />
                    ) : (
                      <Plus size={20} className="text-gray-400" />
                    )}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;