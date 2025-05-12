import BannerSection from "@/components/MainPages/MainWorkSpaceCitiesPage/BannerSection";
import SelectCity from "@/components/MainPages/MainWorkSpaceCitiesPage/SelectCity";
import RelatedPlaces from "@/components/MainPages/MainWorkSpaceCitiesPage/RelatedPlaces";

export default function MainWorkSpaceCitiesPageContainer({ city }) {
  return (
    <div>
      <BannerSection />
      <SelectCity currentCity={city} />
      <RelatedPlaces currentCity={city} />
    </div>
  );
}
