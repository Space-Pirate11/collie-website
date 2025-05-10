import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, PawPrint, BatteryMedium, Mail, ArrowRight, Check, Loader2, Zap, MapPin, BrainCircuit, Bell, Stethoscope, Phone, Moon, History } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';

const Hero = () => {
  const [email, setEmail] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<'lite' | 'pro'>('pro');

  const handleSubscribeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbx8avnNJds9aAt6nNk1U6rMkA2ZVO_2W7IZc2SN-7-TfyNcHYM7R0AolYOACShy4xnGNA/exec';
    
    if (!googleAppsScriptUrl) {
      setResponseMessage("Configuration error: Apps Script URL is not set.");
      setStatus("error");
      return;
    }
    
    setResponseMessage("");
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch(googleAppsScriptUrl, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        try {
          const data = await res.json();
          if (data && data.status === "success") {
            setResponseMessage("Thanks for subscribing! We'll keep you updated.");
            setStatus("success");
            setEmail("");
          } else {
            setResponseMessage(data.message || "Subscription processed, but status unclear.");
            setStatus("success");
            setEmail("");
          }
        } catch (jsonError) {
          console.log("Response OK but not JSON, assuming success.", jsonError);
          setResponseMessage("Thanks for subscribing! We'll keep you updated.");
          setStatus("success");
          setEmail("");
        }
      } else {
        console.error("Subscription failed response:", res.status, res.statusText);
        setResponseMessage(`Subscription failed (${res.status}). Please try again later.`);
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription submission error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResponseMessage(`An error occurred: ${errorMessage}. Please try again.`);
      setStatus("error");
    }
  };

  const handlePreOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = `${window.location.origin}`;

      await createCheckoutSession(
        'price_1RN5iZG21gx2hlRpqdlfeGkl',
        'payment',
        null,
        successUrl,
        cancelUrl
      );
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="waveform-bg"></div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Collie: The World's Smartest Dog Collar
            </h1>
            
            <div className="glass-card inline-block p-4 rounded-xl mb-8 bg-white/5">
              <p className="text-white font-extrabold text-xl">Going to the vet sucks. Collie changes that.</p>
            </div>

            {/* Vital Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <VitalStat icon={<Heart size={24} className="text-cyan-400" />} label="Heart Rate" value="75 bpm" change="+2%" />
              <VitalStat icon={<Activity size={24} className="text-purple-400" />} label="Activity" value="Active" change="20 min" />
              <VitalStat icon={<PawPrint size={24} className="text-cyan-400" />} label="Steps" value="2,457" change="+15%" />
              <VitalStat icon={<BatteryMedium size={24} className="text-purple-400" />} label="Battery" value="85%" change="3.2 days" />
              <VitalStat icon={<Moon size={24} className="text-cyan-400" />} label="Sleep" value="8h 32m" change="Deep" />
              <VitalStat icon={<History size={24} className="text-purple-400" />} label="History" value="30 days" change="View" />
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  required
                  disabled={status === 'submitting'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="btn-outline whitespace-nowrap"
              >
                {status === 'submitting' ? (
                  'Subscribing...'
                ) : status === 'success' ? (
                  'Subscribed!'
                ) : (
                  <>Get Updates <ArrowRight size={16} className="ml-2" /></>
                )}
              </button>
            </form>

            {/* Response Message */}
            <div className="mt-3 min-h-[1.5rem]">
              {responseMessage && (
                <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {responseMessage}
                </p>
              )}
            </div>
          </motion.div>

          {/* Right Column: Product Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <img
              src="/sni.png"
              alt="Collie Smart Collar on a dog"
              className="w-full aspect-video object-cover rounded-2xl mb-8"
            />

            {/* Product Selection */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              <ProductCard
                title="Lite"
                price="$59"
                subscription="$5/mo"
                isSelected={selectedProduct === 'lite'}
                onClick={() => setSelectedProduct('lite')}
                features={[
                  { icon: <Activity size={18} />, text: "3-axis IMU activity tracking" },
                  { icon: <PawPrint size={18} />, text: "Scratch & lick detection" },
                  { icon: <BatteryMedium size={18} />, text: "2-month battery life" },
                  { icon: <BrainCircuit size={18} />, text: "AI-powered insights" },
                  { icon: <Stethoscope size={18} />, text: "Optional vet connection" },
                ]}
              />
              <ProductCard
                title="Pro"
                price="$249"
                subscription="$10/mo"
                isSelected={selectedProduct === 'pro'}
                onClick={() => setSelectedProduct('pro')}
                features={[
                  { icon: <Heart size={18} />, text: "Vital monitoring (HR, RR, HRV)" },
                  { icon: <MapPin size={18} />, text: "GPS tracking & geofencing" },
                  { icon: <Phone size={18} />, text: "Cellular connectivity" },
                  { icon: <Bell size={18} />, text: "Emergency alerts" },
                  { icon: <Zap size={18} />, text: "All Lite features included" },
                ]}
              />
            </div>

            {/* Pre-order Button */}
            <div className="glass-card p-6 rounded-xl text-center mt-6">
              <button
                onClick={handlePreOrder}
                disabled={isLoading}
                className="btn-primary w-full mb-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  'Pre-Order Now ($20 Deposit)'
                )}
              </button>
              <p className="text-sm text-gray-400">
                Deposit will be applied to your choice of Lite or Pro at shipping
              </p>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VitalStat = ({ icon, label, value, change }: { icon: React.ReactNode, label: string, value: string, change: string }) => {
  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-300">{label}</span>
      </div>
      <div className="flex justify-between items-end">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-gray-400">{change}</span>
      </div>
    </div>
  );
};

interface ProductCardProps {
  title: string;
  price: string;
  subscription: string;
  isSelected: boolean;
  onClick: () => void;
  features: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

const ProductCard = ({ title, price, subscription, isSelected, onClick, features }: ProductCardProps) => (
  <div
    onClick={onClick}
    className={`glass-card p-6 rounded-xl cursor-pointer transition-all duration-300 h-full flex flex-col ${
      isSelected ? 'border-2 border-cyan-500 bg-white/10' : 'border border-white/10 hover:bg-white/10'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="text-2xl font-bold text-cyan-400">{price}</div>
    </div>
    <p className="text-sm text-gray-400 mb-4">{subscription} for data & vet connection</p>
    <ul className="space-y-3 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <span className="text-cyan-400">{feature.icon}</span>
          <span className="text-gray-300">{feature.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Hero;