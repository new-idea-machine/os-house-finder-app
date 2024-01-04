import homeHeroLogo from '@assets/images/home/home_hero_logo.png';
import FormContainer from '@components/AuthForms/FormContainer';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog';

function HomeHeroNav() {
  return (
    <section className="absolute top-[calc(0%)] flex w-full justify-between px-14 pr-10 pt-24">
      <div>
        <img alt="home_hero_logo" src={homeHeroLogo} />
      </div>
      <div className="flex items-center text-white">
        <Button
          variant="link"
          className="text-shadow-default mr-4 text-2xl shadow-slate-500"
        >
          FAQ
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-shadow-default text-2xl shadow-slate-500 hover:cursor-pointer"
            >
              Login/Signup
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm sm:max-w-[425px] lg:max-w-lg xl:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
                Please login with email and password to continue.
              </DialogDescription>
            </DialogHeader>

            <FormContainer>
              <FormContainer.LoginForm />
            </FormContainer>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

export default HomeHeroNav;
