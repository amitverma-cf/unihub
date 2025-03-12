// ============================================================
// CHAT
// ============================================================

import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "./config";

interface INewRoom {
    isGroup: boolean;
    name: string;
    users: string[];
    admins: string[];
}

interface INewMessage {
    roomId: string;
    userId: string;
    content: string;
}

// ============================== CREATE A NEW CHAT ROOM
export async function createChatRoom(room: INewRoom) {
    try {
        if (!room.isGroup) {
            if (room.users.length !== 2) {
                throw new Error("Direct message requires exactly 2 users");
            }

            const existingRoom = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.roomCollectionId,
                [
                    Query.equal("isGroup", false),
                    Query.search("users", room.users[0]),
                    Query.search("users", room.users[1]),
                ]
            );

            if (existingRoom.documents.length > 0) {
                return existingRoom.documents[0];
            }

            room.name = "";
        } else {
            if (!room.name.trim()) {
                throw new Error("Group chat requires a name");
            }
        }

        const newRoom = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            ID.unique(),
            {
                isGroup: room.isGroup,
                name: room.name,
                users: room.users,
                admins: room.admins,
                lastMessageAt: new Date().toISOString(),
                lastMessage: "",
            }
        );

        return newRoom;
    } catch (error) {
        console.log("Error creating chat room:", error);
        return error;
    }
}

// ============================== SEND MESSAGE
export async function sendMessage(mssg: INewMessage) {
    try {
        if (!mssg.content.trim()) {
            throw new Error("Message cannot be empty");
        }

        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            mssg.roomId
        );

        if (!room) {
            throw new Error("Room not found");
        }

        const userIds = room.users.map((user: any) => user.$id);

        if (!userIds.includes(mssg.userId)) {
            throw new Error("User is not a member of this chat room");
        }

        const newMessage = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.messageCollectionId,
            ID.unique(),
            {
                room: mssg.roomId,
                user: mssg.userId,
                content: mssg.content,
                timestamp: new Date().toISOString(),
            }
        );

        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            mssg.roomId,
            {
                lastMessage: mssg.content.length > 30 ? mssg.content.substring(0, 30) + "..." : mssg.content,
                lastMessageAt: new Date().toISOString(),
            }
        );

        return newMessage;
    } catch (error) {
        console.log("Error sending message:", error);
        return error;
    }
}

// ============================== GET ROOM MESSAGES
export async function getRoomMessages({
    roomId,
    limit = 50,
    cursor = null,
}: {
    roomId: string;
    limit?: number;
    cursor?: string | null;
}) {
    try {
        const queries: any[] = [
            Query.equal("room", roomId),
            Query.orderDesc("timestamp"),
            Query.limit(limit),
        ];

        if (cursor) {
            queries.push(Query.cursorAfter(cursor));
        }

        const messages = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.messageCollectionId,
            queries
        );

        return messages;
    } catch (error) {
        console.log("Error fetching messages:", error);
        return error;
    }
}

// ============================== GET USER'S CHAT ROOMS
export async function getUserChatRooms(userId: string) {
    try {
        const rooms = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            [
                Query.search("users", userId),
                Query.orderDesc("lastMessageAt"),
            ]
        );

        return rooms;
    } catch (error) {
        console.log("Error fetching user chat rooms:", error);
        return error;
    }
}

// ============================== ADD USER TO ROOM
export async function addUserToRoom({
    roomId,
    userId,
    adminId,
}: {
    roomId: string;
    userId: string;
    adminId: string;
}) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        if (!room.isGroup) {
            throw new Error("Cannot add users to direct message chats");
        }

        const admins = room.admins || [];
        if (!admins.includes(adminId)) {
            throw new Error("Only admins can add users to this chat");
        }

        const currentUsers = room.users.map((user: any) => user.$id || user);

        if (currentUsers.includes(userId)) {
            return room;
        }

        currentUsers.push(userId);

        const updatedRoom = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId,
            {
                users: currentUsers,
            }
        );

        await sendMessage({
            roomId,
            userId: adminId,
            content: `Note: New user has been added to the chat`,
        });

        return updatedRoom;
    } catch (error) {
        console.log("Error adding user to room:", error);
        return error;
    }
}

