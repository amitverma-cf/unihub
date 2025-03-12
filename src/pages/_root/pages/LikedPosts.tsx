import GridPostList from "@/components/blocks/GridPostList";
import ILoader from "@/components/blocks/ILoader";
import { useGetCurrentUser } from "@/lib/react-query";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <ILoader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
