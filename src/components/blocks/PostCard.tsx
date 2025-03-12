import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "../auth-provider";
import PostStats from "./PostStats";
import { Edit, UserRound } from "lucide-react";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  return (
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Link to={`/profile/${post.creator.$id}`} className="flex-shrink-0">
            {post.creator?.imageUrl ? (
              <img
                src={post.creator?.imageUrl}
                alt="creator"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <UserRound className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </Link>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <Link to={`/profile/${post.creator.$id}`} className="font-semibold text-gray-900 dark:text-white hover:underline truncate">
                {post.creator.name}
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-sm">@{post.creator.username || post.creator.$id.slice(0, 8)}</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {multiFormatDateString(post.$createdAt)}
              </span>
            </div>

            <Link to={`/posts/${post.$id}`} className="mt-1">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{post.caption}</p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span 
                      key={`${tag}${index}`} 
                      className="text-blue-500 hover:underline text-sm cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {post.imageUrl && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={post.imageUrl}
                    alt="post content"
                    className="w-full h-auto object-cover max-h-[512px]"
                  />
                </div>
              )}
            </Link>
          </div>
        </div>

        {user.id === post.creator.$id && (
          <Link
            to={`/update-post/${post.$id}`}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
          >
            <Edit className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="mt-3">
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};

export default PostCard;