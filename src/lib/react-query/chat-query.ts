// // ============================================================
// // CHAT QUERIES
// // ============================================================

// import { useUserContext } from "@/components/auth-provider";
// import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addUserToRoom, createChatRoom, deleteRoom, getRoomMessages, getUserChatRooms, removeUserFromRoom, sendMessage } from "../appwrite";

// export const useGetUserChats = () => {
//     const { user } = useUserContext();

//     return useQuery({
//         queryKey: ["userChats", user.id],
//         queryFn: () => getUserChatRooms(user.id),
//         enabled: !!user.id,
//     });
// };

// export const useGetChatMessages = (roomId: string, limit = 50) => {
//     return useInfiniteQuery({
//         queryKey: ["chatMessages", roomId],
//         queryFn: ({ pageParam }) => getRoomMessages({
//             roomId,
//             limit,
//             cursor: pageParam
//         }),
//         initialPageParam: null,
//         getNextPageParam: (lastPage: any) => {
//             if (lastPage.documents.length < limit) return null;
//             return lastPage.documents[lastPage.documents.length - 1].$id;
//         },
//         enabled: !!roomId,
//     });
// };

// export const useSendMessage = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: sendMessage,
//         onSuccess: (_data, variables) => {
//             queryClient.invalidateQueries({
//                 queryKey: ["chatMessages", variables.roomId]
//             });
//             queryClient.invalidateQueries({
//                 queryKey: ["userChats"]
//             });
//         },
//     });
// };

// export const useCreateChatRoom = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: createChatRoom,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userChats"] });
//         },
//     });
// };

// export const useDeleteRoom = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteRoom,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userChats"] });
//         },
//     });
// };

// export const useAddUserToRoom = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: addUserToRoom,
//         onSuccess: (_data, variables) => {
//             queryClient.invalidateQueries({ queryKey: ["chatMessages", variables.roomId] });
//         },
//     });
// };

// export const useRemoveUserFromRoom = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: removeUserFromRoom,
//         onSuccess: (_data, variables) => {
//             queryClient.invalidateQueries({ queryKey: ["chatMessages", variables.roomId] });
//             queryClient.invalidateQueries({ queryKey: ["userChats"] });
//         },
//     });
// };