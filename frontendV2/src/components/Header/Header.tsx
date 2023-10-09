import logo from '@assets/images/HouseLogoGrey.svg';
import { useSelector } from 'react-redux';
import { LogOut, User, UserCircle, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown';

import { Cross2Icon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetPrimitiveContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-gray-300 px-9">
        <div className="flex h-20 items-center justify-between space-x-3">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg font-bold text-gray-700 hover:text-gray-900"
          >
            <img width={40} src={logo} alt="HouseFinder" />
            <p>House-Tracker</p>
          </a>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="h-6 w-6 hover:text-gray-500" />
              </SheetTrigger>
              <SheetPortal>
                <SheetOverlay />
                <SheetPrimitiveContent
                  side="top"
                  className="h-screen data-[state=open]:duration-300"
                >
                  <ol className="pt-12 flex flex-col items-end pr-8 space-y-4 font-bold text-2xl">
                    <a href="/">Profile</a>
                    <a href="/">Logout</a>
                  </ol>
                  <SheetClose className="absolute right-9 top-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <Cross2Icon className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetPrimitiveContent>
              </SheetPortal>
            </Sheet>
          </div>

          <div className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
            <a className="hover:text-gray-900" href="/faq">
              FAQ
            </a>
            <a className="hover:text-gray-900" href="/demo">
              Scoring Demo
            </a>
            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center text-gray-500 hover:cursor-pointer hover:text-gray-600">
                    <UserCircle className="h-7 w-7" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <a href="/">Profile</a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <a href="/">Log out</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href="/login">
                <UserCircle className="h-7 w-7" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
