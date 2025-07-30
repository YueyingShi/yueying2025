"use client";
import React from "react";
export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-16 text-white">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>

      <p className="text-lg leading-relaxed mb-12">
        I believe in the power of data-driven and user-centric design. By
        analyzing user feedback and behavior, designers can create solutions
        that are both visually compelling and functionally efficient—directly
        addressing real user challenges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <div className="mb-6">
            <h4 className="font-semibold">MSc Human-Computer Interaction</h4>
            <p className="text-sm text-gray-300">
              2020–2022 | Eindhoven University of Technology
            </p>
            <p>
              Courses: UX methods, data analysis, ergonomics, data-aided design,
              data visualization, ML & design, principles of robot interaction.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">BEng Industrial Design</h4>
            <p className="text-sm text-gray-300">
              2014–2018 | South China University of Technology
            </p>
            <p>
              Courses: Interaction Design, Vehicle Design, 3D Design, Design
              Psychology, Design Management, Design Methodology.
            </p>
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Work Experience</h3>
          <div className="mb-6">
            <h4 className="font-semibold">UX Designer & Researcher</h4>
            <p className="text-sm text-gray-300">2022.09 – Present | Deerns</p>
            <p>
              Responsible for digital UX solutions including web app
              development, design system setup & maintenance.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">UX Design Intern</h4>
            <p className="text-sm text-gray-300">
              2021.09–2022.03 | Accenture (VanBerlo)
            </p>
            <p>
              Handled user research, interaction and visual design, and user
              testing. Participated in consulting projects and internal tool
              development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">UX Designer</h4>
            <p className="text-sm text-gray-300">2018.07–2019.09 | Konka</p>
            <p>
              Designed interactions for smart TV software, including games,
              video chat, facial recognition, and voice assistant. Contributed
              to the core system used by 21.9M+ daily users.
            </p>
          </div>
        </div>

        {/* Part-time Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Part-time Projects</h3>

          <div>
            <h4 className="font-semibold">
              Installation Artist & Graphic Designer
            </h4>
            <p className="text-sm text-gray-300">
              2022.09 – Present | GLOW Eindhoven
            </p>
            <p>
              Created poster visuals for over 30 exhibitions during the
              festival.
            </p>
            <p>
              Designed "Wayfinding" — 80 interactive fantasy mushroom lights
              spread across 2 km of outdoor exhibition path.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">New Media / Concept Artist</h4>
            <p className="text-sm text-gray-300">
              2020.03 – 2020.08 | Pixel Forest
            </p>
            <p>
              Led exhibition and event concept design for new media art,
              including wall projections, lighting, and immersive experiences in
              zoos and gardens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
