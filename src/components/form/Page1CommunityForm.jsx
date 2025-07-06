

const Page1CommunityForm = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <input
          type="text"
          placeholder="Community Name"
          className="input w-full h-8 px-2 bg-gray-100 shadow-md"
          {...register('communityname')}
        />
        {!errors.communityname?.message && <p className="text-xs text-transparent select-none">placeholder</p>}
        {errors.communityname?.message && <p className="text-xs text-red-500">{errors.communityname.message}</p>}
      </div>

      <div>
        <textarea
          placeholder="Community Detail"
          rows={5}
          className="input w-full p-2 bg-gray-100 shadow-md resize-none"
          {...register('communitydetail')}
        />
        {!errors.communitydetail?.message && <p className="text-xs text-transparent select-none">placeholder</p>}
        {errors.communitydetail?.message && <p className="text-xs text-red-500">{errors.communityDetail.message}</p>}
      </div>
    </div>
  );
};

export default Page1CommunityForm;