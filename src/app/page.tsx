"use client";

import { Banner } from "@/components/Banner";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "../../public/data/projects";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import About from "@/components/About";

export default function HomePage() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay ensures DOM is ready
      }
    }
  }, [pathname]);
  return (
    <>
      <Banner />
      <div className="max-w-7xl mx-auto p-8">
        <ProjectList projects={projects} />
        <About />
      </div>
    </>
  );
}
