"use client";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Section from "../sections/Section";

const StorySection = () => (
  <Section id="story" className="bg-slate-100 dark:bg-slate-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
      <h2
        className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Built for the Modern Job Hunt
      </h2>
      <p
        className="mt-6 text-lg text-slate-600 dark:text-slate-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Landing a job today is more competitive than ever. We built Mockly because
        we believe everyone deserves a fair shot. Practice in a safe, constructive
        environment, identify your blind spots, and walk into your real interview
        with the confidence of a seasoned professional.
      </p>
      <div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Button variant="outline">Learn More About Our Mission</Button>
      </div>
    </div>
  </Section>
);

export default StorySection;
