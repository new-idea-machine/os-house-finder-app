import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type ProfessionalCardProps = {
  name: string;
  title: string;
  description: string;
  image: string;
};

export default function ProfessionalCard({
  name,
  title,
  description,
  image,
}: ProfessionalCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-5">
        <img className="mx-auto" src={image} width={200} alt="Shirt" />
        <div className="space-y-3">
          <CardTitle className="text-center">{name}</CardTitle>
          <CardDescription className="text-center text-base">
            {title}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardContent />
    </Card>
  );
}
