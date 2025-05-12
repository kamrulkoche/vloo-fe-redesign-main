export default function TestimonialCarousel({ desc, img, name, designation }) {
  return (
    <div className="relative md:w-[438px] w-[60%]">
      <div
        className="overflow-hidden rounded-[10px] bg-white md:p-12 p-4"
        style={{ boxShadow: "0px 14px 24px 0px #1068841A" }}
      >
        <div className="mb-4">
          <img
            src="/assets/icons/testimonial-icon.png"
            alt="quote icon"
            className="mb-[30px] h-7 w-7"
          />
        </div>
        <p className="md:mb-[74px] text-[24px] font-bold leading-[34px] text-[#0A2A3C] mb-[30px]">
          {desc}
        </p>
        <div className="flex items-center">
          <img
            src={img}
            alt={name}
            className="mr-4 h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="text-[16px] font-semibold text-[#0A2A3C]">{name}</p>
            <p className="text-[14px] text-[#7A8A98]">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
