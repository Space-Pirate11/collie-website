import React from 'react';
import { Activity, Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="pt-20 pb-10 bg-charcoal border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Get Launch Updates</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know when Collie becomes available and get exclusive early-bird offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <button className="btn-primary flex items-center justify-center">
                Subscribe <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                <Activity size={28} strokeWidth={1.5} />
                <span className="text-xl font-bold">Collie</span>
              </div>
              <p className="text-gray-300 mb-6">
                The AI-powered smart collar for continuous canine health monitoring.
              </p>
            </div>
            
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Connect with us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Collie Health Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;