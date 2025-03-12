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
import { ResetPasswordFormSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import ILoader from "@/components/blocks/ILoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "@/lib/react-query";
import { toast } from "sonner";
import { routePaths } from "@/constants";

const ResetPasswordFrom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [validationChecked, setValidationChecked] = useState(false);
  const { mutateAsync: resetPassword, isPending: isResettingPassword } = useResetPassword();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });


  useEffect(() => {
    const validateResetParams = () => {

      if (!userId || !secret) {
        console.error("Missing required parameters for password reset");
        toast.error("Invalid reset link", {
          description: "The password reset link is invalid or has expired.",
        });
        setTimeout(() => navigate(routePaths.ForgotPassword), 3000);
        setIsValidToken(false);
      } else {
        console.log("Reset parameters validated successfully");
        setIsValidToken(true);
      }
      setValidationChecked(true);
    };

    validateResetParams();
  }, [userId, secret]);

  async function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    if (!userId || !secret) {
      toast.error("Missing reset parameters", {
        description: "The password reset link appears to be invalid.",
      });
      return;
    }

    try {
      const data = {
        userId,
        secret,
        password: values.password
      }
      const result = await resetPassword(data);

      console.log("Password reset success:", result);

      toast.success("Password reset successful", {
        description: "Your password has been reset. You can now sign in with your new password.",
      });

      setTimeout(() => navigate(routePaths.SignIn), 2000);
    } catch (error) {
      console.error("Failed to reset password:", error);

      toast.error("Password reset failed", {
        description: "The reset link may have expired. Please request a new one.",
      });
    }
  }

  if (!validationChecked) {
    return (
      <div className="flex flex-col items-center justify-center max-w-sm">
        <ILoader />
        <p className="font-light text-foreground/60 mt-2">
          Validating reset link...
        </p>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex flex-col items-center justify-center max-w-sm">
        <h2 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">
          Invalid Reset Link
        </h2>
        <p className="font-light text-foreground/60 mt-2">
          Redirecting to forgot password page...
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center max-w-sm">
        <Lollipop size={"60"} />
        <h2 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">Reset Password</h2>
        <p className="font-light text-foreground/60">Create a new password for your account</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-6">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input className="max-w-sm" type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-sm">
            {isResettingPassword ? (
              <span className="flex flex-row"><ILoader right />  Loading... </span>
            ) : ("Sign up")}
          </Button>

        </form>
      </div>
    </Form >
  );
}

export default ResetPasswordFrom