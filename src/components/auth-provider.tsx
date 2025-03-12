import { routePaths } from "@/constants";
import { getCurrentUser } from "@/lib/appwrite";
import { IContextType, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PUBLIC_ROUTES = [
    routePaths.VerifyEmail,
    routePaths.ForgotPassword,
    routePaths.ResetPassword,
];

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [cookie, setCookie] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const isPublicRoute = PUBLIC_ROUTES.some(route =>
            location.pathname.startsWith(route)
        );

        const cookieFallback = localStorage.getItem("cookieFallback");

        const isUnauthenticated =
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined;

        if (!isPublicRoute && isUnauthenticated) {
            navigate(routePaths.SignIn);
            return;
        }

        if (!isUnauthenticated) {
            setCookie(cookieFallback);
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        if (cookie && cookie !== "[]") {
            checkAuthUser();
        } else {
            setIsAuthenticated(false);
            setUser(INITIAL_USER);
        }
    }, [cookie]);

    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);

                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext);