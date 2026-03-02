"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialsData } from "@/lib/sanity/types";

interface InternalLogo {
  name: string;
  src: string;
  alt: string;
  invertOnDark?: boolean;
}

interface TestimonialsProps {
  data?: TestimonialsData | null;
}

// const DEFAULT_TESTIMONIALS = [
//   {
//     name: "Priya Mehta",
//     title: "E-commerce Director, Glitz Jewelry Mumbai",
//     quote:
//       "Precious Render transformed our entire catalog of 2000+ rings. The photorealistic quality exceeded our expectations, and customers can't tell the difference from professional photography. Our online sales increased 45%.",
//     imageUrl: "/images/testimonilas/ppriya.jpg",
//   },
//   {
//     name: "Rajesh Sharma",
//     title: "Owner, Diamond Palace",
//     quote:
//       "The turnaround time was incredible-500 SKU renders delivered in just 2 weeks without compromising quality. The team's expertise in jewelry-specific lighting made every diamond sparkle perfectly.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
//   },
//   {
//     name: "Ananya Desai",
//     title: "Marketing Manager, Heritage Jewellers",
//     quote:
//       "The Instagram marketing videos they created for our new collection went viral-over 200K views! The cinematic animations captured the luxury feel we wanted and drove massive traffic to our store.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
//   },
//   {
//     name: "Neha Kapoor",
//     title: "Founder, Luxora Fine Jewelry",
//     quote:
//       "Their on-body jewelry renders look so natural-customers love seeing how pieces look when worn. This has significantly reduced our return rates and increased buyer confidence for high-ticket items.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
//   },
//   {
//     name: "Vikram Singh",
//     title: "Creative Director, Royal Gems Export",
//     quote:
//       "Working with a team that understands both rendering and jewelry manufacturing made all the difference. They knew exactly how to handle complex gem cuts and metal finishes.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
//   },
// ];

const DEFAULT_TESTIMONIALS = [
  {
    name: "Priya Mehta",
    title: "E-commerce Director, Glitz Jewelry Mumbai",
    quote:
      "Precious Render transformed our entire catalog of 2000+ rings. The photorealistic quality exceeded our expectations, and customers can't tell the difference from professional photography. Our online sales increased 45%.",
    imageUrl: "/images/testimonials/priya-mehta.png",
  },
  {
    name: "Ananya Desai",
    title: "Marketing Manager, Heritage Jewellers",
    quote:
      "The Instagram marketing videos they created for our new collection went viral-over 200K views! The cinematic animations captured the luxury feel we wanted and drove massive traffic to our store.",
    imageUrl: "/images/testimonials/ananya-desai.png",
  },
  {
    name: "Neha Kapoor",
    title: "Founder, Luxora Fine Jewelry",
    quote:
      "Their on-body jewelry renders look so natural-customers love seeing how pieces look when worn. This has significantly reduced our return rates and increased buyer confidence for high-ticket items.",
    imageUrl: "/images/testimonials/neha-kapoor.png",
  },
  {
    name: "Rajesh Sharma",
    title: "Owner, Diamond Palace",
    quote:
      "The turnaround time was incredible-500 SKU renders delivered in just 2 weeks without compromising quality. The team's expertise in jewelry-specific lighting made every diamond sparkle perfectly.",
    imageUrl: "/images/testimonials/rajesh-sharma.png",
  },
  {
    name: "Vikram Singh",
    title: "Creative Director, Royal Gems Export",
    quote:
      "Working with a team that understands both rendering and jewelry manufacturing made all the difference. They knew exactly how to handle complex gem cuts and metal finishes.",
    imageUrl: "/images/testimonials/vikram-singh.png",
  },
];
const DEFAULT_COMPANY_LOGOS: InternalLogo[] = [
  {
    name: "Emerald",
    src: "/images/emerald.png",
    alt: "Emerald logo",
    invertOnDark: false,
  },
  {
    name: "Kohira",
    src: "/images/kohira.png",
    alt: "Kohira logo",
    invertOnDark: false,
  },
  {
    name: "Limelight",
    src: "/images/limelight.png",
    alt: "Limelight logo",
    invertOnDark: true,
  },
  {
    name: "Uare",
    src: "/images/uare.png",
    alt: "Uare logo",
    invertOnDark: true,
  },
  {
    name: "Andor",
    src: "/images/andor.png",
    alt: "Andor Luxury logo",
    invertOnDark: true,
  },
];

export default function Testimonials({ data }: TestimonialsProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const badge = data?.badge ?? "Client Testimonials";
  const sectionTitle = data?.sectionTitle ?? "What Our Clients Say";
  const sectionDescription =
    data?.sectionDescription ??
    "Don't just take our word for it. Here's what some of our clients have to say about working with us.";
  const footerLabel = data?.footerLabel ?? "Trusted by businesses of all sizes";

  const testimonials = data?.testimonials?.length
    ? data.testimonials.map((t) => ({
        name: t.name,
        title: t.title,
        quote: t.quote,
        imageUrl: t.imageUrl ?? t.image,
      }))
    : DEFAULT_TESTIMONIALS;

  const companyLogos: InternalLogo[] = data?.companyLogos?.length
    ? data.companyLogos.map((l) => ({
        name: l.name,
        src: l.logoUrl ?? l.logo ?? "",
        alt: l.name,
        invertOnDark: l.invertOnDark,
      }))
    : DEFAULT_COMPANY_LOGOS;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const getLogoClassName = (logo: InternalLogo): string => {
    const base = "object-contain transition-all duration-300";
    if (!mounted) return `${base} opacity-80`;
    if (logo.invertOnDark && theme === "dark")
      return `${base} brightness-0 invert opacity-90 hover:opacity-100`;
    return `${base} opacity-80 hover:opacity-100`;
  };

  const nextTestimonial = () => {
    pauseTemporarily();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    pauseTemporarily();
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };
  const goToTestimonial = (index: number) => {
    pauseTemporarily();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 50) {
      pauseTemporarily();
      setDirection(-1);
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      );
    } else if (info.offset.x < -50) {
      pauseTemporarily();
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const testimonialVariants: import("framer-motion").Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" as const },
    }),
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
            {badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            {sectionTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            {sectionDescription}
          </p>
        </motion.div>

        <ShineBorder
          containerClassName="w-full overflow-hidden rounded-lg"
          borderWidth={1}
          shimmerColor="rgba(16, 185, 129, 0.2)"
        >
          <div className="relative max-w-4xl mx-auto py-8 px-4">
            <div
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="p-8 md:p-12 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                    {/* {current.imageUrl && (
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-emerald-100 dark:border-emerald-900/30">
                          <Image
                            src={current.imageUrl}
                            alt={current.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )} */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-6 italic leading-relaxed">
                        &ldquo;{current.quote}&rdquo;
                      </p>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white text-lg">
                          {current.name}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                          {current.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-md"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6">
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-md"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center gap-2 pb-6 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`transition-all duration-300 rounded-full ${index === currentIndex ? "w-8 h-2 bg-emerald-500 dark:bg-emerald-400" : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ShineBorder>

        {/* brand logos  */}
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-8">
            {footerLabel}
          </p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {companyLogos.map((logo, i) => (
              <motion.div
                key={i}
                className="h-16 md:h-20 w-auto flex items-center justify-center px-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {logo.src && (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={getLogoClassName(logo)}
                    style={{
                      width: "150px",
                      height: "90px",
                      maxHeight: "80px",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      console.error(
                        `Failed to load ${logo.name} logo from ${logo.src}`,
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
