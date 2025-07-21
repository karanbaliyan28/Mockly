import React from 'react';

// Components ko unki respective files se import karein
import Header from '../layout/Header';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import GeminiFeatures from '../sections/GeminiFeatures';
import StorySection from '../sections/StorySection';
import Footer from '../layout/Footer';

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-slate-950 font-sans antialiased text-slate-600 dark:text-slate-300 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Features />
        <GeminiFeatures />
        <StorySection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
