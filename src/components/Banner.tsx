"use client";
import Moon from "./Moon";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Typewriter } from "react-simple-typewriter";
export function Banner() {
  return (
    <div
      className="flex justify-center items-center h-screen  overflow-hidden"
      id="banner"
    >
      {/* Background Image with filters (only this div is filtered) */}
      {/* Background Image */}
      <div
        className="absolute inset-0 h-screen -z-10"
        style={{
          backgroundImage: 'url("/max-mckinnon-c9OCWLka764-unsplash.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: " saturate(0.1) brightness(0.8)",
        }}
      />
      {/* Text */}
      <div className="absolute inset-0 flex flex-col gap-8 justify-center items-center z-10 text-white pointer-events-none ">
        <div className="flex flex-col gap-6 items-center text-center ">
          <p className="text-xl md:text-2xl font-thin pointer-events-none">
            HELLO from the MOON
          </p>
          <h1 className=" text-4xl md:text-7xl font-display ">
            It&apos;s Yueying Shi
          </h1>
          <p className="text-xl md:text-2xl font-thin pointer-events-none">
            ... and let us talk about{" "}
            <span className="">
              <Typewriter
                words={["design.", "data.", "life."]}
                loop={0} // 0 = infinite loop
                cursor
                cursorStyle="I"
                typeSpeed={80}
                deleteSpeed={60}
                delaySpeed={1200}
              />
            </span>
          </p>
        </div>
        <a
          href="#projects"
          className="p-2 pt-3 pb-1 rounded-full pointer-events-auto
             transition duration-300 ease-in-out
             hover:bg-white/20 hover:scale-110 transform"
        >
          <ChevronDownIcon className="h-12 w-12" />
        </a>
      </div>

      {/* 3D Scene */}
      <div className="">
        <Moon />
      </div>
    </div>
  );
}
