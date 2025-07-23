interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const { slug } = params;

  return (
    <div>
      <h1>Project: {slug}</h1>
    </div>
  );
}
