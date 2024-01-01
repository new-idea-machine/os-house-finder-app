import HomeHero from '@components/Home/HomeHero/HomeHero';
import About from '@components/About';
import HomeSecondary from '@components/Home/HomeSecondary/HomeSecondary';
import HomeHowItWorks from '@components/Home/HomeHowItWorks/HomeHowItWorks';

function HomeScreen() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeSecondary />
      <HomeHowItWorks />
      <About />
    </div>
  );
}

export default HomeScreen;
