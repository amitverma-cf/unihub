'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CreateButton from '@/components/ui/createButton';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import Footer from '@/components/footer';
import Header from '@/components/navBar';

export default function CreatePost() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Header/>
    <div className='flex flex-col min-h-screen'>
      {/* Main Content */}
      <div className='flex-grow flex flex-col md:flex-row gap-4 p-4'>
        {/* Left Side - Post Form */}
        <div className='flex-1 bg-transparent p-4 rounded-lg shadow-lg '>
          <Card>
            <CardHeader className='font-bold text-xl'>
              <CardTitle>Create a Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4 text-lg'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' placeholder='Enter post title' />
                
                <Label htmlFor='content'>Content</Label>
                <Textarea id='content' placeholder='Write your post here...' />
                
                <Label htmlFor='tags'>Tags</Label>

<RadioGroup defaultValue="option-one">
    <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Causal</Label>
    </div>
    <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Urgent</Label>
    </div>
</RadioGroup>

                
<CreateButton 
  className='font-semibold rounded-2xl hover:bg-green-300 hover:shadow-lg 
             transition-all duration-200 ease-in-out' 
>
  Post
</CreateButton>              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Image Upload & Guidelines */}
        <div className='flex-1 bg-gray-300 p-4 rounded-lg'>
          <Card>
            <CardHeader>
              <CardTitle>Upload An Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4'>
                <Label htmlFor='image'>Upload Image</Label>
                <Input id='image' type='file' accept='image/*' onChange={handleImageChange}  />
                {preview && <Image src={preview} alt='Preview' width={200} height={200} className='rounded-lg' />}
                
                <div className='mt-4'>
                  <h2 className='text-2xl font-semibold bg-green-300 rounded-xl px-2'>Guidelines</h2>
                  <ul className='list-disc pl-5 text-md text-gray-800'>
                    <li>Ensure the content is appropriate.</li>
                    <li>Follow community rules and guidelines.</li>
                    <li>No hate speech or offensive material.</li>
                    <li>Use relevant tags.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </div>
  );
}
