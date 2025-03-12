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
import { ForgotPasswordFormSchema } from "@/lib/validation";
import ILoader from "@/components/blocks/ILoader";
import { Link } from "react-router-dom";
import { routePaths } from "@/constants";
import { useSendRecoveryEmail } from "@/lib/react-query";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const { mutateAsync: sendRecoveryEmail, isPending: isEmailSent } = useSendRecoveryEmail();

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordFormSchema>) {
    try {
      const response = await sendRecoveryEmail(values);
      console.log("Password reset email sent:", response);

      toast.success("Password reset email sent", {
        description: "Please check your email for the password reset link.",
      });

    } catch (error) {
      console.error("Failed to send password reset email:", error);

      toast.error("Something went wrong", {
        description: "We couldn't send the password reset email. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center max-w-sm">
        <Lollipop size={"60"} />
        <h2 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">Forgot Password</h2>
        <p className="font-light text-foreground/60">Enter your email to receive a password reset link</p>

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

          <Button type="submit" className="max-w-sm">
            {isEmailSent ? (
              <span className="flex flex-row"><ILoader right />  Loading... </span>
            ) : ("Sign up")}
          </Button>

          <p className="">
            Already have an account?
            <Link to={routePaths.SignIn}>
              <Button variant={"link"} className="text-chart-1 font-bold cursor-pointer">Sign In</Button>
            </Link>
          </p>
        </form>
      </div>
    </Form >
  );
}

export default ForgotPasswordForm