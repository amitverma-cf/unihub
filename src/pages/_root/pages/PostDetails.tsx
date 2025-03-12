import { useParams, Link, useNavigate } from "react-router-dom";

import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query";
import { multiFormatDateString } from "@/lib/utils";
import ILoader from "@/components/blocks/ILoader";
import { useUserContext } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/blocks/PostStats";
import GridPostList from "@/components/blocks/GridPostList";
import { ArrowLeft, Edit, Trash2, UserRound } from "lucide-react";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="mb-4">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Button>
      </div>

      {isLoading || !post ? (
        <div className="flex justify-center py-8">
          <ILoader />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          {post?.imageUrl && (
            <div className="w-full">
              <img
                src={post.imageUrl}
                alt="post image"
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex justify-between items-start w-full mb-3">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                {post?.creator.imageUrl ? (
                  <img
                    src={post.creator.imageUrl}
                    alt="creator"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserRound className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {post?.creator.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{multiFormatDateString(post?.$createdAt)}</span>
                    {post?.location && (
                      <>
                        <span>•</span>
                        <span>{post.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>

              {user.id === post?.creator.$id && (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/update-post/${post?.$id}`}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Edit className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              )}
            </div>

            <div className="my-4 text-gray-900 dark:text-white">
              <p className="text-base">{post?.caption}</p>
              {post?.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post?.tags.map((tag: string, index: number) => (
                    <span
                      key={`${tag}${index}`}
                      className="text-blue-500 text-sm hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            More from this user
          </h3>
          
          {isUserPostLoading ? (
            <div className="flex justify-center py-4">
              <ILoader />
            </div>
          ) : (
            <GridPostList posts={relatedPosts} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;