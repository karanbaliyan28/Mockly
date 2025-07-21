import React from 'react';
import { cn } from '../../utils/cn'; 

const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full border border-indigo-500/50 dark:border-indigo-500/30 px-3 py-1 text-xs font-medium',
      'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
      className
    )}
    {...props}
  />
));
export default Badge;