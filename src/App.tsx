import { Routes, Route } from 'react-router-dom';
import SigninForm from './pages/_auth/SigninForm';
import { Home } from './pages/_root/pages';
import AuthLayout from './pages/_auth/AuthLayout';
import SignupForm from './pages/_auth/SignupForm';
import RootLayout from './pages/_root/RootLayout';
import ForgotPasswordForm from './pages/_auth/ForgotPasswordForm';
import ResetPasswordFrom from './pages/_auth/ResetPasswordFrom';
import VerifyEmailForm from './pages/_auth/VerifyEmailForm';
import { Toaster } from '@/components/ui/sonner';
import { routePaths } from './constants';
import Chat from './pages/_root/pages/Chat';
import Explore from './pages/_root/pages/Explore';
import AllUsers from './pages/_root/pages/AllUsers';
import Saved from './pages/_root/pages/Saved';
import CreatePost from './pages/_root/pages/CreatePost';

function App() {
  return (
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
          <Route path={routePaths.Chat} element={<Chat />} />
          <Route path={routePaths.Explore} element={<Explore />} />
          <Route path={routePaths.People} element={<AllUsers />} />
          <Route path={routePaths.Saved} element={<Saved />} />
          <Route path={routePaths.CreatePost} element={<CreatePost />} />
        </Route>

      </Routes>
      <Toaster />
    </main>
  )
}

export default App
