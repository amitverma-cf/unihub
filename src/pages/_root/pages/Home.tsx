import ILoader from "@/components/blocks/ILoader";
import PostCard from "@/components/blocks/PostCard";
import UserCard from "@/components/blocks/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1 max-w-7xl mx-auto">
        <div className="flex-1 lg:flex-[0.65] px-4 border-r">
          <p className="text-base text-gray-500 dark:text-gray-400">Something bad happened</p>
        </div>
        <div className="hidden lg:block lg:flex-[0.35] px-4 max-w-xs">
          <p className="text-base text-gray-500 dark:text-gray-400">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden pb-30">
      <div className="flex flex-1 w-screen max-w-7xl mx-auto">
        {/* Main content area */}
        <div className="flex-1 lg:flex-[0.65] border-r">
          <div className="py-3 px-4 sticky top-0 bg-white dark:bg-gray-900 border-b z-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Home</h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {isPostLoading && !posts ? (
              <div className="flex justify-center py-8">
                <ILoader />
              </div>
            ) : (
              posts?.documents.map((post: Models.Document) => (
                <div key={post.$id}>
                  <PostCard post={post} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:flex-[0.35] px-4 max-w-xs">
          <div className="sticky top-0 pt-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Who to follow</h3>
              {isUserLoading && !creators ? (
                <div className="flex justify-center py-4">
                  <ILoader />
                </div>
              ) : (
                <div className="space-y-4">
                  {creators?.documents.map((creator) => (
                    <div key={creator?.$id}>
                      <UserCard user={creator} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;