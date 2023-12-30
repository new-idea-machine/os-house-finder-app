import HomeHeroNav from '@components/HomeHero/HomeHeroNav';
import HomeHeroContent from '@components/HomeHero/HomeHeroContent';
import homeHeroBg from '@assets/images/home/home_hero_bg.png';

export default function HomeHero() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeHeroBg})` }}
    >
      <HomeHeroNav />
      <HomeHeroContent />
    </div>
  );
}
