import rightArrow from '@assets/images/home/right_arrow.png';
import howItWorks from '@assets/images/home/how_it_works.png';

function HomeHowItWorks() {
  return (
    <section className="bg-navy-secondary flex flex-col items-center text-white">
      <div className="w-full max-w-[1440px]">
        <div className="relative px-16 py-12">
          <h3 className="[font-size:_clamp(32px,5%,60px)]">How it works</h3>
          <img
            src={rightArrow}
            alt="right arrow"
            className="absolute left-56"
          />
        </div>
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-center">
          <img src={howItWorks} alt="how it works" />
        </div>
      </div>
    </section>
  );
}

export default HomeHowItWorks;
