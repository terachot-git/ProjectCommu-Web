import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from './Button'; 
import { userApi } from '../api/userapi';
import useUserStore from '../stores/userStore';
function EditUserProfileForm({closeModal}) {
  const token = useUserStore(state=>state.token)
  const fecthUser = useUserStore(state=>state.actionfecthuser)
  const [myFile, setMyFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setMyFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

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
    setMyFile(null);
    setPreview(null);
  };
  const saveFile = async (e)=>{
       e.stopPropagation(); 
      const body = new FormData()
			
			 
				body.append('image', myFile)
			
      const res = await userApi.patch("/me",body, {headers: {
      Authorization: `Bearer ${token}`,
    },
      
  })
       console.log(res)
       fecthUser()
       closeModal()
  }
  // ไม่จำเป็นต้องใช้ useEffect สำหรับสร้าง preview แล้ว เพราะเราทำใน onDrop
  // แต่ยังคงไว้เผื่อกรณีที่ต้องการโหลดรูปเริ่มต้นจาก props ในอนาคต
  useEffect(() => {
    if (!myFile) {
      setPreview(null);
    }
  }, [myFile]);

  return (
    <div>
  
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
              className="w-48 h-48 object-cover rounded-full shadow-md"
            />
            <p className="text-gray-500 text-sm mt-4">ลากไฟล์อื่นมาวาง หรือคลิกเพื่อเปลี่ยนรูป</p>
             <div className='flex gap-2 justify-center mt-4'>
                <div className='w-fit'>
                  <Button
                    onClick={removeFile}
                    bgColor='#FF0004' 
                    size='md'
                  >
                    ลบออก
                  </Button>
                </div>
             
                <div className='w-fit'>
                   <Button
                    onClick={saveFile}
                    
                    size='md'
                  >
                    บันทึก
                  </Button>
                </div>
            </div>
          </div>
        ) : (
          
          <div>
            {isDragActive ? (
              <p className="text-blue-600">วางไฟล์ที่นี่...</p>
            ) : (
              <p className="text-gray-500">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditUserProfileForm;
