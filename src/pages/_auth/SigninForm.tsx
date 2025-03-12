import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lollipop } from "lucide-react";
import { SigninFormSchema } from "@/lib/validation";
import ILoader from "@/components/blocks/ILoader";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "@/constants";
import { useUserContext } from "@/components/auth-provider";
import { useSignInAccount } from "@/lib/react-query";
import { toast } from "sonner";

const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    const session = await signInAccount(values);

    if (!session) {
      toast.error("Login failed. Please try again.");

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      toast.success("Sign In Successful");

      navigate(routePaths.Home);
    } else {
      toast.error("Login failed. Please try again.");

      return;
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center max-w-sm px-4 md:px-0">
        <Lollipop size={"60"} />
        <h2 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">Sign in to your account</h2>
        <p className="font-light text-foreground/60">Welcome back! Please enter your details.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="max-w-sm" type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="max-w-sm" type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  <Link to={routePaths.ForgotPassword}>
                    <Button variant={"link"} className="text-chart-1 font-bold cursor-pointer">Forgot Password?</Button>
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="max-w-sm">
            {isUserLoading || isSigningInUser ? (
              <span className="flex flex-row"><ILoader right /> Loading... </span>
            ) : ("Sign in")}
          </Button>

          <p className="">
            Don&apos;t have an account?
            <Link to={routePaths.SignUp}>
              <Button variant={"link"} className="text-chart-1 font-bold cursor-pointer">Sign Up</Button>
            </Link>
          </p>
        </form>
      </div>
    </Form >
  );
}

export default SigninForm