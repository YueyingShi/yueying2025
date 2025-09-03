"use client";

import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

import type { ProjectDetails } from "./ProjectCard";

interface Project {
  slug: string;
  title: string;
  short_description: string;
  details: ProjectDetails;
  icon: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <>
      <div>
        <h2 id="projects" className="mb-4">
          PROJECTS
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3  gap-4">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <ProjectCard key={project.slug} project={project} />
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
