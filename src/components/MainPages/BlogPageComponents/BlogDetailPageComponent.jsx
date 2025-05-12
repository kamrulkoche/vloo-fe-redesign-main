"use client";
import BlinkingText from "@/components/CustomComponents/BlinkingText";
import BlogDetailCarousel from "@/components/CustomComponents/Carousels/BlogDetailCarousel";
import VideoPlayer from "@/components/CustomComponents/VideoPlayer";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dummyData = [
  {
    id: 1,
    img: "/assets/images/blogs/blog-1.jpg",
    category: "FOR ON-SITE TEAMS",
    title: "Complimentary meeting rooms hours",
  },
  {
    id: 2,
    img: "/assets/images/blogs/blog-2.jpg",
    category: "FOR ON-SITE TEAMS",
    title: "Complimentary meeting rooms hours",
  },
  {
    id: 3,
    img: "/assets/images/blogs/blog-1.jpg",
    category: "FOR ON-SITE TEAMS",
    title: "Complimentary meeting rooms hours",
  },
];

export default function BlogDetailPageComponent({ slug }) {
  const router = useRouter();

  return (
    <div className="mt-4 sm:mt-8">
      <div className="mx-3 flex flex-col items-center justify-between gap-3 sm:mx-[115px] sm:flex-row sm:items-start">
        {/* Empty div to make justify between works */}
        <div />
        <div className="flex flex-col items-center">
          <div className="mb-[4px] flex items-center gap-4">
            <div className="flex h-[38px] w-[149px] items-center justify-center rounded-[37px] bg-[#006988]">
              <p className="text-base font-[500] text-white">VLOO News</p>
            </div>
            <p className="text-base font-[500] text-[#0A2A3C]">
              5m <span className="text-[#757575]">Read</span>
            </p>
          </div>
          <p className="mb-2 text-base font-[400] text-[#868686]">
            Published by{" "}
            <span className="pl-3 font-[600] text-[#0A2A3C]">
              Andreas Askehagen
            </span>
          </p>
          <p className="text-base font-[500] text-[#757575]">16 March, 2024</p>
        </div>
        <div className="flex h-[38px] w-[111px] cursor-pointer items-center justify-center gap-3 rounded-[37px] border border-[#30B0C7]">
          <p className="text-base font-[500] text-[#30B0C7]">Share</p>
          <Share2 className="h-5 w-5 text-[#30B0C7]" />
        </div>
      </div>
      <div className="mx-3 mt-3 sm:mx-[222px]">
        <p className="text-center text-[48px] font-[700] leading-[64px] text-[#0A2A3C]">
          Maximize Your Business Potential with Premium{" "}
          <span className="text-[#00A481]">Office Space</span> Rentals
        </p>
      </div>
      <div className="mx-3 mt-3 sm:mx-[97px] sm:mt-9">
        <p className="text-center text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
          In today’s competitive business landscape, the right office space can
          make all the difference. Whether you’re a startup founder looking for
          a place to grow your team or a well-established company seeking to
          enhance your operational efficiency, finding the perfect office space
          is crucial. Here’s why renting the right office space could be the key
          to your business success.
        </p>
      </div>
      {/* Blog details from text editor */}
      <div>
        <div className="relative my-3 h-[450px] w-full sm:my-9">
          <Image
            src="/assets/images/blogs/blog-detail-image.png"
            alt="blog-detail-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="mx-3 sm:mx-[115px]">
          <div className="mb-3 sm:mb-[50px]">
            <p className="pb-4 pl-[18px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
              Why Office Space Matters
            </p>
            <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
              The office is more than just a place to work; it’s a hub of
              creativity, collaboration, and productivity. The environment in
              which your team operates can significantly influence their
              performance and satisfaction. A well-designed office space not
              only reflects your company’s culture and values but also helps to
              attract and retain top talent.
              <br />
              <br />
              Moreover, a professional workspace sends a strong message to
              clients and partners, showcasing your business's commitment to
              excellence and growth. In an era where remote work has become more
              prevalent, having a dedicated office space can also help establish
              a sense of structure and routine, boosting overall productivity.
            </p>
          </div>
          <div className="mb-3 sm:mb-[50px]">
            <p className="pb-4 pl-[18px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
              The Benefits of Renting Office Space
            </p>
            <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
              Renting office space offers flexibility and scalability that
              purchasing a property simply can’t match. As your business
              evolves, so do your space requirements. Renting allows you to
              easily adjust your workspace to meet your current needs, whether
              that means expanding into a larger area or downsizing to a more
              cost-effective solution.
              <br />
              <br />
              Additionally, office rentals often come with a range of amenities
              and services, such as high-speed internet, fully equipped meeting
              rooms, and 24/7 access. These features can save you time and
              money, allowing you to focus on what really matters – running your
              business. Choosing the Right Location
            </p>
          </div>
          {/* Blog details slider section */}
          <div className="mx-3 mb-3 sm:mx-[88px] sm:mb-[50px]">
            <BlogDetailCarousel />
          </div>
          <div className="mb-3 sm:mb-[50px]">
            <p className="pb-4 pl-[18px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
              Choosing the Right Location
            </p>
            <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
              Location is one of the most important factors when selecting an
              office space. A central location with easy access to
              transportation, dining, and retail options can greatly enhance the
              convenience for both your employees and clients. Proximity to
              other businesses and potential partners can also lead to new
              opportunities for collaboration and growth.
              <br />
              <br />
              When evaluating office spaces, consider the surrounding area and
              what it offers in terms of amenities and lifestyle. A vibrant
              neighborhood can make your office a more attractive place to work,
              contributing to employee satisfaction and retention.
            </p>
          </div>
          <div className="mb-3 flex flex-col gap-3 sm:mb-[50px] sm:flex-row sm:gap-14">
            <div className="w-full sm:w-2/5">
              <p className="pb-4 pl-[18px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
                Building a Community
              </p>
              <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                Today’s office spaces are about more than just desks and chairs
                – they’re about building a community. Many office rental
                companies offer shared spaces where businesses can interact,
                share ideas, and collaborate. This sense of community can lead
                to valuable networking opportunities and even new business
                partnerships.
                <br />
                <br />
                At [Your Company Name], we believe in creating a dynamic
                environment where businesses can thrive. Our office spaces are
                designed with the modern professional in mind, offering flexible
                leasing options, top-notch amenities, and a vibrant community of
                like-minded entrepreneurs and businesses.
              </p>
            </div>
            <div className="relative w-full sm:w-3/5">
              <VideoPlayer />
            </div>
          </div>
          <div className="mb-3 sm:mb-[50px]">
            <p className="pb-4 pl-[18px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
              Conclusion
            </p>
            <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
              Investing in the right office space is an investment in your
              business’s future. With the flexibility to adapt to your changing
              needs, a prime location that offers convenience and prestige, and
              a community that fosters growth and collaboration, the right
              office space can propel your business to new heights. Whether
              you’re looking to establish your first office or expand to a new
              location, [Your Company Name] has the perfect space to help your
              business grow. Contact us today to learn more about our available
              office spaces and find the ideal environment for your team to
              succeed.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5 sm:mb-10">
        <BlinkingText
          onClick={() => router.push("/blogs/all-blogs")}
          text="More VLOO News"
        />
      </div>
      <div className="mx-4 mb-5 sm:mb-[95px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dummyData?.map((item) => (
            <div key={item?.id} className="w-full sm:w-[434px]">
              <img
                src={item?.img}
                alt={item?.title}
                className="h-[296px] w-full rounded-[10px]"
              />
              <div className="mt-[20px]">
                <p className="mb-[10px] text-[14px] font-semibold leading-[20px] text-[#00A481]">
                  {item?.category}
                </p>
                <p className="text-[24px] font-normal leading-[28px] text-[#13293AE5]">
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
