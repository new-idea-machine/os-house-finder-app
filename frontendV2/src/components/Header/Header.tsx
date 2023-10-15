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
import { useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetPrimitiveContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export type MenuItem = {
  title: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    title: 'Profiles',
    href: '/profiles',
  },
  {
    title: 'History',
    href: '/history',
  },
  {
    title: 'Bookmark',
    href: '/bookmark',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
];

export default function Header() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();
  const location = useLocation();

  return (
    <header>
      <div className="sticky top-0 z-40 bg-gray-300 px-9">
        <div className="flex h-20 items-center justify-between space-x-3">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg font-bold text-gray-700 hover:text-gray-900"
          >
            <img
              width={40}
              src={logo}
              alt="HouseFinder"
              className="rounded-sm"
            />
            <p>HouseFinder</p>
          </a>

          <div className="md:hidden">
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

          <div className="hidden h-full w-full items-center justify-between md:flex">
            <div className="flex h-full space-x-6 px-9">
              {menuItems.map((menuItem) => {
                return (
                  <a
                    href={menuItem.href}
                    className={cn(
                      'relative flex h-full w-24 items-center justify-center hover:bg-gray-400',
                      location.pathname.startsWith(menuItem.href) &&
                        'bg-gray-400'
                    )}
                  >
                    {location.pathname.startsWith(menuItem.href) && (
                      <div className="absolute top-[calc(50%+34px)] z-50 h-1.5 w-full bg-gray-500" />
                    )}
                    <div>{menuItem.title}</div>
                  </a>
                );
              })}
            </div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center text-gray-500 hover:cursor-pointer hover:text-gray-600">
                    <UserCircle className="h-7 w-7" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <a
                        href="/login"
                        className="flex gap-1 hover:cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a
                      href="/register"
                      className="flex gap-1 hover:cursor-pointer"
                    >
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
