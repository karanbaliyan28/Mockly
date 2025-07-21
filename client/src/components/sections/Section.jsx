import { cn } from "@/utils/cn";

// Animation hata diya gaya hai. Yeh ab ek simple section wrapper hai.
const Section = ({ id, children, className }) => {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-32", className)}
    >
      {children}
    </section>
  );
};

export default Section;
