import Glow from "@/components/projects/Glow";
import Presence from "@/components/projects/Presence";
import Vote from "@/components/projects/Vote";
import Yiui from "@/components/projects/Yiui";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}
type ProjectComponentMap = {
  [key: string]: React.ComponentType;
};

const projectComponents: ProjectComponentMap = {
  glow: Glow,
  presence: Presence,
  vote: Vote,
  yiui: Yiui,
};

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const Component = projectComponents[slug];

  return (
    <>
      <div className="w-full pt-24 pb-16 items-center bg-gray-100 font-serif">
        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-4">
          {/* title */}
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-4xl">{project.title}</h1>
            <p className="text-lg text-gray-400">{project.short_description}</p>
          </div>

          {/* details */}
          <div className="w-full flex flex-col gap-1 mb-4">
            {Object.entries(project.details).map(([key, value]) => (
              <div key={key} className="flex items-center ">
                <span className="text-gray-400 w-18">{key}</span>{" "}
                <p className="">
                  {Array.isArray(value) ? value.join(", ") : value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <main className="max-w-5xl mx-auto p-4 my-6 flex flex-col items-center gap-6 font-serif">
        {/* main content */}
        <Component />
      </main>
    </>
  );
}
