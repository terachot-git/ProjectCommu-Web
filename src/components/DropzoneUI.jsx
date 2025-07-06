
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from './Button'; 
const sizeDropClasses = {
    'md' : 'w-36 h-36 rounded-full',
    'lg' : 'w-[600px] h-[125px]'
}

function DropzoneUI({ field, error, label ,sizeDrop='md'}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        field.onChange(file);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(file));
      }
    },
    [field, preview]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {  'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'], },
  });

  const removeFile = (e) => {
    e.stopPropagation();
    field.onChange(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors hover:border-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${!preview ? 'p-8' : 'p-4'}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className={`${sizeDropClasses[sizeDrop]} object-cover  shadow-md`} />
            <p className="text-gray-500 text-xs my-2">คลิก หรือลากไฟล์มาวางเพื่อเปลี่ยนรูป</p>
            <Button onClick={removeFile} bgColor='#FF0004'>
              ลบออก
            </Button>
          </div>
        ) : (
          <p className="text-gray-500">{label}</p>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}


export default DropzoneUI; 