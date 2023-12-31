import homeSecondary from '@assets/images/home/home_secondary.png';

function HomeSecondary() {
  return (
    <section className="bg-navy flex h-[587px] w-full justify-center text-white">
      <div className="flex w-full max-w-[1440px] items-center">
        <img src={homeSecondary} alt="home secondary" />
      </div>
    </section>
  );
}

export default HomeSecondary;
