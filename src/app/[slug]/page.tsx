import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";

type Props = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return <ProjectDetail project={project} />;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));
}
