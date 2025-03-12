import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [fieldChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFileUrl("");
        setFile([]);
        fieldChange([]);
    };

    return (
        <div className="w-full">
            {fileUrl ? (
                <div className="relative">
                    <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-90 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img 
                            src={fileUrl} 
                            alt="Selected media" 
                            className="w-full h-auto object-cover max-h-96"
                        />
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className="flex flex-col items-center justify-center w-full h-24 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                    <input {...getInputProps()} className="cursor-pointer" />
                    <div className="flex flex-col items-center justify-center p-2">
                        <ImageIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add photos
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            or drag and drop
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;