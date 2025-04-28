import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-charcoal/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 text-cyan-400">
          <Activity size={28} strokeWidth={1.5} />
          <span className="text-xl font-bold">Collie</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
          <a href="#benefits" className="text-gray-300 hover:text-white transition">Benefits</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
        </nav>
        
        <div className="hidden md:flex space-x-4">
          <a href="#pricing" className="btn-outline">Pre-order</a>
          <a href="#contact" className="btn-primary">Join Beta</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-md absolute w-full">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition py-2 px-4 rounded hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition py-2 px-4 rounded hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition py-2 px-4 rounded hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition py-2 px-4 rounded hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <div className="flex flex-col space-y-2 pt-2">
              <a href="#pricing" className="btn-outline w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Pre-order</a>
              <a href="#contact" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Join Beta</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;