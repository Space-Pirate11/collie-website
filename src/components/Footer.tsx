import React, { useState, FormEvent } from 'react';
import { Activity, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="pt-20 pb-10 bg-charcoal border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-6">
              Have questions about Collie? We're here to help.
            </p>
            <div className="mb-6">
              <a href="mailto:thecollieteam@gmail.com" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors duration-200">
                <Mail size={20} />
                thecollieteam@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column */}
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;