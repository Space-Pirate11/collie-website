import React from 'react';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="py-16 bg-charcoal border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center space-x-2 text-cyan-400 mb-4">
              <Activity size={28} strokeWidth={1.5} />
              <span className="text-xl font-bold">Collie</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Have Questions?</h2>
            <p className="text-gray-300 mb-6">
              We're here to help with any questions about Collie's features, pre-orders, or how it can benefit your dog's health.
            </p>
            <a 
              href="mailto:thecollieteam@gmail.com" 
              className="text-xl text-cyan-400 hover:text-white transition-colors duration-200"
            >
              thecollieteam@gmail.com
            </a>
            <p className="text-sm text-gray-400 mt-4">
              Based in Champaign, IL • Shipping worldwide
            </p>
          </div>

          {/* Company Info */}
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">About Collie</h2>
            <p className="text-gray-300 mb-6">
              Collie is revolutionizing pet healthcare with AI-powered monitoring technology. Our smart collar provides continuous health tracking and early warning insights, giving pet owners peace of mind and veterinarians valuable health data.
            </p>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Collie. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;