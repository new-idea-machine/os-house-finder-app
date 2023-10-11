import decision from '../assets/images/Decision.jpg';

// TODO: As of now, the current goal is to remove React-Bootstrap so for now, this component will only render a single image.
// Later on we'll return here and actually implement a functional carousel with tailwind, but for now, it's low priority.
export default function HomeCarousel() {
  return (
    <div className="flex justify-center">
      <img className="w-4/6 h-5/6" src={decision} alt="One" />
    </div>
  );
}
