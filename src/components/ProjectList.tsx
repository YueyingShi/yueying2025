"use client";

import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

interface Project {
  slug: string;
  title: string;
  short_description: string;
  details: object;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <>
      <div>
        <h2 id="projects" className="mb-4">
          Projects
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2  gap-4">
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
