type ProfessionalCardProps = {
  name: string;
  title: string;
  description: string;
  image: string;
};

function ProfessionalCard({
  name,
  title,
  description,
  image,
}: ProfessionalCardProps) {
  return (
    <div className="px-5">
      <img className="mx-auto" src={image} width={200} alt="Shirt" />
      <p className="text-center fw-bold pt-3">{name}</p>
      <p className="text-center fw-bold">{title}</p>
      <p className="text-center fw-bold">{description}</p>
    </div>
  );
}

export default ProfessionalCard;
