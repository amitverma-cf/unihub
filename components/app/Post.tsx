'use client'

import React, { useState } from 'react';
import { Send, Heart, MessageCircle } from 'lucide-react'; // Added Heart for the Like button

interface PostProps {
    id: number;
    created_at: string;
    title: string | null;
    content: string | null;
    image: string | null;
    user_image: string | null;
    user_name: string | null;
    location: string | null;
}

const Post = ({ 
    id, 
    image, 
    title, 
    content, 
    user_image, 
    user_name, 
    location, 
    created_at
}: PostProps) => {
    const [isCommentOpen, setIsCommentOpen] = useState(false); // Track if comment section is open
    const [comments, setComments] = useState<any[]>([]); // Track comments for the post
    const [newComment, setNewComment] = useState(''); // Track new comment input
    const [isLiked, setIsLiked] = useState(false); // Track like status

    const handleCommentToggle = () => {
        setIsCommentOpen((prev) => !prev); // Toggle comment section visibility
    };

    const handleLikeToggle = () => {
        setIsLiked((prev) => !prev); // Toggle like button
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            // Add new comment to state (UI part)
            setComments((prevComments) => [
                ...prevComments,
                { user_name: 'Current User', user_image: 'https://avatars.githubusercontent.com/u/35371348?v=4', content: newComment }
            ]);
            setNewComment(''); // Clear the input field after submission
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl overflow-hidden mb-6 flex flex-col p-6 space-y-6">
            {/* User Info Section */}
            <div className="flex items-center space-x-3">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={user_image || "https://avatars.githubusercontent.com/u/35371348?v=4"}
                    alt="User Profile"
                />
                <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{user_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
            </div>

            {/* Post Content Section */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">{content}</p>
            </div>

            {/* Post Image */}
            {image && (
                <div className="relative mt-4 w-full h-72 overflow-hidden rounded-lg shadow-lg">
                    <img
                        className="object-cover w-full h-full"
                        src={image}
                        alt="Post Image"
                    />
                </div>
            )}

            {/* Bottom Interaction Buttons */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                {/* Like Button */}
                <button 
    onClick={handleLikeToggle}
    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-100"
>
    <Heart 
        size={20} 
        className={`transition-all duration-200 transform ${isLiked ? 'text-red-500 scale-110' : 'text-gray-500'}`}
    />
    <span className="text-gray-500 dark:text-gray-400">Like</span>
</button>


                {/* Comment Button */}
                <button 
                    onClick={handleCommentToggle} 
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-100">
                    <MessageCircle size={20} />
                    <span>Comment</span>
                </button>
            </div>

            {/* Location */}
            {location && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>{location}</p>
                </div>
            )}

            {/* Comment Section */}
            {isCommentOpen && (
                <div className="space-y-4 mt-6">
                    {/* New Comment Input */}
                    <form onSubmit={handleAddComment} className="flex items-center space-x-4 p-4 border-t border-gray-200 dark:border-gray-700">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src="https://avatars.githubusercontent.com/u/35371348?v=4"
                            alt="User Profile"
                        />
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full p-3 bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
                        />
                        <button 
                            type="submit" 
                            className="text-blue-500 hover:text-blue-700 focus:outline-none">
                            <Send size={20} />
                        </button>
                    </form>

                    {/* Existing Comments */}
                    <div className="space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 border-t border-gray-200 dark:border-gray-700">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={comment.user_image}
                                        alt="User Profile"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{comment.user_name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">Be the first to comment!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
