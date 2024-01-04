import DescriptionContent from '@components/Home/HomeDescription/DescriptionContent';
import DescriptionHeader from '@components/Home/HomeDescription/DescriptionHeader';
import DescriptionSteps from '@components/Home/HomeDescription/DescriptionSteps';
import DescriptionLinks from './DescriptionLinks';

function HomeDescription() {
  return (
    <section className="from-navy flex justify-center bg-gradient-to-b to-black text-white">
      <div className="w-full max-w-[1440px]">
        <DescriptionHeader />
        <DescriptionContent />
        <DescriptionSteps />
        <DescriptionLinks />
      </div>
    </section>
  );
}

export default HomeDescription;
