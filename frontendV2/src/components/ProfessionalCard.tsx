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
    <Card className="w-4/5">
      <CardHeader className="space-y-5 p-2">
        <div className="flex justify-center">
          <img src={image} width={200} height={25} alt="Shirt" />
        </div>

        <div className="space-y-3">
          <CardTitle className="text-center">{name}</CardTitle>
          <CardDescription className="text-center text-base">
            {title}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
