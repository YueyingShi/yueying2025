import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const files = fs.readdirSync("content/projects");
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

type Project = {
  title: string;
  description: string;
};

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="prose prose-lg max-w-3xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      </header>
      <section className="text-gray-700 leading-relaxed">
        <p>{project.description}</p>
      </section>
      <article className="prose prose-lg max-w-3xl mx-auto px-4 py-8">
        <h1>{project.title}</h1>
        {/* {project.coverImage && <img src={project.coverImage} alt={project.title} />}
      <MDXRemote source={content} /> */}
      </article>
    </article>
  );
}
