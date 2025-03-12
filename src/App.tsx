import { Routes, Route } from 'react-router-dom';
import SigninForm from './pages/_auth/SigninForm';
import { Home } from './pages/_root/pages';
import AuthLayout from './pages/_auth/AuthLayout';
import SignupForm from './pages/_auth/SignupForm';
import RootLayout from './pages/_root/RootLayout';
import ForgotPasswordForm from './pages/_auth/ForgotPasswordForm';
import ResetPasswordFrom from './pages/_auth/ResetPasswordFrom';
import VerifyEmailForm from './pages/_auth/VerifyEmailForm';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { routePaths } from './constants';
import { AuthProvider } from './components/auth-provide';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <main className="flex h-screen">
          <Routes>

            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path={routePaths.SignIn} element={<SigninForm />} />
              <Route path={routePaths.SignUp} element={<SignupForm />} />
              <Route path={routePaths.ForgotPassword} element={<ForgotPasswordForm />} />
              <Route path={routePaths.ResetPassword} element={<ResetPasswordFrom />} />
              <Route path={routePaths.VerifyEmail} element={<VerifyEmailForm />} />
            </Route>

            {/* Private Routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>

          </Routes>
        </main>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
