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

      <div className="flex flex-col gap-6 mt-4">
        <ExperienceBlock
          title="WORK EXPERIENCE"
          items={[
            {
              role: "Digital Solution Developer",
              period: "2022.09 – Present | Deerns",
              description:
                "Build and manage a cloud-native web platform spanning 13 countries, driving UX research, data-driven design, and dashboard creation while ensuring scalability and a consistent user experience.",
            },
            {
              role: "UX Design Intern",
              period: "2021.09–2022.03 | Accenture (VanBerlo)",
              description:
                "Conducted user research, interaction and visual design, usability testing, consulting projects, and tool development to support design initiatives.",
            },
            {
              role: "UX Designer",
              period: "2018.07–2019.09 | Konka",
              description:
                "Designed and optimized over 20 digital products used by up to 21.9 million daily users through UX research, user behavior analysis, and creating personas, journey maps, and wireframes to guide design improvements.",
            },
          ]}
        />
        <ExperienceBlock
          title="EDUCATION"
          items={[
            {
              role: "MSc Human-Computer Interaction",
              period: "2020–2022 | Eindhoven University of Technology",
              description:
                "UX research, data analysis, data visualization, data-driven design, ergonomics, and human-robot interaction.",
            },
            {
              role: "BEng Industrial Design",
              period: "2014–2018 | South China University of Technology",
              description:
                "Product design, psychology, design management, user research, and ergonomics.",
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
                "Graphic design for 30+ exhibitions per year. Interactive installation design for “Wayfinding” project — 80 interactive mushroom lights over 2 km.",
            },
            {
              role: "New Media Concept Artist",
              period: "2020.03 – 2020.08 | Pixel Forest",
              description:
                "Exhibition/event concept design for new media art: projections, lighting, immersive interactive experiences.",
            },
          ]}
        />
      </div>
    </section>
  );
}
