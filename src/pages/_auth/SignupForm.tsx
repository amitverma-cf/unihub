import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lollipop } from "lucide-react";
import { SignupFormSchema } from "@/lib/validation";
import ILoader from "@/components/blocks/ILoader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query";
import { useUserContext } from "@/components/auth-provider";

const SignupForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createNewUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();


  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    try {
      const newUser = await createNewUserAccount(values);

      if (newUser) {
        return toast.error('Sign up failed. Please try again.');
      }
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast.error("Something went wrong. Please login your new account. ");

        navigate("/sign-in");

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        toast.success("Sign Up Successful");

        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center max-w-sm  px-4 md:px-0">
        <Lollipop size={"60"} />
        <h2 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">Create a new account</h2>
        <p className="font-light text-foreground/60">Enter your details to Sign Up on Unihub</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className="max-w-sm" type="text" placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="max-w-sm" type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-sm">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <span className="flex flex-row"><ILoader right /> Loading... </span>
            ) : ("Sign up")}
          </Button>

          <p className="">
            Already have an account?
            <Link to="/sign-in">
              <Button variant={"link"} className="text-chart-1 font-bold cursor-pointer">Sign In</Button>
            </Link>
          </p>
        </form>
      </div>
    </Form >
  );
};

export default SignupForm;
