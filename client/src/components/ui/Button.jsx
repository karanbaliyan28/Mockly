import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn'; 
const Button = React.forwardRef(({ className, children, variant, ...props }, ref) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    className={cn(
      'inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-white dark:ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300',
      'h-11 px-8',
      variant === 'outline'
        ? 'border border-indigo-500 bg-transparent text-indigo-400 hover:bg-indigo-500/10'
        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
      className
    )}
    {...props}
  >
    {children}
  </motion.button>
));
export default Button;