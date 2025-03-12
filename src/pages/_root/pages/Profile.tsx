import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import ILoader from "@/components/blocks/ILoader";
import { useUserContext } from "@/components/auth-provider";
import { useGetUserById } from "@/lib/react-query";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/blocks/GridPostList";
import LikedPosts from "./LikedPosts";
import { Edit, Heart, Grid, UserRound, Calendar } from "lucide-react";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex items-center gap-1">
    <p className="font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex items-center justify-center w-full h-full py-10">
        <ILoader />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Profile Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-32 bg-blue-100 dark:bg-blue-900/30 rounded-t-xl"></div>
          
          {/* Profile Picture */}
          <div className="absolute left-4 -bottom-12">
            {currentUser.imageUrl ? (
              <img
                src={currentUser.imageUrl}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-900">
                <UserRound className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Edit Profile Button */}
          <div className="absolute right-4 bottom-4">
            {user.id === currentUser.$id ? (
              <Link to={`/update-profile/${currentUser.$id}`}>
                <Button 
                  className="rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Edit className="w-4 h-4" />
                  <span className="font-medium text-sm">Edit profile</span>
                </Button>
              </Link>
            ) : (
              <Button 
                className="rounded-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Chat
              </Button>
            )}
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="mt-14 px-4">
          <h1 className="font-bold text-xl text-gray-900 dark:text-white">
            {currentUser.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            @{currentUser.username}
          </p>
          
          {currentUser.bio && (
            <p className="mt-3 text-gray-900 dark:text-white">
              {currentUser.bio}
            </p>
          )}
          
          <div className="mt-3 flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Joined March 2023</span>
          </div>
          
          <div className="flex gap-4 mt-3">
            <StatBlock value={currentUser.posts.length} label="Posts" />
            {/* <StatBlock value="0" label="Following" />
            <StatBlock value="0" label="Followers" /> */}
          </div>
        </div>
      </div>
      
      {/* Profile Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <Link
          to={`/profile/${id}`}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            pathname === `/profile/${id}`
              ? "text-gray-900 dark:text-white border-b-2 border-blue-500"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Posts</span>
        </Link>
        
        {currentUser.$id === user.id && (
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              pathname === `/profile/${id}/liked-posts`
                ? "text-gray-900 dark:text-white border-b-2 border-blue-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Likes</span>
          </Link>
        )}
      </div>

      {/* Posts */}
      <div className="py-4">
        <Routes>
          <Route
            index
            element={<GridPostList posts={currentUser.posts} showUser={false} />}
          />
          {currentUser.$id === user.id && (
            <Route path="/liked-posts" element={<LikedPosts />} />
          )}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;