"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { CompareSlider } from "@/components/ui/compare-slider";
import type { PortfolioConfig, PortfolioProject as CmsPortfolioProject } from "@/lib/sanity/types";

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

const DEFAULT_CATEGORIES = [
    {
      id: "still",
      label: " Classic Still",
      description: "Clean, high-quality product shots focused on clarity, detail, and perfect lighting for e-commerce.",
    },
    {
      id: "classic",
      label: "Creative Stills",
      description: "Elegant 360-degree rotations and simple movements to showcase the full geometry of your designs.",
    },
    {
      id: "creative",
      label: "Classic Animations",
      description: "Dynamic motion graphics and cinematic storytelling to elevate your brand marketing.",
    },
    {
      id: "onbody",
      label: "Creatiive Animations",
      description: "Realistic visualizations of jewelry worn on models to help customers visualize scale and style.",
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
      { src: "/Still Images/Bright Background/01-Robert-Procop-Ring-White-2-Big.jpg", title: "Robert Procop Ring" },
      { src: "/Still Images/Bright Background/0585-Pics_00000.jpg", title: "Diamond Solitaire" },
      { src: "/Still Images/Bright Background/36-Pics-PL_00005-Large.jpg", title: "Platinum Band" },
      { src: "/Still Images/Bright Background/573-liori_00001.jpg", title: "Liori Diamond Ring" },
      { src: "/Still Images/Bright Background/Autumn-Earrings-01-big.jpg", title: "Autumn Earrings" },
      { src: "/Still Images/Bright Background/Nehadani-Color_00000-big.jpg", title: "Nehadani Color Collection" },
      { src: "/Still Images/Bright Background/bracelet_00012-big.jpg", title: "Diamond Tennis Bracelet" },
      { src: "/Still Images/Dark Background/01-Ring-De-Grisogono-1-big.jpg", title: "De Grisogono Ring" },
      { src: "/Still Images/Dark Background/Bluestone-Ring-BISD0327R02.jpg", title: "Bluestone Ring" },
      { src: "/Still Images/Dark Background/Braslet.jpg", title: "Luxury Bracelet" },
      { src: "/Still Images/Dark Background/Cartier-PARIS-NOUVELLE-VAGUE-BRACELET.jpg", title: "Cartier Paris Bracelet" },
      { src: "/Still Images/Dark Background/Graff-Necklace.jpg", title: "Graff Necklace" },
      { src: "/Still Images/Dark Background/Jewelett-Black-Big-.jpg", title: "Jewelett Black Edition" },
      { src: "/Still Images/Dark Background/Winter-Leaves-Necklace.jpg", title: "Winter Leaves Necklace" },
      { src: "/Still Images/Bright Background/01-Robert-Procop-Ring-White-4-Big.jpg", title: "Robert Procop Ring II" },
      { src: "/Still Images/Bright Background/0585-Pics_00005.jpg", title: "Diamond Solitaire II" },
      { src: "/Still Images/Bright Background/06-R060416__00006.jpg", title: "Elegant Diamond Ring" },
      { src: "/Still Images/Bright Background/36-Pics-PL_00006-Large.jpg", title: "Platinum Band II" },
      { src: "/Still Images/Bright Background/573-liori_00004.jpg", title: "Liori Diamond Ring II" },
      { src: "/Still Images/Bright Background/Autumn-Earrings-02-big.jpg", title: "Autumn Earrings II" },
      { src: "/Still Images/Bright Background/BIDG0555R19_web.jpg", title: "Gold Ring Design" },
      { src: "/Still Images/Bright Background/Nehadani-Color_00001-big.jpg", title: "Nehadani Color II" },
      { src: "/Still Images/Bright Background/bracelet_00013-big.jpg", title: "Diamond Tennis Bracelet II" },
      { src: "/Still Images/Dark Background/01-Ring-De-Grisogono-2-big.jpg", title: "De Grisogono Ring II" },
    ];

    const onBodyData = [
      { src: "/Still Images/Bright Background/bracelet_00012-big.jpg", title: "Diamond Tennis Bracelet on Wrist", type: "image" as const },
      {
        src: "/Still Images/Dark Background/Braslet.jpg",
        title: "Elegant Bracelet Showcase",
        type: "video" as const,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      { src: "/Still Images/Bright Background/bracelet_00013-big.jpg", title: "Diamond Tennis Bracelet II", type: "image" as const },
      {
        src: "/Still Images/Dark Background/Cartier-PARIS-NOUVELLE-VAGUE-BRACELET.jpg",
        title: "Paris Nouvelle Vague On-Body",
        type: "video" as const,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      { src: "/Still Images/Bright Background/bracelet_00014-big.jpg", title: "Diamond Tennis Bracelet III", type: "image" as const },
      {
        src: "/Still Images/Bright Background/01-Robert-Procop-Ring-White-2-Big.jpg",
        title: "Ring On Hand Animation",
        type: "video" as const,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
    ];

    const classicThumbnails = [
      "/Still Images/Dark Background/01-Ring-De-Grisogono-1-big.jpg",
      "/Still Images/Dark Background/01-Ring-De-Grisogono-2-big.jpg",
      "/Still Images/Dark Background/01-Ring-De-Grisogono-3-big.jpg",
      "/Still Images/Bright Background/01-Robert-Procop-Ring-White-2-Big.jpg",
    ];

    const creativeThumbnails = [
      "/Still Images/Bright Background/Nehadani-Color_00000-big.jpg",
      "/Still Images/Bright Background/Nehadani-Color_00001-big.jpg",
      "/Still Images/Bright Background/Nehadani-Color_00002-big.jpg",
      "/Still Images/Bright Background/Nehadani-Color_00003-big.jpg",
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
        description: "High-resolution photorealistic render showcasing intricate details and material accuracy.",
        image: img.src,
        url: "#",
        technologies: ["3D Rendering", "Ray Tracing", "High Poly"],
        type: "image",
        background: getBackground(img.src),
      });
    });

    // On-Body Visuals - Mix of images and videos
    onBodyData.forEach((item) => {
      allProjects.push({
        id: idCounter++,
        title: item.title,
        category: "onbody",
        description: item.type === "video"
          ? "Cinematic on-body animation showcasing jewelry in motion on models."
          : "Realistic visualization of jewelry worn on models to help customers visualize scale and style.",
        image: item.src,
        url: "#",
        technologies: item.type === "video"
          ? ["Motion Tracking", "On-Body Compositing", "Video Production"]
          : ["Compositing", "Model Integration", "Lighting"],
        type: item.type,
        videoUrl: item.type === "video" ? item.videoUrl : undefined,
        background: getBackground(item.src),
      });
    });

    // Classic Animations
    classicThumbnails.forEach((src, i) => {
      allProjects.push({
        id: idCounter++,
        title: `Classic Animation ${i + 1}`,
        category: "classic",
        description: "Elegant 360-degree rotation showcasing the full geometry of the design.",
        image: src,
        url: "#",
        technologies: ["Animation", "360 Video", "Gold Material"],
        type: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        background: getBackground(src),
      });
    });

    // Creative Animations
    creativeThumbnails.forEach((src, i) => {
      allProjects.push({
        id: idCounter++,
        title: `Creative Campaign ${i + 1}`,
        category: "creative",
        description: "Dynamic motion graphics and cinematic storytelling for brand marketing.",
        image: src,
        url: "#",
        technologies: ["Motion Graphics", "Cinematic", "VFX"],
        type: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        background: getBackground(src),
      });
    });

    return allProjects;
  };

  const projects = useMemo(() => {
    if (data?.projects?.length) {
      return data.projects.map((p, i): Project => ({
        id: i + 1,
        title: p.title,
        category: p.category,
        description: p.description ?? "High-resolution photorealistic render.",
        image: p.thumbnailUrl ?? "",
        url: "#",
        technologies: [],
        type: p.isVideo ? "video" : "image",
        videoUrl: p.videoUrl,
        background: "bright",
      }));
    }
    return generateProjects();
  }, [data?.projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const handleNext = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  }, [selectedProject, projects]);

  const handlePrev = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
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
    <section id="portfolio" className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-900">
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
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === cat.id
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
            {(activeCategory === "still" || activeCategory === "classic") ? (
              <div className="space-y-12">
                {/* Bright Background */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-neutral-800 dark:text-neutral-200">
                    Bright Background
                  </h3>
                  {renderGrid(filteredProjects.filter(p => p.background === "bright"))}
                </div>

                {/* Dark Background */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-neutral-800 dark:text-neutral-200">
                    Dark Background
                  </h3>
                  {renderGrid(filteredProjects.filter(p => p.background === "dark"))}
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

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
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
