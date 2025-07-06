import ImgdropzonewithController from "../ImgdropzonewithController";



const Page2CommunityForm = ({ control }) => {
  return (
    <div className="space-y-6">
      <ImgdropzonewithController name="communityIcon" control={control} label="ไอคอนคอมมูนิตี้ (ไม่บังคับ)" />
      <ImgdropzonewithController name="communityBanner" control={control} label="แบนเนอร์ (ไม่บังคับ)" sizeDrop="lg" />
    </div>
  );
};

export default Page2CommunityForm;