import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import FormContainer from '@components/AuthForms/FormContainer';

function NotLoginHamburger() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex justify-evenly hover:cursor-pointer"
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm sm:max-w-[425px] lg:max-w-lg xl:max-w-2xl">
          {/* <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader> */}

          <FormContainer>
            <FormContainer.LoginForm />
          </FormContainer>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex justify-evenly hover:cursor-pointer"
          >
            Register
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm sm:max-w-[425px] lg:max-w-lg xl:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription> */}
          </DialogHeader>

          <FormContainer>
            <FormContainer.RegisterForm />
          </FormContainer>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NotLoginHamburger;
