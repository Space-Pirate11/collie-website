import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Activity, BatteryMedium, Moon } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AnalyticsDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [heartRate, setHeartRate] = useState(110);
  const [heartRateData, setHeartRateData] = useState(() => 
    Array(60).fill(0).map((_, i) => ({
      time: i,
      value: Math.floor(Math.random() * 20) + 100
    }))
  );

  const weeklyTrendData = [
    { day: 'Mon', value: 85, label: '85%' },
    { day: 'Tue', value: 92, label: '92%' },
    { day: 'Wed', value: 88, label: '88%' },
    { day: 'Thu', value: 95, label: '95%' },
    { day: 'Fri', value: 89, label: '89%' },
    { day: 'Sat', value: 93, label: '93%' },
    { day: 'Sun', value: 91, label: '91%' }
  ];

  const activityData = [
    { time: '6am', active: 10, rest: 50 },
    { time: '8am', active: 30, rest: 30 },
    { time: '10am', active: 45, rest: 15 },
    { time: '12pm', active: 25, rest: 35 },
    { time: '2pm', active: 50, rest: 10 },
    { time: '4pm', active: 35, rest: 25 },
    { time: '6pm', active: 15, rest: 45 },
    { time: '8pm', active: 5, rest: 55 },
  ];

  const sleepStages = [
    { time: '10pm', stage: 'Awake' },
    { time: '10:30pm', stage: 'Light' },
    { time: '11pm', stage: 'Deep' },
    { time: '12am', stage: 'Deep' },
    { time: '1am', stage: 'REM' },
    { time: '2am', stage: 'Light' },
    { time: '3am', stage: 'Deep' },
    { time: '4am', stage: 'REM' },
    { time: '5am', stage: 'Light' },
    { time: '6am', stage: 'Awake' },
  ];

  const sleepSummary = [
    { stage: 'Deep', hours: '2h 27m', color: '#3B82F6' },
    { stage: 'Core', hours: '4h 39m', color: '#06B6D4' },
    { stage: 'REM', hours: '1h 58m', color: '#8B5CF6' },
    { stage: 'Awake', hours: '32m', color: '#EC4899' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartRate = Math.floor(Math.random() * 5) + 100;
      setHeartRate(newHeartRate);
      setHeartRateData(prev => [...prev.slice(1), { time: prev.length, value: newHeartRate }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="section py-24 bg-gradient-to-b from-midnight to-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Advanced Analytics Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle"
          >
            Comprehensive health insights powered by AI
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ---------- Left column ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Heart rate */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="text-cyan-400" size={20} />
                  <h3 className="text-lg font-semibold">Heart Rate</h3>
                </div>
                <div className="text-2xl font-bold text-cyan-400">
                  {heartRate} <span className="text-sm text-gray-400">bpm</span>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData}>
                    <YAxis domain={[90, 130]} stroke="#9CA3AF" />
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="glass-card p-2 rounded border border-white/10">
                            <p className="text-sm text-cyan-400">{payload[0].value} bpm</p>
                          </div>
                        ) : null
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily activity */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-purple-500" size={20} />
                <h3 className="text-lg font-semibold">Daily Activity</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="glass-card p-2 rounded border border-white/10">
                            <p className="text-sm">{payload[0].payload.time}</p>
                            <p className="text-sm text-cyan-400">Active: {payload[0].value} min</p>
                            <p className="text-sm text-purple-500">Rest: {payload[1].value} min</p>
                          </div>
                        ) : null
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="1"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="rest"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right column ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Sleep analysis */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="text-purple-500" size={20} />
                <h3 className="text-lg font-semibold">Sleep Analysis</h3>
              </div>

              {/* Timeline */}
              <div className="mb-6 p-4 bg-charcoal/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">10:00 PM – 6:00 AM</span>
                  <span className="text-sm text-cyan-400">8 h 32 m Total</span>
                </div>
                <div className="h-8 flex rounded-lg overflow-hidden">
                  {sleepStages.map((s, i) => {
                    const color =
                      s.stage === 'Deep'
                        ? '#3B82F6'
                        : s.stage === 'Light'
                        ? '#06B6D4'
                        : s.stage === 'REM'
                        ? '#8B5CF6'
                        : '#EC4899';
                    return <div key={i} className="flex-1" style={{ backgroundColor: color }} />;
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                {sleepSummary.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-sm font-medium">{item.stage}</div>
                      <div className="text-xs text-gray-400">{item.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly trend + battery */}
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {/* Weekly activity – fixed height to match left cards */}
              <div className="glass-card p-6 rounded-xl col-span-2 flex flex-col h-48">
                <h4 className="text-sm text-gray-400 mb-2">Weekly Activity Trend</h4>
                <div className="text-2xl font-bold mb-2">
                  91% <span className="text-sm text-success-500">↑ 5%</span>
                </div>
                <div className="flex-grow">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrendData} margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                      <XAxis
                        dataKey="day"
                        stroke="#9CA3AF"
                        interval={0}
                        padding={{ left: 10, right: 10 }}
                        ticks={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                      />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip
                        content={({ active, payload, label }) =>
                          active && payload?.length ? (
                            <div className="glass-card p-2 rounded border border-white/10">
                              <p className="text-sm">{label}</p>
                              <p className="text-sm text-purple-500">Activity Score: {payload[0].value}%</p>
                            </div>
                          ) : null
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Battery – same fixed height */}
              <div className="glass-card p-6 rounded-xl col-span-1 flex flex-col justify-between h-48">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Battery Status</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <BatteryMedium className="text-green-500" />
                    <span className="text-2xl font-bold">85%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">5 days, 3 hours remaining</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;