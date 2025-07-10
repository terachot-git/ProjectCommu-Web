import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import Button from '../Button';
import LoadingModal from '../modal/LoadingModal';
import useUserStore from '../../stores/userStore';
import { postSchema } from '../../utils/validators';
import { userApi } from '../../api/userapi';
import useCommuStore from '../../stores/communityStore';



function CreatePostForm({ closeModal, onSuccess }) {
    const token = useUserStore(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const community = useCommuStore(state=>state.community)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(postSchema),
        defaultValues: {
            description: '',
            image: null,
        },
    });


    const imageFile = watch('image');


    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];

                setValue('image', file);
            }
        },
        [setValue]
    );


    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreview(objectUrl);


            return () => URL.revokeObjectURL(objectUrl);
        } else {

            if (preview) {
                URL.revokeObjectURL(preview);
                setPreview(null);
            }
        }
    }, [imageFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        },
    });

    const removeFile = (e) => {
        e.stopPropagation();

        setValue('image', null, { shouldValidate: true });
    };


    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const res = await userApi.post(`/posts/${community.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Post created:', res.data);
            if (onSuccess) onSuccess();
            closeModal();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <form className="space-y-4">
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    คำอธิบายโพสต์
                </label>
                <textarea
                    {...register('description')}
                    id="description"
                    rows="4"
                    className={`w-full p-2 border rounded-md ${errors?.description?.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="อยากอวดอะไรดี..."
                />
                {!errors.description?.message && <p className='text-sm text-transparent select-none'>placeholder</p>}
                {errors.description?.message && (
                    <p className="text-red-500 text-sm ">{errors?.description?.message}</p>
                )}
            </div>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors ${!preview ? 'p-8' : 'p-4'}`}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={preview}
                            alt="พรีวิวรูปภาพ"
                            className="max-h-[400px] object-cover rounded-lg shadow-md"
                        />
                        <p className="text-gray-500 text-sm mt-4">ลากไฟล์อื่นมาวาง หรือคลิกเพื่อเปลี่ยนรูป</p>
                    </div>
                ) : (
                    <div>
                        {isDragActive ? (
                            <p className="text-blue-600">วางไฟล์ที่นี่...</p>
                        ) : (
                            <p className="text-gray-500">ลากไฟล์รูปภาพมาวาง หรือคลิกเพื่อเลือกไฟล์</p>
                        )}
                    </div>
                )}
            </div>


            <div className='flex gap-2 justify-end mt-4'>
                {preview && (
                    <Button

                        onClick={removeFile}
                        bgColor='#FF0004'
                        size='md'
                    >
                        ลบรูปภาพ
                    </Button>
                )}
                <Button onClick={handleSubmit(onSubmit)}
                    size='md'
                >
                    โพสต์
                </Button>
            </div>

            <LoadingModal isOpen={isLoading} />
        </form>
    );
}

export default CreatePostForm;