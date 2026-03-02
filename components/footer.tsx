"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import type { SiteSettings } from "@/lib/sanity/types";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useState } from "react";

interface FooterProps {
  data?: SiteSettings | null;
}

const DEFAULT_FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { name: "Still Images", href: "#services" },
      { name: "360° Animations", href: "#services" },
      { name: "Marketing Videos", href: "#services" },
      { name: "On-Body Visuals", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Portfolio", href: "#portfolio" },
      { name: "Process", href: "#process" },
      { name: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const brightLogo = data?.logoUrl ?? "/brightLogo.jpg";
  const darkLogo = data?.darkLogoUrl ?? "/darkLogo.png";

  const currentLogo = mounted && theme === "dark" ? darkLogo : brightLogo;

  const siteName = data?.siteName ?? "Precious Render";
  const tagline =
    data?.tagline ??
    "Specializing in photorealistic jewelry renders, CAD-to-catalog workflows, and on-demand jewelry manufacturing support for brands worldwide";

  const footerLinkGroups = data?.footerLinkGroups?.length
    ? data.footerLinkGroups.map((group) => ({
        title: group.title,
        links: group.links.map((l) => ({ name: l.label, href: l.href })),
      }))
    : DEFAULT_FOOTER_LINKS;

  const instagramUrl = data?.socialLinks?.instagram ?? "https://instagram.com/";
  const linkedinUrl = data?.socialLinks?.linkedin ?? "https://linkedin.com/";
  const whatsappUrl = data?.socialLinks?.whatsapp ?? "https://whatsapp.com/";
  const youtubeUrl = data?.socialLinks?.youtube ?? "https://youtube.com/";

  return (
    <footer className="bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                key={theme}
                src={currentLogo}
                alt={`${siteName} Logo`}
                className="object-fill object-left  transition-opacity duration-300"
                priority
                width={120}
                height={60}
              />
            </Link>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-md">
              {tagline}
            </p>
            {/* <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-emerald-500" />
                <a href={`mailto:${email}`} className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-emerald-500" />
                <a href={`tel:${phone}`} className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-emerald-500" />
                <p className="text-neutral-600 dark:text-neutral-400">{address}</p>
              </div>
            </div> */}
          </div>

          {/* Footer Links */}
          {footerLinkGroups.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">
            © {currentYear} {siteName}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href={instagramUrl}
              className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={linkedinUrl}
              className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={whatsappUrl}
              className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href={youtubeUrl}
              className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
