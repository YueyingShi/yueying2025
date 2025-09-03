"use client";
import React from "react";
import Image from "next/image";
import ExperienceBlock from "./ExperienceBlock";
export default function About() {
  return (
    <section id="about" className="w-full mx-auto mt-12 flex flex-col gap-6">
      <h2 className="text-3xl font-bold">ABOUT ME</h2>
      <div className="flex flex-col lg:flex-row gap-4 pr-6 items-center mx-auto bg-white rounded-xl overflow-clip shadow-lg">
        <Image
          src="/ellan.jpg"
          alt="About Me"
          width={600}
          height={400}
          className="flex-none max-w-64 object-cover"
        />
        <div className="flex-1 max-w-3xl">
          <blockquote className="px-6 text-xl italic text-gray-400">
            “ I believe in the power of data-driven and user-centric design. By
            analyzing user feedback and behavior, designers can create solutions
            that are both visually compelling and functionally
            efficient—directly addressing real user challenges. ”
          </blockquote>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <ExperienceBlock
          title="EDUCATION"
          items={[
            {
              role: "MSc Human-Computer Interaction",
              period: "2020–2022 | Eindhoven University of Technology",
              description:
                "UX methods, data analysis, ergonomics, data-aided design, data visualization, ML & design, robot interaction.",
            },
            {
              role: "BEng Industrial Design",
              period: "2014–2018 | South China University of Technology",
              description:
                "Interaction Design, Vehicle Design, 3D Design, Design Psychology, Management, Methodology.",
            },
          ]}
        />
        <ExperienceBlock
          title="WORK EXPERIENCE"
          items={[
            {
              role: "UX Designer & Researcher",
              period: "2022.09 – Present | Deerns",
              description:
                "Digital UX solutions, web app development, design system setup & maintenance.",
            },
            {
              role: "UX Design Intern",
              period: "2021.09–2022.03 | Accenture (VanBerlo)",
              description:
                "User research, interaction/visual design, user testing, consulting projects, tool development.",
            },
            {
              role: "UX Designer",
              period: "2018.07–2019.09 | Konka",
              description:
                "Smart TV software: games, video chat, facial recognition, voice assistant. Used by 21.9M+ daily users.",
            },
          ]}
        />
        <ExperienceBlock
          title="OTHER PROJECTS"
          items={[
            {
              role: "Installation Artist & Graphic Designer",
              period: "2022.09 – Present | GLOW Eindhoven",
              description:
                "Poster visuals for 30+ exhibitions. Designed “Wayfinding”—80 interactive mushroom lights over 2 km.",
            },
            {
              role: "New Media Concept Artist",
              period: "2020.03 – 2020.08 | Pixel Forest",
              description:
                "Exhibition/event concept design for new media art: projections, lighting, immersive experiences.",
            },
          ]}
        />
      </div>
    </section>
  );
}
