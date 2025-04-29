import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, PawPrint, BatteryMedium } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Assuming waveform-bg is defined in your CSS */}
      <div className="waveform-bg"></div>

      <div className="container-custom relative z-10"> {/* Ensure container-custom provides necessary padding/max-width */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="mb-6 font-extrabold leading-tight"> {/* Ensure h1 styles are defined globally or via Tailwind */}
              Collie: The AI Smart Collar for Canine Health
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 md:pr-12">
              Continuously monitor your dog's health vitals and receive early warning insights, powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing" className="btn-primary"> {/* Ensure btn-primary styles are defined */}
                Pre-Orders Open Soon
              </a>
              <a href="#contact" className="btn-outline"> {/* Ensure btn-outline styles are defined */}
                Join Beta Program
              </a>
            </div>

            {/* Vital Stats Section */}
            <div className="mt-12 grid grid-cols-2 gap-6 max-w-md mx-auto md:mx-0">
              <VitalStat icon={<Heart size={24} className="text-cyan-400" />} label="Heart Rate" value="75 bpm" change="+2%" />
              <VitalStat icon={<Activity size={24} className="text-purple-400" />} label="Activity" value="Active" change="20 min" />
              <VitalStat icon={<PawPrint size={24} className="text-cyan-400" />} label="Steps" value="2,457" change="+15%" />
              <VitalStat icon={<BatteryMedium size={24} className="text-purple-400" />} label="Battery" value="85%" change="3.2 days" />
            </div>
          </motion.div>

          {/* Image Card Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>
              {/* Image Card */}
              <div className="relative glass-card p-8 rounded-3xl max-w-sm mx-auto backdrop-blur-lg"> {/* Ensure glass-card styles are defined */}
                <img
                  src="https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&h=650"
                  alt="Collie Smart Collar on a dog"
                  className="rounded-xl shadow-lg w-full object-cover aspect-square"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Collie</h3>
                    <p className="text-gray-400">Smart Health Collar</p>
                  </div>
                  {/* Pre-Order Tag - Size changed here */}
                  <span className="glass-card px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400"> {/* Changed text-sm to text-xs */}
                    Pre-Orders Open Soon
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

// VitalStat Component (remains unchanged)
const VitalStat = ({ icon, label, value, change }: { icon: React.ReactNode, label: string, value: string, change: string }) => {
  return (
    <div className="glass-card p-4 rounded-xl"> {/* Ensure glass-card styles are defined */}
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