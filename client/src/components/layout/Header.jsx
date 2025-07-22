import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { SparklesIcon, MoonIcon, SunIcon } from '../ui/Icons';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const NavLink = ({ href, children, activeSection }) => {
    const isActive = activeSection === href.substring(1);
    return (
      <a href={href} className="relative px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
        {children}
        {isActive && (
          <motion.span layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" initial={false} animate={{opacity: 1}} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
        )}
      </a>
    );
};

// The 'setPage' prop has been removed as it is no longer needed
const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navItems = [{ name: 'Features', href: '#features' }, { name: 'AI Features', href: '#ai-features' }, { name: 'How it Works', href: '#story' }];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* The logo now links to the homepage "/" */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <SparklesIcon className="h-6 w-6 text-indigo-500"/>
            </motion.div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Mockly</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-2">
            {navItems.map((item) => <NavLink key={item.name} href={item.href} activeSection={activeSection}>{item.name}</NavLink>)}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* The Login button now links to the /login page */}
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Login</Link>
            
            {/* The Sign Up button now links to the /signup page */}
            <Link to="/signup">
                <Button className="bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 shadow-none">Sign Up</Button>
            </Link>

            <motion.button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                        {theme === 'light' ? <MoonIcon className="h-5 w-5 text-slate-700" /> : <SunIcon className="h-5 w-5 text-yellow-400" />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <motion.button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                {theme === 'light' ? <MoonIcon className="h-5 w-5 text-slate-700" /> : <SunIcon className="h-5 w-5 text-yellow-400" />}
            </motion.button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* This section handles the mobile navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => <a key={item.name} href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">{item.name}</a>)}
              <Link to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Login</Link>
              <div className="p-2">
                <Link to="/signup" className="w-full">
                    <Button onClick={() => setIsOpen(false)} className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;