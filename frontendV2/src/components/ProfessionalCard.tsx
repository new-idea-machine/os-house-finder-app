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
      <p className="fw-bold pt-3 text-center">{name}</p>
      <p className="fw-bold text-center">{title}</p>
      <p className="fw-bold text-center">{description}</p>
    </div>
  );
}

export default ProfessionalCard;
