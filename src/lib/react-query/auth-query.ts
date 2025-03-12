import { INewUser } from "@/types";
import {
    useMutation,
} from "@tanstack/react-query";
import { createUserAccount, sendRecoveryEmail, signInAccount, signOutAccount, updateEmailVerification, updateResetPassword } from "../appwrite";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            signInAccount(user),
    });
};

export const useSendRecoveryEmail = () => {
    return useMutation({
        mutationFn: (params: { email: string }) => sendRecoveryEmail(params.email)
    })
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (params: { userId: string, secret: string, password: string }) =>
            updateResetPassword(params.userId, params.secret, params.password)
    })
};

export const useUpdateEmailVerification = () => {
    return useMutation({
        mutationFn: (params: { userId: string, secret: string }) =>
            updateEmailVerification(params.userId, params.secret),
    });
};

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
};