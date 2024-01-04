import HomeHero from '@components/Home/HomeHero/HomeHero';
import HomeSecondary from '@components/Home/HomeSecondary/HomeSecondary';
import HomeHowItWorks from '@components/Home/HomeHowItWorks/HomeHowItWorks';
import HomeDescription from '@components/Home/HomeDescription/HomeDescription';

function HomeScreen() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeSecondary />
      <HomeHowItWorks />
      <HomeDescription />
    </div>
  );
}

export default HomeScreen;
