"use client";

import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { faqData, FAQItemData } from "./faqData";
import { Input } from "@/components/ui/input"; // Assuming a shadcn/ui Input component
import { staggerContainer } from "@/lib/animations";

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const faqRefs = useRef<Record<string, HTMLDivElement>>({});

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenItemId(isOpen ? id : null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setOpenItemId(null); // Close any open item when searching
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentFocusIndex = filteredFaqs.findIndex(faq => faq.id === openItemId);
    let nextFocusIndex = -1;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextFocusIndex = (currentFocusIndex + 1) % filteredFaqs.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      nextFocusIndex = (currentFocusIndex - 1 + filteredFaqs.length) % filteredFaqs.length;
    }

    if (nextFocusIndex !== -1) {
      const nextItemId = filteredFaqs[nextFocusIndex]?.id;
      if (nextItemId) {
        setOpenItemId(nextItemId);
        // Focus the button inside the FAQItem for better accessibility
        const elementToFocus = faqRefs.current[nextItemId]?.querySelector("button");
        if (elementToFocus instanceof HTMLElement) {
          elementToFocus.focus();
        }
      }
    }
  };

  useEffect(() => {
    // When filteredFaqs changes, ensure openItemId is still valid or reset it.
    if (openItemId && !filteredFaqs.some(faq => faq.id === openItemId)) {
      setOpenItemId(null);
    }
    // If no item is open and there are filtered items, focus the first one.
    if (!openItemId && filteredFaqs.length > 0) {
        const firstItemId = filteredFaqs[0].id;
        setOpenItemId(firstItemId);
        const elementToFocus = faqRefs.current[firstItemId]?.querySelector("button");
        if (elementToFocus instanceof HTMLElement) {
            elementToFocus.focus();
        }
    }
  }, [filteredFaqs, openItemId]);


  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" onKeyDown={handleKeyDown}>
      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Find answers to common questions about Web3, AI, and Authormaton.
          </p>
        </div>
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md mx-auto"
          />
        </div>
        <div className="mx-auto max-w-3xl">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                ref={(el) => {
                  if (el) faqRefs.current[faq.id] = el as HTMLDivElement;
                }}
              >
                <FAQItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openItemId === faq.id}
                  onToggle={handleToggle}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No FAQs found matching your search.</p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
