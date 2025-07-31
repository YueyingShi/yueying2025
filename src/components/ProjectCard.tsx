import Badge from "@/components/Badge";
type Project = {
  title: string;
  short_description: string;
  details: object;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border p-4 rounded flex flex-col gap-1 h-36 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p>{project.short_description}</p>
      <div className="flex gap-2 mt-4">
        {Array.isArray((project.details as any).Scope) &&
          ((project.details as any).Scope as string[]).map((scope) => (
            <Badge text={scope} />
          ))}{" "}
      </div>
    </div>
  );
}
