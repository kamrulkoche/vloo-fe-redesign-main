import BannerSection from "@/components/MainPages/MainWorkSpacePage/BannerSection";
import FAQSection from "@/components/MainPages/MainWorkSpacePage/FAQSection";
import GetStarted from "@/components/MainPages/MainWorkSpacePage/GetStarted";
import NearByPlaces from "@/components/MainPages/MainWorkSpacePage/NearByPlaces";
import RecommendPlaces from "@/components/MainPages/MainWorkSpacePage/RecommendPlaces";
import SelectCity from "@/components/MainPages/MainWorkSpacePage/SelectCity";
import { TestimonialSection } from "@/components/MainPages/MainWorkSpacePage/TestimonialSection";

export default function MainWorkSpacePageContainer() {
  return (
    <div>
      <BannerSection />
      <SelectCity />
      <RecommendPlaces />
      <NearByPlaces />
      <TestimonialSection />
      <GetStarted />
      <FAQSection />
    </div>
  );
}
