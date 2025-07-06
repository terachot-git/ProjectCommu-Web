import React from 'react';
import ImgdropzonewithController from '../ImgdropzonewithController';

const Page3CommunityForm = ({ register, control ,errors}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div>
          <input
            type="text"
            placeholder="เราจะเรียกสมาชิคในกลุ่มว่าอะไรดี"
            className="input w-full h-8 px-2 bg-gray-100 shadow-md"
            {...register('membersname')}
          />
           {!errors?.membersname?.message && <p className="text-xs text-transparent select-none">placeholder</p>}
           {errors?.membersname?.message && <p className="text-xs text-red-500">{errors.membersname.message}</p>}
        </div>
      </div>

      <ImgdropzonewithController
        name="membersImage" 
        control={control} 
        label="รูปโปรไฟล์เมมเบอร์ (ไม่บังคับ)" 
      />
    </div>
  );
};

export default Page3CommunityForm;