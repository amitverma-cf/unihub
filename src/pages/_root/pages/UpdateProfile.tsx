import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useGetUserById, useUpdateUser } from "@/lib/react-query";
import { useUserContext } from "@/components/auth-provider";
import { ProfileFormSchema } from "@/lib/validation";
import ILoader from "@/components/blocks/ILoader";
import { toast } from "sonner";
import ProfileUploader from "@/components/blocks/ProfileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Queries
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser)
    return (
      <div className="flex justify-center items-center w-full h-full py-10">
        <ILoader />
      </div>
    );

  // Handler
  const handleUpdate = async (value: z.infer<typeof ProfileFormSchema>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast(`Update user failed. Please try again.`);
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });
    return navigate(`/profile/${id}`);
  };

  return (
    <div className="w-[80vw] mx-auto px-4">
      <div className="w-full">
        <div className="py-3 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 mb-4">
          <div className="flex items-center gap-3">
            <UserCog className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-6 w-full">
            
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      className="w-full p-2 h-10 bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full p-2 h-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none cursor-not-allowed"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full p-2 h-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none cursor-not-allowed"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full p-2 min-h-[100px] bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end mt-2">
              <Button
                type="button"
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isLoadingUpdate}>
                {isLoadingUpdate ? (
                  <div className="flex items-center gap-2">
                    <ILoader /> <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;