import Image from "next/image";

export default function FoodTinder() {
  return (
    <>
      <section className="paragraph">
        <p>
          Every November, Eindhoven hosts a festival of light art throughout the
          city that attracts many visitors. Over the past 15 years, from 45,000
          visitors in the beginning to over 770,000 visitors in 2019, GLOW has
          grown from a week-long light art festival to a city symbol of
          Eindhoven.
        </p>
      </section>
      <section className="paragraph">
        <h2>Navigation Design</h2>
        <div className="flex gap-4 w-full">
          <Image
            src="/projects/glow/mushroom2.jpeg"
            alt="Navigation Design"
            width={600}
            height={600}
            className="flex-1 h-64 object-cover rounded"
          />
          <Image
            src="/projects/glow/mushroom3.jpg"
            alt="Navigation Design"
            width={600}
            height={600}
            className="flex-1 h-64 object-cover rounded"
          />
        </div>

        <p>
          In the sunmmer of 2021, we, the group members from different majors,
          got together to brainstorm an interactive art installation. The idea
          later turned into 80 illuminated mushrooms spread across the campus,
          which, through interaction, will guide visitors to the next
          interactive installation.
        </p>
        <p>
          A path full of magical luminescent mushrooms. Enchanting interaction.
          A unique and beautiful way to find your way. That is how visitors to
          Eindhoven University of Technology are guided through the site during
          GLOW, from one installation to another. Between all these
          installations, that&apos;s where the Wayfinding project shines. The
          mushrooms form an interactive system. Visitors can activate a
          mushroom, after which it glows and spreads its &apos;spores&apos;,
          which activate another mushroom nearby. This creates a chain reaction,
          which submerges the entire path - or parts of it - in a sea of
          ​​​​light.
        </p>
      </section>
      <section className="paragraph">
        <h2>Graphic Design</h2>
        <div className="flex  w-full rounded overflow-clip">
          <Image
            src="/projects/glow/academy.gif"
            alt="Navigation Design"
            width={400}
            height={300}
            className="flex-1  h-64 max-w-1/3 object-cover "
          />
          <Image
            src="/projects/glow/city.gif"
            alt="Navigation Design"
            width={400}
            height={300}
            className="flex-1 h-64 max-w-1/3 object-cover "
          />
          <Image
            src="/projects/glow/lab.gif"
            alt="Navigation Design"
            width={400}
            height={300}
            className="flex-1 h-64 max-w-1/3 object-cover "
          />
        </div>
        <p>
          In addition to working as the installation artist, I am also
          responsible for the project&apos;s graphic design. This includes
          creating posters for the installations—over 30 projects each year—as
          well as designing social media videos and icons for marketing
          purposes.
        </p>
      </section>
    </>
  );
}
