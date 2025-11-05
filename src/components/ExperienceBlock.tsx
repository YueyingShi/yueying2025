interface ExperienceItem {
  role: string;
  period: string;
  description: string;
}

interface ExperienceBlockProps {
  title: string;
  items: ExperienceItem[];
}

export default function ExperienceBlock({
  title,
  items,
}: ExperienceBlockProps) {
  return (
    <div className="flex flex-col mb-2">
      {/* Section Title */}
      <h3 className="text-lg font-bold tracking-wide mb-2 text-gray-400">
        {title}
      </h3>

      {/* Items */}
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl  border border-gray-200  transition"
          >
            <div className="flex flex-col gap-1 mb-2">
              <h5 className="text-lg font-semibold">{item.role}</h5>
              <span className="text-sm text-gray-500">{item.period}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
