import ILoader from "@/components/blocks/ILoader";
import UserCard from "@/components/blocks/UserCard";
import { useGetUsers } from "@/lib/react-query";
import { toast } from "sonner";

const AllUsers = () => {
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast.error("Something went wrong.");
    return null;
  }

  return (
    <div className="w-[80vw] mx-auto px-4">
      <div className="w-full">
        <div className="py-3 px-4 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Users</h2>
        </div>

        {isLoading && !creators ? (
          <div className="flex justify-center py-8">
            <ILoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 py-4">
            {creators?.documents.map((creator) => (
              <div key={creator?.$id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <UserCard user={creator} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;