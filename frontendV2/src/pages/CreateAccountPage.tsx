import HouseFinderLogo from '@components/HouseFinderLogo';
import { Button } from '@components/ui/button';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown';
import backgroundImg from '@/assets/images/CreateAccountBackground.png';

export default function CreateAccountPage() {
  return (
    <div className="h-screen w-full">
      <div
        className="h-screen w-screen flex-col bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* Desktop */}
        <div className="container hidden w-5/6 justify-between pt-24 md:flex">
          <HouseFinderLogo />
          <div className="flex space-x-6 font-semibold text-white">
            <a href="/">FAQ</a>
            <a href="/">Login/Signup</a>
          </div>
        </div>

        {/* Mobile */}
        <div className="container flex w-5/6 justify-end pt-24 text-2xl text-white md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center  pr-9 text-gray-500 hover:cursor-pointer hover:text-gray-600">
                <RxHamburgerMenu />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button variant="ghost">Login</Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost">FAQ</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mx-10 py-32 sm:py-48 lg:py-56">
          <div className="space-y-9 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-6xl">
              Create your account to add homes
            </h1>
            <Button
              className="h-11 rounded-full bg-light-green text-lg"
              size="lg"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-navy px-3 py-24">
        <div className="flex justify-between space-x-16 md:space-x-24">
          <HouseFinderLogo />
          <div className="grid grid-cols-2 gap-2 font-semibold text-white md:gap-6">
            <a href="/">FAQ</a>
            <a href="/">Login/Signup</a>
            <a href="/">Instagram</a>
            <a href="/">Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}
