'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { createClient } from '@/utils/supabase/client';


export default function CreatePost() {
    const supabase = createClient();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            if (!title || !content) {
                throw new Error('Please fill all required fields');
            }

            let imageUrl = null;

            if (selectedImage) {
                // Upload image to Supabase Storage
                const { data: storageData, error: storageError } = await supabase.storage
                    .from('posts')
                    .upload(`${Date.now()}-${selectedImage.name}`, selectedImage);

                if (storageError) throw storageError;

                imageUrl = supabase.storage
                    .from('posts')
                    .getPublicUrl(storageData.path).data.publicUrl;
            }
            // Get user session
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            // Insert post data
            const { error } = await supabase
                .from('posts')
                .insert([
                    {
                        title,
                        content,
                        image: imageUrl,
                        user_id: session.user.id,
                        user_image: session.user.user_metadata?.avatar_url,
                        user_name: session.user.user_metadata?.full_name ?? session.user.email?.split('@')[0],
                        email: session.user.email,
                        location: session.user.user_metadata?.location ?? 'Unknown',
                    }
                ]);

            if (error) throw error;

            // Reset form
            setTitle('');
            setContent('');
            setSelectedImage(null);
            setPreview(null);
            alert('Post created successfully!');

        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-col min-h-screen'>
                <div className='flex-grow flex flex-col md:flex-row gap-4 p-4'>
                    <Card className='flex-1 bg-transparent rounded-lg shadow-lg'>
                        <CardHeader className='font-bold text-xl'>
                            <CardTitle>Create a Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-4 text-lg'>
                                <Label htmlFor='title'>Title</Label>
                                <Input
                                    id='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Enter post title'
                                />

                                <Label htmlFor='image'>Upload Image</Label>
                                <Input
                                    id='image'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                />
                                {preview && (
                                    <Image
                                        src={preview}
                                        alt='Preview'
                                        width={200}
                                        height={200}
                                        className='rounded-lg'
                                    />
                                )}

                                <Label htmlFor='content'>Content</Label>
                                <Textarea
                                    id='content'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder='Write your post here...'
                                />

                                <Button
                                    className='font-semibold rounded-2xl hover:bg-green-300 dark:hover:bg-green-800 hover:shadow-lg transition-all duration-200 ease-in-out flex md:text-sm sm:text-sm justify-center items-center p-2 gap-1 text-black dark:text-white bg-transparent border-2 border-black dark:border-white'
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Posting...' : (
                                        <>
                                            <Plus />
                                            <span className='inline'>Post</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='flex-1 bg-gray-300 dark:bg-gray-800 rounded-lg'>
                        <CardHeader>
                            <CardTitle>Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className='list-disc pl-5 text-md text-gray-800 dark:text-gray-300 py-2'>
                                <li>Ensure the content is appropriate.</li>
                                <li>Follow community rules and guidelines.</li>
                                <li>No hate speech or offensive material.</li>
                                <li>Use relevant tags.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}