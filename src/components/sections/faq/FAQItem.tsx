"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  id: string;
  onToggle: (id: string, isOpen: boolean) => void;
  isOpen: boolean;
}

const contentVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, id, onToggle, isOpen }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      // Optional: scroll into view when expanded, if needed for accessibility
      // itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isOpen]);

  const handleToggle = () => {
    onToggle(id, !isOpen);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <motion.div
      ref={itemRef}
      className="border-b border-gray-200 dark:border-gray-700"
      initial={false}
      animate={isOpen ? "visible" : "hidden"}
      data-faq-item-id={id} // Used for keyboard navigation in parent
    >
      <h3 className="text-lg font-medium py-4">
        <button
          className="flex justify-between items-center w-full text-left focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          onClick={handleToggle}
          onKeyPress={handleKeyPress}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${id}`}
          id={`faq-question-${id}`}
          tabIndex={0}
        >
          <span>{question}</span>
          <motion.span
            className="ml-6 flex-shrink-0"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-content-${id}`}
            role="region"
            aria-labelledby={`faq-question-${id}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pb-4 text-gray-600 dark:text-gray-300 overflow-hidden"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
