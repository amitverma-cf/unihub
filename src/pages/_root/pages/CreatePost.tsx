import PostForm from "@/components/blocks/PostForm";
import { PenSquare } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="w-[80vw] mx-auto px-4">
      <div className="w-full">
        <div className="py-3 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 mb-4">
          <div className="flex items-center gap-3">
            <PenSquare className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Post</h2>
          </div>
        </div>

        <div className="mx-auto">
          <PostForm action="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;