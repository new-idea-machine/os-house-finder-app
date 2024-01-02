import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog';
import FormContainer from '@components/AuthForms/FormContainer';
import logoImage from '@assets/images/home/home_hero_logo.png';

function DescriptionLinks() {
  return (
    <section className="my-20 flex flex-col items-center">
      <h3 className="text-[40px]">Ready to Begin? </h3>
      <Button
        variant="pill"
        className="mb-20 mt-10 h-12 bg-[#25B799] px-7 text-xl text-white"
      >
        Get Started
      </Button>{' '}
      <Separator className="mb-10 max-w-[801px] bg-white" />
      <div className="flex items-center justify-center">
        <div className="flex-1">
          <img src={logoImage} alt="logo" />
        </div>
        <div className="flex flex-1 flex-wrap gap-10">
          <Button variant="link" className="text-xl text-white">
            FAQ
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="text-shadow-default text-xl shadow-slate-500 hover:cursor-pointer"
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
          <Button variant="link" className="text-xl text-white">
            Instagram
          </Button>
          <Button variant="link" className="text-xl text-white">
            Email
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DescriptionLinks;
