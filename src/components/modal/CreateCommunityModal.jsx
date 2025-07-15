import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { createCommuSchema } from '../../utils/validators';
import Page1CommunityForm from '../form/Page1CommunityForm';
import Page2CommunityForm from '../form/Page2CommunityForm';
import Page3CommunityForm from '../form/Page3CommunityForm';
import Button from '../Button';
import { userApi } from '../../api/userapi';
import useUserStore from '../../stores/userStore';
import LoadingModal from './LoadingModal';
const CreateCommunityModal = ({ isModalOpen, setIsOpen }) => {
  const [step, setStep] = useState(1);
  const token = useUserStore(state => state.token)
   const fecthCommu = useUserStore(state => state.actionfecthCommu)
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting }, reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createCommuSchema),
  });

  const handleNext = async () => {
    const fieldsToValidate = step === 1 ? ['communityname'] : [];
    const isValid = fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

    if (isValid) {
      setStep(step + 1);
    };
  }

  const handlePrev = () => setStep(step - 1);

  const onSubmit = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }


    const res = await userApi.post("/community", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
    // console.log(res)
    await fecthCommu()
    closeModal();
  };

  const closeModal = () => {
    reset();
    setIsOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  const steps = [
    { title: 'ใส่ข้อมูลคอมมูนิตี้ที่จะสร้าง', component: <Page1CommunityForm register={register} errors={errors} /> },
    { title: 'อัพเดทรูปโปรไฟล์คอมมูนิตี้', component: <Page2CommunityForm control={control} /> },
    { title: 'ข้อมูลเมมเบอร์', component: <Page3CommunityForm register={register} control={control} errors={errors} /> },
  ];

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={false}
        contentLabel="Create Community Process"
        ariaHideApp={false}
        className="bg-white rounded-lg shadow-xl p-6 pb-20 w-full max-w-md outline-none backdrop-blur-sm flex flex-col"
        overlayClassName="fixed  backdrop-blur-sm inset-0   flex justify-center items-center z-30"
      >
        <div className='self-end  mb-4'>
          <Button onClick={closeModal} bgColor='#FF0004' size='sm'>
            ปิด
          </Button>
        </div>

        <form >
          <h2 className="text-2xl font-bold mb-2">{steps[step - 1].title}</h2>
          <p className="text-sm text-gray-500 mb-6">ขั้นตอนที่ {step} จาก {steps.length}</p>

          <div className="min-h-[350px]">
            {steps[step - 1].component}
          </div>

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button onClick={handlePrev} >
                ย้อนกลับ
              </Button>
            ) : <div />}

            {step < steps.length ? (
              <Button onClick={handleNext} >
                ถัดไป
              </Button>
            ) : (
              <Button onClick={handleSubmit(onSubmit)} >
                สร้างคอมมูนิตี้
              </Button>
            )}
          </div>
        </form>
      </Modal>
      <LoadingModal isOpen={isSubmitting} />
    </>
  );
};

export default CreateCommunityModal;