// ============================== REMOVE USER FROM ROOM
export async function removeUserFromRoom({
    roomId,
    userId,
    adminId,
}: {
    roomId: string;
    userId: string;
    adminId: string;
}) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        if (!room.isGroup) {
            throw new Error("Cannot remove users from direct message chats");
        }

        const admins = room.admins || [];
        if (adminId !== userId && !admins.includes(adminId)) {
            throw new Error("Only admins can remove users from this chat");
        }

        const currentUsers = room.users.map((user: any) => user.$id || user);

        const updatedUsers = currentUsers.filter((id: string) => id !== userId);

        if (updatedUsers.length === 0) {
            throw new Error("Cannot remove the last user from a room");
        }

        let updatedAdmins = admins;
        if (admins.includes(userId)) {
            updatedAdmins = admins.filter((id: string) => id !== userId);
        }

        const updatedRoom = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId,
            {
                users: updatedUsers,
                admins: updatedAdmins,
            }
        );

        await sendMessage({
            roomId,
            userId: adminId,
            content: `Note: A user has left the chat`,
        });

        return updatedRoom;
    } catch (error) {
        console.log("Error removing user from room:", error);
        return error;
    }
}

// ============================== MAKE USER ADMIN
export async function makeUserAdmin({
    roomId,
    userId,
    adminId,
}: {
    roomId: string;
    userId: string;
    adminId: string;
}) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        if (!room.isGroup) {
            throw new Error("Cannot set admins in direct message chats");
        }

        const admins = room.admins || [];
        if (!admins.includes(adminId)) {
            throw new Error("Only admins can add other admins");
        }

        const userIds = room.users.map((user: any) => user.$id || user);
        if (!userIds.includes(userId)) {
            throw new Error("Cannot make a user who is not in the room an admin");
        }

        if (admins.includes(userId)) {
            return room;
        }

        const updatedAdmins = [...admins, userId];

        const updatedRoom = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId,
            {
                admins: updatedAdmins,
            }
        );

        return updatedRoom;
    } catch (error) {
        console.log("Error making user an admin:", error);
        return error;
    }
}

// ============================== DELETE ROOM
export async function deleteRoom({
    roomId,
    userId,
}: {
    roomId: string;
    userId: string;
}) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        if (room.isGroup) {
            const admins = room.admins || [];
            if (!admins.includes(userId)) {
                throw new Error("Only admins can delete this chat room");
            }
        } else {
            const participants = room.users.map((user: any) => user.$id || user);
            if (!participants.includes(userId)) {
                throw new Error("Only participants can delete this chat");
            }
        }

        const messages = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.messageCollectionId,
            [Query.equal("room", roomId)]
        );

        for (const message of messages.documents) {
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.messageCollectionId,
                message.$id
            );
        }

        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        return { status: "success" };
    } catch (error) {
        console.log("Error deleting room:", error);
        return error;
    }
}

// ============================== UPDATE GROUP NAME
export async function updateGroupName({
    roomId,
    name,
    userId,
}: {
    roomId: string;
    name: string;
    userId: string;
}) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        if (!room.isGroup) {
            throw new Error("Cannot rename direct message chats");
        }

        const admins = room.admins || [];
        if (!admins.includes(userId)) {
            throw new Error("Only admins can rename this chat");
        }

        const updatedRoom = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId,
            {
                name,
            }
        );

        return updatedRoom;
    } catch (error) {
        console.log("Error updating group name:", error);
        return error;
    }
}

// ============================== GET CHAT ROOM BY ID
export async function getChatRoomById(roomId: string) {
    try {
        const room = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.roomCollectionId,
            roomId
        );

        return room;
    } catch (error) {
        console.log("Error fetching chat room:", error);
        return error;
    }
}