import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Contact from './components/Contact'; // Adjust the path if necessary

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <DashboardPreview />
        <AnalyticsDashboard />
        <Benefits />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;