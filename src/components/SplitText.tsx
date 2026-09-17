import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Fragment } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2";
  highlight?: (word: string, index: number) => ReactNode;
}

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SplitText({
  text,
  className,
  delay = 0,
  as = "span",
  highlight,
}: SplitTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      <span aria-hidden="true" className="contents">
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="-mr-[0.1em] inline-block overflow-hidden pb-[0.08em] pr-[0.1em] align-bottom">
            <motion.span variants={wordVariant} className="inline-block">
              {highlight ? highlight(word, index) : word}
            </motion.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
      </span>
    </Tag>
  );
}
