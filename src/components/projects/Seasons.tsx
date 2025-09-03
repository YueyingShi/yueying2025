import Image from "next/image";
export default function Seasons() {
  return (
    <>
      <section className="paragraph">
        <p>
          As the lead designer, I worked with our team to create an interactive
          installation called &quot;Seasons&quot;. The exhibit features a
          wraparound screen that transitions through spring, summer, autumn, and
          winter, showing how agriculture changes throughout the year. It helps
          kids and adults—especially those unfamiliar with farms—learn about the
          four seasons.
        </p>
        <h2>Connect to the Land</h2>
        <p>
          Many people grow up in cities and may not understand farming or
          appreciate where food comes from. The exhibit shows different
          landscapes for each season, helping visitors connect with nature and
          remember our roots in agriculture.
        </p>
        <h2>What Happens on Site</h2>
        <p>
          The hall fits up to 50 people, with interactive screens on three
          walls. Visitors can engage with farm animals, crops, and other
          elements. Multiple trigger points allow several people to interact at
          once, making the experience fun and collaborative.
        </p>
        <p>
          We conducted user research to ensure the interaction height and
          methods work for all ages. The accessible design lets both adults and
          children easily explore the farm and learn about traditional farming
          throughout the year.
        </p>
        <Image
          src="/projects/seasons.png"
          alt="seasons"
          width={1000}
          height={2000}
          className="flex-1 h-64 object-contain rounded "
        />
      </section>
    </>
  );
}
