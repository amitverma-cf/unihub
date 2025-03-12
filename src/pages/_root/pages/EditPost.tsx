import { useParams } from "react-router-dom";

import ILoader from "@/components/blocks/ILoader";
import PostForm from "@/components/blocks/PostForm";
import { useGetPostById } from "@/lib/react-query";
import { PenSquare } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full py-10">
        <ILoader />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="w-full">
        <div className="py-3 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 mb-4">
          <div className="flex items-center gap-3">
            <PenSquare className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Tweet</h2>
          </div>
        </div>

        <div className="mx-auto">
          {isLoading ? <ILoader /> : <PostForm action="Update" post={post} />}
        </div>
      </div>
    </div>
  );
};

export default EditPost;