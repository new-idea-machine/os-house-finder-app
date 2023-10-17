import { User, UserCircle, UserPlus2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import FormContainer from '@components/FormContainer';

function NotLoginDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center text-gray-500 hover:cursor-pointer hover:text-gray-600">
          <UserCircle className="h-7 w-7" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  className="flex w-full justify-evenly hover:cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>

              <FormContainer>
                <FormContainer.LoginScreen />
              </FormContainer>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                className="flex w-full justify-evenly hover:cursor-pointer"
              >
                <UserPlus2 className="mr-2 h-4 w-4" />
                Register
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>

            <FormContainer>
              <FormContainer.RegisterScreen />
            </FormContainer>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotLoginDropdown;
