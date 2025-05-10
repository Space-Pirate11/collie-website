import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-charcoal border-t border-white/5">
      <div className="container-custom">
        <div className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Collie. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;