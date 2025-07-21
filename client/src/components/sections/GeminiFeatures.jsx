import { motion } from "framer-motion";
import {
  WandSparklesIcon,
  FileSearchIcon,
  BrainCircuitIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import Section from "./Section";

const GeminiFeatures = () => {
  const features = [
    {
      icon: <WandSparklesIcon className="h-8 w-8 text-purple-500" />,
      title: "✨ Tailored Question Generation",
      description:
        "Paste a job description and our AI will generate a custom set of interview questions, targeting the specific skills required.",
    },
    {
      icon: <FileSearchIcon className="h-8 w-8 text-purple-500" />,
      title: "✨ Intelligent Resume Analysis",
      description:
        "Get AI-powered feedback on your resume. Identify key areas for improvement and tailor it perfectly for your dream job.",
    },
    {
      icon: <BrainCircuitIcon className="h-8 w-8 text-purple-500" />,
      title: "✨ Dynamic Mock Scenarios",
      description:
        "Go beyond standard questions. Our AI creates complex, role-specific behavioral and system design scenarios to truly test your skills.",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Section
      id="ai-features"
      className="bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Powered by{" "}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Next-Gen AI
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Leveraging the Gemini API for features you won't find anywhere else.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} variants={itemVariants}>
              <Card className="h-full border-purple-500/20 dark:border-purple-500/30 dark:hover:shadow-purple-500/10">
                <CardHeader>
                  <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default GeminiFeatures;
