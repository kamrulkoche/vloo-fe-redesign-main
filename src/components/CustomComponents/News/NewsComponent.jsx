"use client";
import { useRouter } from "next/navigation";
import BlinkingText from "@/components/CustomComponents/BlinkingText";

export default function NewsComponent() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-center sm:flex-row">
        {/* Left Section */}
        <div className="mx-auto w-full sm:w-[800px]">
          <div className="mx-5 sm:mx-0">
            <img
              src={"/assets/images/blogs/blog-1.jpg"}
              alt="blog-image"
              className="h-[474px] w-full rounded-[10px] object-cover"
            />
            <div className="mb-2 mt-3 sm:mb-[-15px] sm:mt-[42px]">
              <p className="mb-[10px] text-sm font-semibold text-[#00A481]">
                What's New
              </p>
              <p
                onClick={() => router.push(`/pro/news/${1}`)}
                className="w-full cursor-pointer text-xl font-medium text-[#0A2A3C] sm:w-[585px] sm:text-2xl"
              >
                Get access to communal workspaces with all-inclusive amenities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-end">
          <div className="w-full sm:w-[460px]">
            <div className="bg-[#D9F7F0] py-14 pl-9">
              <img
                src={"/assets/images/blogs/blog-1.jpg"}
                alt="blog-image"
                className="h-[210px] w-[367px] rounded-[10px]"
              />
              <div className="mt-[30px]">
                <p className="mb-[5px] text-base font-semibold text-[#00A481]">
                  What's New
                </p>
                <p
                  onClick={() => router.push(`/pro/news/${2}`)}
                  className="cursor-pointer text-base font-normal text-[#0A2A3C]"
                >
                  Get access to communal workspaces
                </p>
              </div>
            </div>
            <div className="bg-[#006988] px-[81px] py-[50px] text-center text-white">
              <p className="text-4xl font-medium">
                Get access to communal workspaces with all-inclusive amenities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BlinkingText
        onClick={() => router.push("/pro/news/all-news")}
        text="More VLOO News"
      />
    </>
  );
}
