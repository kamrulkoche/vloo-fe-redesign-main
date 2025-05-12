"use client";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";

export default function AllNewsComponent({ data }) {
  const router = useRouter();

  const bgColors = ["bg-[#0A2A3C]", "bg-white", "bg-[#00A481]"];
  const highlightedData = data.filter((item) => item.highlights === "yes");
  const nonHighlightedData = data.filter((item) => item.highlights === "no");

  return (
    <div className="border bg-[#F3F3F3]">
      {/* Header Section */}
      <div className="bg-[#EBB000] py-7 text-center">
        <Marquee speed={200}>
          <p className="text-2xl font-medium text-white">More VLOO News</p>
        </Marquee>
      </div>

      {/* Highlighted and Non-Highlighted Blogs */}
      <div className="mb-4 sm:mb-[60px]">
        {highlightedData.map((highlightedItem, index) => {
          const nonHighlightedSlice = nonHighlightedData.slice(
            index * 3,
            (index + 1) * 3,
          );
          const isImageLeft = index % 2 === 0;

          return (
            <div
              key={highlightedItem.id}
              className="mb-5 flex flex-col sm:flex-row"
            >
              {/* Highlighted Blog */}
              <div
                className={`w-full ${isImageLeft ? "order-2" : "order-1"} border bg-white p-3`}
              >
                <img
                  src={highlightedItem.img}
                  alt={highlightedItem.title}
                  className="h-[329px] w-full rounded-[10px] object-cover"
                />
                <div className="mb-7 ml-0 mt-3 sm:ml-16 sm:mt-11">
                  <p className="mb-4 text-4xl font-medium text-[#0A2A3C]">
                    {highlightedItem.title}
                  </p>
                  <p
                    onClick={() =>
                      router.push(`/pro/newspro//${highlightedItem?.id}`)
                    }
                    className="cursor-pointer text-base font-medium text-[#00A481]"
                  >
                    Read more
                  </p>
                </div>
              </div>

              {/* Non-Highlighted Blogs */}
              <div className={`w-full ${isImageLeft ? "order-1" : "order-2"}`}>
                {nonHighlightedSlice.map((nonHighlightedItem, idx) => {
                  const bgColorClass = bgColors[idx % bgColors.length];
                  const textColor =
                    bgColorClass === "bg-white"
                      ? "text-[#0A2A3C]"
                      : "text-white";
                  const textColor2 =
                    bgColorClass === "bg-[#00A481]"
                      ? "text-white"
                      : "text-[#00A481]";

                  return (
                    <div
                      key={nonHighlightedItem.id}
                      className={`border ${bgColorClass} py-3 pl-3 sm:py-11 sm:pl-16`}
                    >
                      <p className={`mb-4 text-4xl font-medium ${textColor}`}>
                        {nonHighlightedItem.title}
                      </p>
                      <p
                        onClick={() =>
                          router.push(`/pro/news/${nonHighlightedItem?.id}`)
                        }
                        className={`cursor-pointer text-base font-medium ${textColor2}`}
                      >
                        Read more
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Section */}
      <div className="mx-4 mb-4 flex flex-col items-center sm:mx-7 sm:mb-[60px] sm:flex-row">
        <div className="w-full">
          <p className="mb-3 text-3xl font-bold leading-5 text-[#0A2A3C] sm:mb-[50px] sm:text-[80px] sm:leading-[100px]">
            Corporate
          </p>
          <p className="mb-2 mr-0 text-2xl font-bold text-[#0A2A3C] sm:mb-5 sm:mr-[122px] sm:text-5xl">
            Just the right amount of office
          </p>
          <p className="mb-2 mr-0 text-lg font-normal text-[#13293AE5] sm:mb-0 sm:mr-16">
            Thoroughly professional and thoughtfully designed, our flexible
            workplaces support teams of all sizes and stages — from startups to
            Fortune 500s. And thanks to our flexible terms, it's easy to adapt
            your space as your business evolves.
          </p>
        </div>
        <div className="w-full">
          <img
            src="/assets/images/blogs/blog-1.jpg"
            alt="Corporate Blog"
            className="h-[507px] w-full rounded-[10px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
