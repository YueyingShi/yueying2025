type Project = {
  title: string;
  short_description: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p>{project.short_description}</p>
    </div>
  );
}
