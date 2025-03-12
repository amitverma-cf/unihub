import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-3 min-w-0">
        <Link to={`/profile/${user.$id}`} className="flex-shrink-0">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <UserRound className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </Link>
        
        <div className="flex flex-col min-w-0">
          <Link 
            to={`/profile/${user.$id}`}
            className="font-semibold text-gray-900 dark:text-white hover:underline truncate"
          >
            {user.name}
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
            @{user.username || user.$id.slice(0, 8)}
          </span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline"
        size="sm" 
        className="flex-shrink-0 rounded-full px-3 py-0.5 h-auto text-xs font-medium bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      >
        Visit
      </Button>
    </div>
  );
};

export default UserCard;