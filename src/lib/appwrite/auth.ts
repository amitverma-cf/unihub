// ============================================================
// AUTH
// ============================================================

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";
import { routePaths } from "@/constants";

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL | string;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        if (session) {
            await sendVerificationEmail();
        }

        return session;
    } catch (error) {
        console.log(error);
    }
}

//  ============================== SEND RECOVERY EMAIL
export async function sendRecoveryEmail(email: string) {
    try {
        const sendRecoveryEmail = await account.createRecovery(email, `${window.location.origin}${routePaths.ResetPassword}`);
        return sendRecoveryEmail;
    } catch (error) {
        return error;
    }
}

export async function updateResetPassword(userId: string, secret: string ,password: string) {
    try {
        const updateRecoveryPassword = await account.updateRecovery(userId, secret, password);
        return updateRecoveryPassword;
    } catch (error) {
        return error;
    }
    
}

// ============================== SEND VERIFICATION EMAIL
export async function sendVerificationEmail() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw new Error("User not authenticated");

        if (currentAccount.emailVerification) {
            console.log("Email already verified");
            return { status: "already-verified" };
        }

        const confirmEmail = await account.createVerification(`${window.location.origin}${routePaths.VerifyEmail}`);
        console.log("Verification email sent:", confirmEmail);

        return confirmEmail;
    } catch (error) {
        console.log("Failed to do email verification:", error);
        return error;
    }
}

// ============================== UPDATE EMAIL VERIFICATION
export async function updateEmailVerification(userId: string, secret: string) {
    try {
        const verification = await account.updateVerification(userId, secret);

        return verification;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET ACCOUNT
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET USER
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// ============================== SIGN OUT
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
}