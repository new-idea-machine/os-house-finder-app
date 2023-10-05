export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex p-4 text-center">
      HouseFinder &copy; {currentYear}
    </footer>
  );
}
