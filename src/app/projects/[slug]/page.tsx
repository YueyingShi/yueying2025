import Glow from "@/components/projects/Glow";
import Presence from "@/components/projects/Presence";
import Vote from "@/components/projects/Vote";
import Yiui from "@/components/projects/Yiui";
import { projects } from "../../../../public/data/projects";
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
    <main className="max-w-5xl mx-auto p-6 mt-12 mb-6 flex flex-col gap-6 font-serif">
      {/* title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl">{project.title}</h1>
        <p className="text-lg text-gray-400">{project.short_description}</p>
      </div>

      {/* details */}
      <div className="flex flex-col gap-1">
        {Object.entries(project.details).map(([key, value]) => (
          <div key={key} className="flex items-center ">
            <span className="text-gray-400 w-18">{key}</span>{" "}
            <p className="">
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          </div>
        ))}
      </div>

      {/* main content */}
      <Component />
    </main>
  );
}
