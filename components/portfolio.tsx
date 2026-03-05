"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { CompareSlider } from "@/components/ui/compare-slider";
import type {
  PortfolioConfig,
  PortfolioProject as CmsPortfolioProject,
} from "@/lib/sanity/types";

interface PortfolioData {
  config?: PortfolioConfig | null;
  projects?: CmsPortfolioProject[];
}

interface PortfolioProps {
  data?: PortfolioData | null;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  type: "image" | "video";
  background?: "bright" | "dark";
}

// Update the DEFAULT_CATEGORIES to match actual content:

const DEFAULT_CATEGORIES = [
  {
    id: "still",
    label: "Classic Still",
    description:
      "Clean, high-quality product shots focused on clarity, detail, and perfect lighting for e-commerce.",
  },
  {
    id: "creative-still",
    label: "Creative Stills",
    description:
      "Elegant designs showcasing intricate details and creative compositions.",
  },
  {
    id: "classic-animation",
    label: "Classic Animations",
    description:
      "Dynamic 360-degree rotations and elegant animations showcasing the full geometry of your designs.",
  },
  {
    id: "creative-animation",
    label: "Creative Animations",
    description:
      "Realistic visualizations of jewelry worn on models to help customers visualize scale and style.",
  },
];

export default function Portfolio({ data }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("still");

  const categories = data?.config?.categories?.length
    ? data.config.categories
    : DEFAULT_CATEGORIES;

  // Helper to generate projects
  const generateProjects = () => {
    const stillImages = [
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Dancing Earrings 1.jpg",
        title: "Dancing Earrings 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Dancing Earrings 2.jpg",
        title: "Dancing Earrings 2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Pearoval 1.jpg",
        title: "Pearoval 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Princes Halo 1.jpg",
        title: "Princes Halo 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Princes Halo 2.jpg",
        title: "Princes Halo 2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Princes Halo 3.jpg",
        title: "Princes Halo 3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Remix 1.jpg",
        title: "Remix 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 1-1.jpg",
        title: "Ring 1-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 1-2.jpg",
        title: "Ring 1-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 1-3.jpg",
        title: "Ring 1-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 3-1.jpg",
        title: "Ring 3-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 3-2.jpg",
        title: "Ring 3-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 3-3.jpg",
        title: "Ring 3-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 4-1.jpg",
        title: "Ring 4-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 4-2.jpg",
        title: "Ring 4-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 4-3.jpg",
        title: "Ring 4-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 5-1.jpg",
        title: "Ring 5-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 5-2.jpg",
        title: "Ring 5-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 5-3.jpg",
        title: "Ring 5-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 5-4.jpg",
        title: "Ring 5-4",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-1.jpg",
        title: "Ring 10-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-2.jpg",
        title: "Ring 10-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-3.jpg",
        title: "Ring 10-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-4.jpg",
        title: "Ring 10-4",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-5.jpg",
        title: "Ring 10-5",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 10-6.jpg",
        title: "Ring 10-6",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 12-1.jpg",
        title: "Ring 12-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 12-2.jpg",
        title: "Ring 12-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 12-3.jpg",
        title: "Ring 12-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 12-4.jpg",
        title: "Ring 12-4",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 12-5.jpg",
        title: "Ring 12-5",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 14-1.jpg",
        title: "Ring 14-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 14-2.jpg",
        title: "Ring 14-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 14-3.jpg",
        title: "Ring 14-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 14-4.jpg",
        title: "Ring 14-4",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 16-1.jpg",
        title: "Ring 16-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 16-2.jpg",
        title: "Ring 16-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 16-3.jpg",
        title: "Ring 16-3",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 16-4.jpg",
        title: "Ring 16-4",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 17-1.jpg",
        title: "Ring 17-1",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 17-2.jpg",
        title: "Ring 17-2",
      },
      {
        src: "/images/portfolio/Classic Stills/Bright Background/Ring 17-3.jpg",
        title: "Ring 17-3",
      },
      // Dark Background Images
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Anticlock 1.jpg",
        title: "Anticlock 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Butterfly Ring 1.jpg",
        title: "Butterfly Ring 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Double Halo 1.jpg",
        title: "Double Halo 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Double Halo 2.jpg",
        title: "Double Halo 2",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Eternity Emerald 1.jpg",
        title: "Eternity Emerald 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Pear Sapphire 1.jpg",
        title: "Pear Sapphire 1",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Pear Sapphire 2.jpg",
        title: "Pear Sapphire 2",
      },
      {
        src: "/images/portfolio/Classic Stills/Dark Background/Pear Sapphire 3.jpg",
        title: "Pear Sapphire 3",
      },
    ];

    const creativeStillsImages = [
      {
        src: "/images/portfolio/Creative Stills/2 Cobbles 1.jpg",
        title: "2 Cobbles 1",
      },
      {
        src: "/images/portfolio/Creative Stills/2 Cobbles 2.jpg",
        title: "2 Cobbles 2",
      },
      {
        src: "/images/portfolio/Creative Stills/Claw Prong 1.jpg",
        title: "Claw Prong 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Claw Prong 2.jpg",
        title: "Claw Prong 2",
      },
      {
        src: "/images/portfolio/Creative Stills/Claw Prong 3.jpg",
        title: "Claw Prong 3",
      },
      {
        src: "/images/portfolio/Creative Stills/Crimson Bracelet 1.jpg",
        title: "Crimson Bracelet 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Crimson Earring 1.jpg",
        title: "Crimson Earring 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Crimson Ring 1.jpg",
        title: "Crimson Ring 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Forest Bloom 1.jpg",
        title: "Forest Bloom 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Forest Bloom 2.jpg",
        title: "Forest Bloom 2",
      },
      {
        src: "/images/portfolio/Creative Stills/Snail Ring 1.jpg",
        title: "Snail Ring 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Sudarshan 1.jpg",
        title: "Sudarshan 1",
      },
      {
        src: "/images/portfolio/Creative Stills/Sudarshan 2.jpg",
        title: "Sudarshan 2",
      },
      {
        src: "/images/portfolio/Creative Stills/Sudarshan 3.jpg",
        title: "Sudarshan 3",
      },
      {
        src: "/images/portfolio/Creative Stills/Sudarshan 4.jpg",
        title: "Sudarshan 4",
      },
      {
        src: "/images/portfolio/Creative Stills/Sudarshan 5.jpg",
        title: "Sudarshan 5",
      },
    ];

    const classicAnimations = [
      {
        videoUrl: "https://www.youtube.com/embed/RWObbH7AHhQ",
        title: "Ring 1",
      },
      {
        videoUrl: "https://www.youtube.com/embed/XaaUQWfpUeQ",
        title: "Ring 6",
      },
      {
        videoUrl: "https://www.youtube.com/embed/bNmLKmZp5IY",
        title: "Ring 7",
      },
      {
        videoUrl: "https://www.youtube.com/embed/HciDeL93Jzg",
        title: "Ring 8",
      },
      {
        videoUrl: "https://www.youtube.com/embed/hLxQ0KtxeTo",
        title: "Ring 13",
      },
    ];

    const creativeAnimations = [
      {
        videoUrl: "https://www.youtube.com/embed/mxWf8B97p7A",
        title: "Creative Animation 1",
      },
      {
        videoUrl: "https://www.youtube.com/embed/VSidAw7qfGQ",
        title: "Creative Animation 2",
      },
      {
        videoUrl: "https://www.youtube.com/embed/OYV_saKw4FA",
        title: "Creative Animation 3",
      },
      {
        videoUrl: "https://www.youtube.com/embed/p9sYbhY-wwI",
        title: "Creative Animation 4",
      },
      {
        videoUrl: "https://www.youtube.com/embed/JqhW7wDMXCs",
        title: "Creative Animation 5",
      },
      {
        videoUrl: "https://www.youtube.com/embed/gqMPhHXLDo0",
        title: "Creative Animation 6",
      },
      {
        videoUrl: "https://www.youtube.com/embed/-OXH6Wkd1V4",
        title: "Creative Animation 7",
      },
      {
        videoUrl: "https://www.youtube.com/embed/rM8OEbFJjbY",
        title: "Creative Animation 8",
      },
    ];

    const allProjects: Project[] = [];
    let idCounter = 1;

    const getBackground = (path: string): "bright" | "dark" => {
      return path.toLowerCase().includes("dark background") ? "dark" : "bright";
    };

    // Still Images
    stillImages.forEach((img) => {
      allProjects.push({
        id: idCounter++,
        title: img.title,
        category: "still",
        description:
          "High-resolution photorealistic render showcasing intricate details and material accuracy.",
        image: img.src,
        url: "#",
        technologies: ["3D Rendering", "Ray Tracing", "High Poly"],
        type: "image",
        background: getBackground(img.src),
      });
    });

    creativeStillsImages.forEach((img) => {
      allProjects.push({
        id: idCounter++,
        title: img.title,
        category: "creative-still",
        description:
          "High-resolution photorealistic render showcasing intricate details and material accuracy.",
        image: img.src,
        url: "#",
        technologies: ["3D Rendering", "Ray Tracing", "High Poly"],
        type: "image",
        background: getBackground(img.src),
      });
    });

    // Classic Animations
    classicAnimations.forEach((item) => {
      allProjects.push({
        id: idCounter++,
        title: item.title,
        category: "classic-animation",
        description:
          "Elegant 360-degree rotation showcasing the full geometry of the design.",
        image: `https://img.youtube.com/vi/${item.videoUrl.split("/").pop()}/hqdefault.jpg`,
        url: "#",
        technologies: ["Animation", "360 Video", "Gold Material"],
        type: "video",
        videoUrl: item.videoUrl,
        background: "bright",
      });
    });

    // Creative Animations
    creativeAnimations.forEach((item) => {
      allProjects.push({
        id: idCounter++,
        title: item.title,
        category: "creative-animation",
        description:
          "Dynamic motion graphics and cinematic storytelling for brand marketing.",
        image: `https://img.youtube.com/vi/${item.videoUrl.split("/").pop()}/hqdefault.jpg`,
        url: "#",
        technologies: ["Motion Graphics", "Cinematic", "VFX"],
        type: "video",
        videoUrl: item.videoUrl,
        background: "bright",
      });
    });

    return allProjects;
  };

  const projects = useMemo(() => {
    if (data?.projects?.length) {
      return data.projects.map(
        (p, i): Project => ({
          id: i + 1,
          title: p.title,
          category: p.category,
          description:
            p.description ?? "High-resolution photorealistic render.",
          image: p.thumbnailUrl ?? "",
          url: "#",
          technologies: [],
          type: p.isVideo ? "video" : "image",
          videoUrl: p.videoUrl,
          background: "bright",
        }),
      );
    }
    return generateProjects();
  }, [data?.projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const handleNext = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  }, [selectedProject, projects]);

  const handlePrev = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  }, [selectedProject, projects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  const renderGrid = (projectsToRender: Project[]) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {projectsToRender.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => setSelectedProject(project)}
        />
      ))}
    </div>
  );

  return (
    <section
      id="portfolio"
      className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
            {data?.config?.badge ?? "Our Portfolio"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            {data?.config?.sectionTitle ?? "Featured Projects"}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {activeCategoryData?.description}
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory === "still" || activeCategory === "classic" ? (
              <div className="space-y-12">
                {/* Bright Background */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-neutral-800 dark:text-neutral-200">
                    Bright Background
                  </h3>
                  {renderGrid(
                    filteredProjects.filter((p) => p.background === "bright"),
                  )}
                </div>

                {/* Dark Background */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-neutral-800 dark:text-neutral-200">
                    Dark Background
                  </h3>
                  {renderGrid(
                    filteredProjects.filter((p) => p.background === "dark"),
                  )}
                </div>
              </div>
            ) : (
              renderGrid(filteredProjects)
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-50 hidden md:block"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-50 hidden md:block"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            >
              {selectedProject.type === "video" && selectedProject.videoUrl ? (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : selectedProject.beforeImage && selectedProject.afterImage ? (
                <div className="w-full h-[80vh] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
                  <CompareSlider
                    beforeImage={selectedProject.beforeImage}
                    afterImage={selectedProject.afterImage}
                    beforeLabel="CAD"
                    afterLabel="Render"
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <div className="relative w-full h-auto max-h-[90vh] flex items-center justify-center">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800"
      onClick={onClick}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Video Indicator */}
      {project.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50">
            <Play fill="white" className="ml-1 text-white" size={20} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
