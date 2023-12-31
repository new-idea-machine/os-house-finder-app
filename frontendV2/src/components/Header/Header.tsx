import logo from '@assets/images/HouseLogoGrey.svg';
import { useAppSelector } from '@app/hooks';
import { LogOut, User, UserCircle, Menu } from 'lucide-react';
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
import { useLocation, useNavigate } from 'react-router-dom';

import NotLoginDropdown from '@components/HeaderLoginRegisterBtn/NotLoginDropdown';
import NotLoginHamburger from '@components/HeaderLoginRegisterBtn/NotLoginHamburger';

import { Button } from '@/components/ui/button';
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
  const navigate = useNavigate();

  return (
    <header>
      <div className="sticky top-0 z-40 bg-secondary">
        <div className="flex h-20 items-center justify-between">
          <a
            href="/"
            className="flex w-1/3 items-center justify-center space-x-2 text-lg font-bold text-gray-700 hover:text-gray-900"
          >
            <img
              width={40}
              src={logo}
              alt="HouseFinder"
              className="rounded-sm"
            />
            <p className="text-sm hover:scale-95 sm:text-base lg:text-lg xl:text-3xl">
              HouseFinder
            </p>
          </a>

          <div className="pr-9 md:hidden">
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
                    <Button
                      variant="ghost"
                      className="flex justify-evenly hover:cursor-pointer"
                    >
                      Profile
                    </Button>
                    {userInfo ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleLogout();
                          setTimeout(() => {
                            navigate('/');
                          }, 800);
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <NotLoginHamburger />
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
            <div className="flex h-full space-x-2 pr-9 lg:space-x-8">
              {menuItems.map((menuItem) => {
                return (
                  <a
                    key={menuItem.title}
                    href={menuItem.href}
                    className={cn(
                      'relative flex h-full items-center justify-center hover:scale-95 hover:bg-gray-400 md:w-24 md:text-sm lg:w-32 lg:text-base xl:w-40 xl:text-lg',
                      location.pathname.startsWith(menuItem.href) &&
                        'bg-gray-500 text-white'
                    )}
                  >
                    {location.pathname.startsWith(menuItem.href) && (
                      <div className="absolute top-[calc(50%+34px)] z-50 h-1.5 w-full bg-gray-600" />
                    )}
                    <div>{menuItem.title}</div>
                  </a>
                );
              })}
            </div>
            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center  pr-9 text-gray-500 hover:cursor-pointer hover:text-gray-600">
                    <UserCircle className="h-7 w-7" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Button variant="ghost">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setTimeout(() => {
                          navigate('/');
                        }, 800);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NotLoginDropdown />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
