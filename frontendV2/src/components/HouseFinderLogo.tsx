import houseFinderSVG from '@/assets/images/HouseFinderLogoSVG.svg';

export default function HouseFinderLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-light-green">
        {/* TODO: Alt attribute */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={houseFinderSVG} />
      </div>
      <div className="font-bold text-white">
        <p>House</p>
        <p>Finder</p>
      </div>
    </div>
  );
}
