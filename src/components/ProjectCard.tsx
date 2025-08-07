import Badge from "@/components/Badge";
import Image from "next/image";
type Project = {
  title: string;
  short_description: string;
  details: object;
  icon: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className=" bg-white p-6 rounded-xl overflow-clip flex flex-col gap-1 h-80 items-baseline shadow-lg hover:rotate-1 hover:scale-102 hover:shadow-xl transition-all">
      <Image
        src={project.icon}
        alt={project.title}
        className="h-32 max-w-48  mb-2  object-contain mix-blend-darken"
      />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.short_description}</p>
      </div>

      <div className="flex gap-2 mt-4">
        {Array.isArray((project.details as any).Scope) &&
          ((project.details as any).Scope as string[]).map((scope) => (
            <Badge key={scope} text={scope} />
          ))}{" "}
      </div>
    </div>
  );
}
