type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-xl  text-xs px-3 py-1  border border-gray-400 text-gray-500`}
    >
      {text}
    </span>
  );
}
