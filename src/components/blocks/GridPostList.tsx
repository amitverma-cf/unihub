import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { useUserContext } from "../auth-provider";
import PostStats from "./PostStats";
import { Heart, MessageCircle, UserRound } from "lucide-react";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
      {posts.map((post) => (
        <div key={post.$id} className="relative aspect-square">
          <Link
            to={`/posts/${post.$id}`}
            className="block w-full h-full"
          >
            <div className="w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-500 text-sm">No image</p>
                </div>
              )}
            </div>

            {/* Hover overlay with stats */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              {showStats && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 text-white" fill="white" />
                    <span className="text-white font-semibold">{post.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5 text-white" />
                    <span className="text-white font-semibold">{post.comments?.length || 0}</span>
                  </div>
                </div>
              )}
            </div>
          </Link>

          {/* User info below image */}
          {showUser && (
            <div className="mt-2 px-1">
              <div className="flex items-center gap-2">
                {post.creator?.imageUrl ? (
                  <img
                    src={post.creator.imageUrl}
                    alt="creator"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserRound className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <p className="text-xs text-gray-900 dark:text-white font-medium truncate">
                  {post.creator.name}
                </p>
              </div>
            </div>
          )}
          
          {/* Bottom stats (if not in overlay) */}
          {showStats && !showUser && (
            <div className="absolute bottom-2 left-2">
              <PostStats post={post} userId={user.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GridPostList;