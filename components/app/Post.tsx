import React from 'react'

interface PostProps {
    id: number;
    created_at: string;
    title: string | null;
    content: string | null;
    image: string | null;
    user_image: string | null;
    user_name: string | null;
    email: string | null;
    location: string | null;
}

const Post = ({ id, image, title, content, user_image, user_name, email, location, created_at }: PostProps) => {
    return (
        <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg overflow-hidden mb-6 flex flex-wrap">
            {image && <img className="object-contain bg-background" src={image} alt="Post Fotoğrafı"></img>}
            <div className="flex-1 p-6 justify-end flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{content}.</p>
                <div className="flex items-center justify-between py-2 border-t">
                    <div className='flex items-center space-x-4'>
                        <img className="w-10 h-10 rounded-full" src={user_image || "https://avatars.githubusercontent.com/u/35371348?v=4"} alt="User Profile"></img>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{user_name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                        <p>{new Date(created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post