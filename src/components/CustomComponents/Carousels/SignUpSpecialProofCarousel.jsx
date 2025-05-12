"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const SignUpSpecialProofCarousel = ({ data }) => {
  const groupedData = [];
  for (let i = 0; i < data.length; i += 2) {
    const pair = data.slice(i, i + 2);
    if (pair.length > 0) {
      groupedData.push(pair);
    }
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={false}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="signup-pagination-swiper"
      >
        {groupedData.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-3">
              {group.map((item) => (
                <div
                  key={item.id}
                  className="mb-3 flex flex-col items-start sm:mb-[32px]"
                >
                  <div className="mb-[15px] flex items-center gap-[17px]">
                    <Image
                      src={item.upload_files?.[0]?.file_url}
                      alt={item.client_name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="mb-[5px] text-[16px] font-[600] leading-[22px] text-white">
                        {item.client_name}
                      </p>
                      <p className="text-[11px] font-[400] leading-[14px] text-white">
                        {item.sub_section_sub_title}
                      </p>
                    </div>
                  </div>
                  <p className="w-full text-[16px] font-[400] leading-[22px] text-white last:mb-6 sm:w-[394px]">
                    {item.sub_section_title}
                  </p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SignUpSpecialProofCarousel;
