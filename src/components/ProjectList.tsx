"use client";

import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

interface Project {
  slug: string;
  title: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project.slug}>
          <ProjectCard key={project.slug} project={project} />
        </Link>
      ))}
    </section>
  );
}
