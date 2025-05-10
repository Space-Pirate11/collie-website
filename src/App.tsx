import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Success from './components/Success';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
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
                  <Pricing />
                  <FAQ />
                </main>
                <Footer />
                <Contact />
              </div>
            }
          />
        </Routes>
      </Router>
    </SessionContextProvider>
  );
}

export default App;