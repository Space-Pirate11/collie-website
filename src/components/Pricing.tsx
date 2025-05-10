import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Loader2 } from 'lucide-react';
import { products } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/pricing`;

      await createCheckoutSession(
        products.collie.priceId,
        products.collie.mode,
        null,
        successUrl,
        cancelUrl
      );

      // No need to handle the URL redirect as Stripe.js handles it automatically
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Pre-Order Now
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Secure your Collie with a $20 deposit
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl overflow-hidden border-2 border-cyan-500">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-1.5 px-4 text-center text-sm font-medium">
              Limited Time Offer
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Collie Smart Collar</h3>
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">$20</span>
                  <span className="text-gray-400 ml-2 pb-1">deposit</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Applied to final purchase price
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  {error}
                </div>
              )}
              
              <button 
                onClick={handlePreOrder}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-medium mb-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  'Pre-Order Now'
                )}
              </button>
              
              <div>
                <p className="font-medium mb-4">What's included:</p>
                <ul className="space-y-3 mb-6">
                  <Feature text="Smart collar device" />
                  <Feature text="Mobile app access" />
                  <Feature text="Continuous health monitoring" />
                  <Feature text="Personalized health insights" />
                  <Feature text="Activity tracking" />
                  <Feature text="Sleep analysis" />
                  <Feature text="1-year hardware warranty" />
                  <Feature text="Priority shipping" />
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Free shipping. 30-day money-back guarantee.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Feature = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <Check size={18} className="text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </li>
);

export default Pricing;