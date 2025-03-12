import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost, useUpdatePost } from "@/lib/react-query";
import { useUserContext } from "../auth-provider";
import { PostFormSchema } from "@/lib/validation";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import FileUploader from "./FileUploader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ILoader from "./ILoader";
import { Textarea } from "../ui/textarea";
import { ImageIcon, MapPinIcon, TagIcon } from "lucide-react";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  const isLoading = isLoadingCreate || isLoadingUpdate;

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostFormSchema>) => {
    // ACTION = UPDATE
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast.error(`${action} post failed. Please try again.`);
      }
      return navigate(`/posts/${post.$id}`);
    }

    // ACTION = CREATE
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      toast.error(`${action} post failed. Please try again.`);
    }
    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Caption Field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="w-full p-4 text-xl bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 rounded-none focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  placeholder="What's happening?"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 ml-2" />
            </FormItem>
          )}
        />

        {/* Divider */}
        <div className="border-b border-gray-200 dark:border-gray-800"></div>

        {/* Media Uploader */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="px-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500 ml-7" />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="px-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-blue-500" />
                <FormControl>
                  <Input 
                    type="text" 
                    className="border-0 bg-transparent focus:ring-0 p-0 placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                    placeholder="Add location"
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500 ml-7" />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="px-2">
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-blue-500" />
                <FormControl>
                  <Input
                    placeholder="Add tags separated by commas"
                    type="text"
                    className="border-0 bg-transparent focus:ring-0 p-0 placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500 ml-7" />
            </FormItem>
          )}
        />

        {/* Divider */}
        <div className="border-b border-gray-200 dark:border-gray-800"></div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2">
          <div></div>
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <ILoader /> <span>Processing...</span>
                </div>
              ) : (
                action === "Create" ? "Post" : "Update"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;