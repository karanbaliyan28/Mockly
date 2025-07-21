
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Title */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <SparklesIcon className="h-6 w-6 text-indigo-500" />
          <span className="font-bold text-slate-900 dark:text-white tracking-tight">
            Mockly
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {[
            { href: "#features", label: "Features" },
            { href: "#ai-features", label: "AI Features" },
            { href: "#", label: "Terms" },
            { href: "#", label: "Privacy" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Mockly. All rights reserved.</p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
