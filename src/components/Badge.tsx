type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full  text-sm px-3 py-1  border `}>
      {text}
    </span>
  );
}
