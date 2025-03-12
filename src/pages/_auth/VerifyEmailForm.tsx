import { Button } from '@/components/ui/button';
import { routePaths } from '@/constants';
import { useUpdateEmailVerification } from '@/lib/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ isVerifying, setIsVerifying ] = useState<boolean>(true);
  const { mutateAsync: updateEmailVerification } = useUpdateEmailVerification();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (!userId || !secret) {
      toast.error('Invalid verification link', {
        description: 'Please check your email for the correct link.',
      });
      navigate(routePaths.SignIn);
      return;
    }

    const verifyEmail = async () => {
      try {
        const data = { userId, secret };
        const result = await updateEmailVerification(data);
        console.log("Verification result:", result);
        toast.success('Email verified successfully!', {
          description: 'You can now sign in with your account.',
        });
        navigate(routePaths.SignIn);
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Verification failed', {
          description: 'Please try again or request a new verification email.',
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl md:text-3xl font-bold pt-5 sm:pt-12 leading-[140%] tracking-tighter">Email Verification</h1>
      {isVerifying ? (
        <p>Verifying your email...</p>
      ) : (
        <Button onClick={() => navigate(routePaths.SignIn)}>Go to Sign In</Button>
      )}
    </div>
  );
}

export default VerifyEmailForm