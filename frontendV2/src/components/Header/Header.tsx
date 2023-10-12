import logo from '@assets/images/HouseLogoGrey.svg';
import { useAppSelector } from '@app/hooks';
import { LogOut, User, UserCircle, Menu, UserPlus2 } from 'lucide-react';
import useAuth from '@hooks/useAuth';
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
  const { userInfo } = useAppSelector((state) => state.auth);

  const { handleLogout } = useAuth();

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-gray-300 px-9">
        <div className="flex h-28 items-center justify-between space-x-3">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg font-bold text-gray-700 hover:text-gray-900"
          >
            <img width={40} src={logo} alt="HouseFinder" />
            <p>HouseFinder</p>
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
                  <ol className="flex flex-col items-end space-y-4 pr-8 pt-12 text-2xl font-bold">
                    <a href="/">Profile</a>
                    {userInfo ? (
                      <a href="/">Logout</a>
                    ) : (
                      <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                      </>
                    )}
                  </ol>
                  <SheetClose className="absolute right-9 top-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <Cross2Icon className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetPrimitiveContent>
              </SheetPortal>
            </Sheet>
          </div>

          <div className="hidden lg:mx-auto lg:flex lg:w-auto lg:items-center lg:space-x-6">
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
                    <a href="/" onClick={handleLogout}>
                      Log out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // <a href="/login" className="flex gap-1">
              //   <UserCircle className="h-7 w-7" />
              //   Login
              // </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center text-gray-500 hover:cursor-pointer hover:text-gray-600">
                    <UserCircle className="h-7 w-7" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <a href="/login" className="flex gap-1">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="/register" className="flex gap-1">
                      <UserPlus2 className="mr-2 h-4 w-4" />
                      Register
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
