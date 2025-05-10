import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, PawPrint, BatteryMedium, Mail, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>("idle");

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

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="waveform-bg"></div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="mb-6 font-extrabold leading-tight">
              Collie: The AI Smart Collar for Canine Health
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 md:pr-12">
              Continuously monitor your dog's health vitals and receive early warning insights, powered by advanced AI.
            </p>

            {/* Email Signup Form */}
            <div className="mb-8">
              <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="btn-primary whitespace-nowrap"
                >
                  {status === 'submitting' ? (
                    'Subscribing...'
                  ) : status === 'success' ? (
                    'Subscribed!'
                  ) : (
                    <>Get Notified <ArrowRight size={16} className="ml-2" /></>
                  )}
                </button>
              </form>
              {/* Response Message */}
              <div className="mt-3 min-h-[1.5rem] text-left">
                {responseMessage && (
                  <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {responseMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing" className="btn-primary">
                Pre-Order ($20 Deposit)
              </a>
            </div>

            {/* Vital Stats Grid */}
            <div className="mt-12 grid grid-cols-2 gap-6 max-w-md mx-auto md:mx-0">
              <VitalStat icon={<Heart size={24} className="text-cyan-400" />} label="Heart Rate" value="75 bpm" change="+2%" />
              <VitalStat icon={<Activity size={24} className="text-purple-400" />} label="Activity" value="Active" change="20 min" />
              <VitalStat icon={<PawPrint size={24} className="text-cyan-400" />} label="Steps" value="2,457" change="+15%" />
              <VitalStat icon={<BatteryMedium size={24} className="text-purple-400" />} label="Battery" value="85%" change="3.2 days" />
            </div>
          </motion.div>

          {/* Right Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="relative glass-card p-8 rounded-3xl max-w-sm mx-auto backdrop-blur-lg">
                <img
                  src="/sni.png"
                  alt="Collie Smart Collar on a dog"
                  className="rounded-xl shadow-lg w-full object-cover aspect-square"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src='/sni.png';
                   }}
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Collie</h3>
                    <p className="text-gray-400">Smart Health Collar</p>
                  </div>
                  <span className="glass-card px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-400 whitespace-nowrap flex-shrink-0">
                    Pre-Orders Open
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Reusable VitalStat component
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

export default Hero;