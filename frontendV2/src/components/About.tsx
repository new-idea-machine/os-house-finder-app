import ProfessionalCard from './ProfessionalCard';
import shirt from '../assets/images/Shirt.png';

export default function About() {
  return (
    <>
      <h1 className="pt-4 text-center text-3xl">About us</h1>
      <div className="grid max-w-sm gap-2 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 place-items-center">
        <ProfessionalCard
          name="Employee 1"
          title="Frontend developer"
          description="1st Employee"
          image={shirt}
        />
        <ProfessionalCard
          name="Employee 2"
          title="Backend developer"
          description="2st Employee"
          image={shirt}
        />
        <ProfessionalCard
          name="Employee 3"
          title="Product manager"
          description="3st Employee"
          image={shirt}
        />
        <ProfessionalCard
          name="Employee 4"
          title="UX designer"
          description="4st Employee"
          image={shirt}
        />
      </div>
    </>
  );
}
