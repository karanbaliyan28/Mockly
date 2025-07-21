import React from 'react';
import { motion } from 'framer-motion';

export const PageContent = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{title}</h1>
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
          {children || (
            <p className="text-slate-500 dark:text-slate-400">
              Content for <strong>{title}</strong> goes here.
            </p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);
