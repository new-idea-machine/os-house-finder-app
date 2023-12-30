import HomeHero from '../components/HomeHero/HomeHero';
import About from '../components/About';

function HomeScreen() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <About />
    </div>
  );
}

export default HomeScreen;
