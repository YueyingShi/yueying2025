import Image from "next/image";
export default function HideNSeek() {
  return (
    <section className="paragraph">
      {Array.from({ length: 12 }, (_, i) => (
        <Image
          key={i + 1}
          src={`/projects/hidenseek/${i + 1}.png`}
          alt="hide and seek"
          width={1000}
          height={2000}
          className="flex-1 h-64 object-contain rounded"
        />
      ))}
    </section>
  );
}
