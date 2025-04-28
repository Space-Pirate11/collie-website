import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Activity, BatteryMedium, AArrowDown as ZZZ, Calendar, BarChart3 } from 'lucide-react';

const DashboardPreview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section relative py-24 overflow-hidden">
      <div className="absolute inset-0 waveform-bg opacity-5"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Vitals Dashboard Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Get comprehensive insights into your dog's health with our intuitive mobile app
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ul className="space-y-6">
              <DashboardFeature 
                icon={<Heart className="text-cyan-400" />} 
                title="Heart Rate Monitoring" 
                description="Track your dog's heart rate patterns to detect stress, anxiety, or potential cardiac issues."
              />
              <DashboardFeature 
                icon={<Activity className="text-purple-500" />} 
                title="Activity Analysis" 
                description="Monitor daily activity levels, exercise intensity, and calorie burn to maintain optimal fitness."
              />
              <DashboardFeature 
                icon={<ZZZ className="text-cyan-400" />} 
                title="Sleep Patterns" 
                description="Analyze sleep quality, duration, and interruptions to ensure your dog gets proper rest."
              />
              <DashboardFeature 
                icon={<Calendar className="text-purple-500" />} 
                title="Health History" 
                description="Access historical data and trends to share with your veterinarian for comprehensive care."
              />
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative glass-card rounded-3xl overflow-hidden border border-white/10 shadow-xl">
              <div className="bg-charcoal px-4 py-3 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-error-500"></div>
                  <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                  <div className="w-3 h-3 rounded-full bg-success-500"></div>
                </div>
                <div className="text-sm text-gray-400">Collie Dashboard</div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                    <span className="text-xl font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Buddy</h3>
                    <p className="text-sm text-gray-400">Golden Retriever • 3 years</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-success-500/20 text-success-500 text-xs font-medium px-2.5 py-1 rounded-full">Healthy</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Heart size={16} className="text-cyan-400 mr-2" />
                        <span className="text-sm font-medium">Heart Rate</span>
                      </div>
                      <span className="text-xs text-gray-400">Now</span>
                    </div>
                    <div className="text-2xl font-bold">76 bpm</div>
                    <div className="text-xs text-success-500">Normal range (60-140)</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Activity size={16} className="text-purple-500 mr-2" />
                        <span className="text-sm font-medium">Activity</span>
                      </div>
                      <span className="text-xs text-gray-400">Today</span>
                    </div>
                    <div className="text-2xl font-bold">73 min</div>
                    <div className="text-xs text-success-500">+12% above average</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="text-cyan-400 mr-2" />
                      <span className="text-sm font-medium">Weekly Activity</span>
                    </div>
                    <span className="text-xs text-gray-400">Last 7 days</span>
                  </div>
                  <div className="h-24 flex items-end justify-between">
                    {[35, 55, 70, 45, 65, 42, 58].map((height, i) => (
                      <div key={i} className="w-8 rounded-t-sm bg-gradient-to-t from-cyan-500 to-purple-500 opacity-80" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Battery Status:</span>
                  <div className="flex items-center">
                    <BatteryMedium size={16} className="text-success-500 mr-1" />
                    <span className="text-success-500 font-medium">85% (3 days left)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DashboardFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <li className="flex items-start">
      <div className="mt-1 p-2 rounded-full bg-white/5">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </li>
  );
};

export default DashboardPreview;