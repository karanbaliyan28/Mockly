import Hero from "./sections/Hero";
import Section from "./sections/Section";
import Features from "./sections/Features";
import GeminiFeatures from "./sections/GeminiFeatures";
import StorySection from "./sections/StorySection";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

const LandingPage = ({ setPage }) => {
  return (
    <>
      <Header setPage={setPage} />
      <Hero />
      <Features />
      <GeminiFeatures />
      <StorySection />
      <Footer />
    </>
  );
};

export default LandingPage;
