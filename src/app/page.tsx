import { Banner } from "@/components/Banner";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="max-w-7xl mx-auto p-8" id="projects">
        <ProjectList projects={projects} />
      </div>
      <div className="max-w-7xl mx-auto p-8" id="about">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p>
          This is a brief description about the projects showcased on this
          website.
        </p>
      </div>
    </>
  );
}
