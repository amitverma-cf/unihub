import GridPostList from "@/components/blocks/GridPostList";
import ILoader from "@/components/blocks/ILoader";
import { useGetCurrentUser } from "@/lib/react-query";
import { Models } from "appwrite";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="w-[80vw] mx-auto px-4 sm:px-6 py-4">
      <div className="w-full">
        <div className="py-3 px-4 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 mb-4">
          <div className="flex items-center gap-3">
            <Bookmark className="w-6 h-6 text-gray-900 dark:text-white" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Posts</h2>
          </div>
        </div>

        {!currentUser ? (
          <div className="flex justify-center py-8">
            <ILoader />
          </div>
        ) : (
          <div className="w-full">
            {savePosts?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Bookmark className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-center">No saved posts yet</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-1">
                  When you save posts, they'll appear here.
                </p>
              </div>
            ) : (
              <div className="w-full">
                <GridPostList posts={savePosts} showStats={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;