"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { AuroraText } from "@/components/ui/aurora-text";
import { WordRotate } from "@/components/ui/word-rotate";
import type { HeroData } from "@/lib/sanity/types";
import { toast, Toaster } from "sonner";

interface HeroProps {
  data?: HeroData | null;
}

const DEFAULT_WORDS = [
  "Jewelry Renders",
  "Virtual Inventory Solutions",
  "360° Product Videos",
  "Marketing Animations",
  "CAD to Catalog Workflows",
  "E-commerce Visuals",
];

export default function Hero({ data }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const rawWords = data?.rotatingWords as unknown as
    | Array<string | { word: string }>
    | undefined;
  const words = rawWords?.length
    ? (rawWords
        .map((w) => (typeof w === "string" ? w : w.word))
        .filter(Boolean) as string[])
    : DEFAULT_WORDS;
  const headlinePrefix = data?.headlinePrefix ?? "Premium Jewelry";
  const headlineSuffix = data?.headlineSuffix ?? "Rendering Services for";
  const headlineHighlight = data?.headlineHighlight ?? "Modern Jewelers";
  const staticLeadText = data?.staticLeadText ?? "We create beautiful";
  const primaryCtaHref =
    data?.primaryCtaHref ??
    "https://wa.me/7823846641?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services";
  const videoSrc = data?.backgroundVideoUrl ?? "/Precious render.mp4";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Show loading toast
      toast.loading("Sending...");

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Dismiss loading
      toast.dismiss();

      if (response.ok) {
        // Clear input
        setEmail("");

        // Show success toast
        toast.success("Magic sent! ✨", {
          description: "We'll be in touch with something special soon.",
          duration: 3000,
        });
      } else {
        const result = await response.json();
        toast.error("Oops!", {
          description:
            result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Connection error", {
        description: "Please check your internet and try again.",
      });
      console.error("Error capturing lead:", error);
    }
  };

  return (
    <div
      ref={ref}
      className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden min-h-[100vh] flex flex-col justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight flex flex-col items-center gap-2">
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-neutral-900 dark:text-white"
            >
              {headlinePrefix}
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-neutral-900 dark:text-white"
              delay={0.5}
            >
              {headlineSuffix}
            </TextAnimate>
          </h1>

          <div className="mb-4 md:mb-6">
            <AuroraText
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-500"
              colors={["#10b981", "#06b6d4", "#0ea5e9", "#10b981"]}
            >
              {headlineHighlight}
            </AuroraText>
          </div>

          <div className="text-lg md:text-xl font-medium mb-8 md:mb-10 text-neutral-700 dark:text-neutral-300 h-24 md:h-20">
            {staticLeadText}{" "}
            <WordRotate
              words={words}
              className="text-emerald-500 font-semibold"
              duration={2000}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            />
          </div>

          {/* Capsule Input with Button */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full max-w-3xl mb-10 md:mb-14 px-2"
          >
            <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-emerald-500/20 transition-all duration-300">
              {/* Emoji */}
              <span className="absolute left-3 md:left-6 text-lg md:text-2xl pointer-events-none z-10">
                👋
              </span>

              {/* Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here and we'll send you some 'magic'..."
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address"
                className="flex-1 bg-transparent pl-10 md:pl-16 pr-2 md:pr-4 py-4 md:py-5 text-sm md:text-base text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none md:placeholder:inline placeholder:hidden"
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-2 md:gap-3 px-4 md:px-10 py-3 md:py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-sm md:text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 m-1 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Do it</span>
                <span className="sm:hidden">Go</span>
                <motion.div
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
                </motion.div>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e5e7eb",
          },
          classNames: {
            toast:
              "dark:!bg-neutral-900 dark:!text-white dark:!border-neutral-700",
            title: "dark:!text-white",
            description: "dark:!text-neutral-400",
            actionButton: "dark:!bg-emerald-500",
            cancelButton: "dark:!bg-neutral-800",
          },
        }}
        richColors
      />
    </div>
  );
}
