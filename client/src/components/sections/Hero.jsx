import { motion } from "framer-motion";
import  Button  from "../ui/Button";
import  Badge  from "../ui/Badge";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div
        className="absolute -top-1/2 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20 dark:opacity-30"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64.6%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 1.4% 64.9%, 12.9% 38.6%, 29.5% 72.5%, 75.2% 55.2%)",
          }}
        ></div>
      </div>

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div variants={itemVariants}>
          <Badge>Now with System Design & DSA rounds!</Badge>
        </div>
        <h1
          className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          Ace Your Next Tech Interview with
          <span className="block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent sm:inline-block ml-3">
            AI
          </span>
        </h1>
        <p
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 sm:text-xl"
          variants={itemVariants}
        >
          Simulate real-world job interviews with an intelligent AI. Get
          instant, detailed feedback on your answers and build unshakable
          confidence.
        </p>
        <div className="mt-10" variants={itemVariants}>
          <Button className="text-base">Start Your Free Interview</Button>
        </div>
        <div
          className="mt-6 text-xs text-slate-500 dark:text-slate-600"
          variants={itemVariants}
        >
          No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Hero;
