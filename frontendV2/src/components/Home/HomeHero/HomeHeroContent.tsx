import { Button } from '@components/ui/button';

function HomeHeroContent() {
  return (
    <div>
      <h3 className="text-shadow-sm text-5xl text-white shadow-black">
        Find your ideal home.
      </h3>
      <div className="mt-7 flex items-center justify-center gap-12">
        <Button variant="pill" className="h-12 px-7 text-xl">
          How it works
        </Button>
        <Button
          variant="pill"
          className="h-12 bg-[#25B799] px-7 text-xl text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default HomeHeroContent;
