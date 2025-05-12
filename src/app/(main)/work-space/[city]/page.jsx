import { decodeCityName } from "@/components/HelperFunctions/URLHelperFunction";
import MainWorkSpaceCitiesPageContainer from "@/components/MainPages/MainWorkSpaceCitiesPage/MainWorkSpaceCitiesPageContainer";

export default function MainWorkSpaceCities({ params }) {
  const city = decodeCityName(params.city);

  return (
    <div>
      <MainWorkSpaceCitiesPageContainer city={city} />
    </div>
  );
}
