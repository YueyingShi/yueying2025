import Glow from "@/components/projects/Glow";
import Presence from "@/components/projects/Presence";
import Vote from "@/components/projects/Vote";
import Yiui from "@/components/projects/Yiui";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

type ProjectComponentMap = {
  [key: string]: React.ComponentType;
};

const projectComponents: ProjectComponentMap = {
  glow: Glow,
  presence: Presence,
  vote: Vote,
  yiui: Yiui,
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  const Component = projectComponents[params.slug];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-2 text-gray-400">{project.description}</p>
      <div className="text-base text-gray-200 whitespace-pre-line">
        {project.details}
      </div>
      <Component />
    </main>
  );
}
