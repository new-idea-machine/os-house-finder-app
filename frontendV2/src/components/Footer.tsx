export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center p-4">
      HouseFinder &copy; {currentYear}
    </footer>
  );
}
