import { Earth, Home, MessageCircle, Star, UsersRound, ImagePlus } from "lucide-react";

export enum routePaths {
    // Auth
    SignIn = "/sign-in",
    SignUp = "/sign-up",
    ForgotPassword = "/fogot-password",
    ResetPassword = "/reset-password",
    VerifyEmail = "/verify-email",
    // Root
    Home = "/",
    Chat = "/chat",
    Explore = "/explore",
    People = "/all-users",
    Saved = "/saved",
    CreatePost = "/create-post"
};

export function TC(route: string): string {
    return route
      .replace(/^\//, '') // Remove leading slash
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  }

export const sidebarLinks = [
    {
        icon: <Home />,
        route: routePaths.Home,
        label: TC(routePaths.Home),
    },
    {
        icon: <MessageCircle />,
        route: routePaths.Chat,
        label: TC(routePaths.Chat),
    },
    {
        icon: <Earth />,
        route: routePaths.Explore,
        label: TC(routePaths.Explore),
    },
    {
        icon: <UsersRound />,
        route: routePaths.People,
        label: TC(routePaths.People),
    },
    {
        icon: <Star />,
        route: routePaths.Saved,
        label: TC(routePaths.Saved),
    },
    {
        icon: <ImagePlus />,
        route: routePaths.CreatePost,
        label: TC(routePaths.CreatePost),
    },
];

export const bottombarLinks = [
    {
        icon: <Home />,
        route: routePaths.Home,
        label: TC(routePaths.Home),
    },
    {
        icon: <MessageCircle />,
        route: routePaths.Chat,
        label: TC(routePaths.Chat),
    },
    {
        icon: <Earth />,
        route: routePaths.Explore,
        label: TC(routePaths.Explore),
    },
    {
        icon: <Star />,
        route: routePaths.Saved,
        label: TC(routePaths.Saved),
    },
    {
        icon: <ImagePlus />,
        route: routePaths.CreatePost,
        label: TC(routePaths.CreatePost),
    },
];
