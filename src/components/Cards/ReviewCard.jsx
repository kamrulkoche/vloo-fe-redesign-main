import CommonButtonWithImage from "../CustomComponents/CommonButtonWithImage";
import RenderStars from "../CustomComponents/RenderStars";

const ReviewCard = ({
  index,
  status,
  date,
  rating,
  img,
  name,
  title,
  description,
}) => {
  // Determine styles based on odd/even index
  const isOdd = index % 2 !== 0;
  const backgroundColor = isOdd ? "#467483" : "#F3F3FD";
  const titleColor = isOdd ? "#FFFFFF" : "#0A2A3C";
  const descriptionColor = isOdd ? "#DEDEDE" : "#757575";

  return (
    <div className="mb-[30px] flex h-auto w-full flex-col rounded-[10px] bg-white shadow-md md:h-[280px] md:w-full md:flex-row">
      {/* Left Section */}
      <div className="mx[0px] mt-[30px] flex w-full flex-col items-center justify-center pb-[30px] md:mx-[50px] md:w-[20%]">
        <div className="flex justify-center">
          <RenderStars rating={String(rating)} />
        </div>
        <p className="text-[48px] font-bold leading-[64px] text-[#0A2A3C]">
          {rating}
        </p>
        <p className="text-[20px] font-bold leading-[28px] text-[#00A481]">
          {status}
        </p>
        <p className="mb-4 mt-4 text-[14px] font-medium leading-[20px] text-[#757575]">
          {date}
        </p>
        <CommonButtonWithImage name={name} imgSrc={img} />
      </div>

      {/* Right Section */}
      <div
        className="m-0 flex w-full flex-col justify-center rounded-[10px] px-6 py-4 md:m-[30px] md:w-[70%] md:py-0"
        style={{ backgroundColor }} // Apply dynamic background color
      >
        <h2
          className="text-[20px] font-[700] leading-[28px]"
          style={{ color: titleColor }} // Apply dynamic title color
        >
          {title}
        </h2>
        <p
          className="mt-[30px] text-[14px] font-[400] leading-[20px]"
          style={{ color: descriptionColor }} // Apply dynamic description color
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
