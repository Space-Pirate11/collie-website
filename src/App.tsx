import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Success from './components/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main>
                <Hero />
                <HowItWorks />
                <DashboardPreview />
                <AnalyticsDashboard />
                <Benefits />
                <FAQ />
              </main>
              <Footer />
              <Contact />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;