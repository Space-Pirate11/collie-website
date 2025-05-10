import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="mx-auto h-24 w-24 text-cyan-400" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="mt-6 text-3xl font-extrabold">
            Thank You for Your Pre-Order!
          </h2>
          <p className="mt-2 text-gray-300">
            Your spot has been secured for Collie, the world's smartest AI-powered dog collar.
          </p>

          <div className="mt-6 glass-card p-6 rounded-xl text-left">
            <h3 className="text-lg font-medium mb-4">Order Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Amount Paid:</dt>
                <dd className="font-medium">$20.00 USD</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Order Status:</dt>
                <dd className="font-medium">Completed</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Order Date:</dt>
                <dd className="font-medium">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-300 mb-6">
              We'll keep you updated on production progress and shipping details via email.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;