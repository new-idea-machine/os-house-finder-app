import ProfessionalCard from './ProfessionalCard';
import shirt from '../assets/images/Shirt.png';

function About() {
  return (
    <>
      <h1 className="pt-4 text-center text-3xl">About us</h1>
      <div className="mx-auto grid max-w-sm items-start gap-2 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
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

export default About;