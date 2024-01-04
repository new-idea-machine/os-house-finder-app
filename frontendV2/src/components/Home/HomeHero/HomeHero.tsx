import HomeHeroNav from '@components/Home/HomeHero/HomeHeroNav';
import HomeHeroContent from '@components/Home/HomeHero/HomeHeroContent';
import homeHeroBg from '@assets/images/home/home_hero_bg.png';

export default function HomeHero() {
  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeHeroBg})` }}
    >
      <HomeHeroNav />
      <HomeHeroContent />
    </div>
  );
}
