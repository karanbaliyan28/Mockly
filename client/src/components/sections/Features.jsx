
import { BotIcon, BarChartIcon, FileTextIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import Section from "./Section";

const Features = () => {
  const features = [
    {
      icon: <BotIcon className="h-8 w-8 text-indigo-500" />,
      title: "Realistic Mock Interviews",
      description:
        "Engage in conversations with an AI that adapts to your responses, asking relevant follow-up questions just like a real interviewer.",
    },
    {
      icon: <BarChartIcon className="h-8 w-8 text-indigo-500" />,
      title: "Real-Time Performance Analytics",
      description:
        "Receive instant feedback on your answer's clarity, relevance, depth, and even the sentiment of your tone.",
    },
    {
      icon: <FileTextIcon className="h-8 w-8 text-indigo-500" />,
      title: "Personalized Feedback Reports",
      description:
        "After each session, get a comprehensive summary of your strengths, weaknesses, and actionable tips for improvement.",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Section id="features" className="bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            From the first question to the final feedback report.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="bg-indigo-100 dark:bg-indigo-500/10 p-3 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
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

export default Features;
