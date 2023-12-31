import HomeHero from '@components/Home/HomeHero/HomeHero';
import About from '@components/About';
import HomeSecondary from '@components/Home/HomeSecondary/HomeSecondary';

function HomeScreen() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeSecondary />
      <About />
    </div>
  );
}

export default HomeScreen;
