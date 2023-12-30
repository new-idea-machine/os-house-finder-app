import homeHeroLogo from '@assets/images/home/home_hero_logo.png';

function HomeHeroNav() {
  return (
    <section className="flex justify-between px-14 pt-24">
      <div>
        <img alt="home_hero_logo" src={homeHeroLogo} />
      </div>
      <div className="flex items-center text-white">
        <div className="mr-28">
          <p className="text-shadow-lg shadow-indigo-500/50">FAQ</p>
        </div>
        <div className="text-shadow-lg shadow-indigo-500/50">Login/Signup</div>
      </div>
    </section>
  );
}

export default HomeHeroNav;
