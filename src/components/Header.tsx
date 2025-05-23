import React, { useState, useEffect } from 'react';

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
      {/* Added 'relative' positioning context */}
      <div className="container-custom relative flex justify-between items-center"> 
        {/* --- Logo Section --- */}
        <a href="#" className="flex items-center"> 
          <img 
            src="/final.png" 
            alt="Collie Logo" 
            className="h-8 w-auto" 
          />
          <span className="ml-2 text-xl font-bold text-white-400"> 
            Collie 
          </span>
        </a>
        {/* --- End Logo Section --- */}
        
        {/* --- Desktop Navigation Centered --- */}
        {/* Added absolute positioning for centering */}
        <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2"> 
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
          <a href="#benefits" className="text-gray-300 hover:text-white transition">Benefits</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
        </nav>
        {/* --- End Desktop Navigation --- */}
        
        {/* --- Action Buttons --- */}
        {/* This div remains positioned by the parent's justify-between */}
        <div className="hidden md:flex space-x-4">
          <a href="#pricing" className="btn-outline">Pre-Order ($20)</a>
          <a href="#contact" className="btn-primary">Get Notified</a>
        </div>
        {/* --- End Action Buttons --- */}
        
        {/* Mobile Menu Button */}
        {/* This remains on the right because the parent uses justify-between */}
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
              <a href="#pricing" className="btn-outline w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Pre-order ($20)</a>
              <a href="#contact" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Get Notified</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;