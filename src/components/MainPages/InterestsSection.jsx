import InterestCard from "@/components/Cards/InterestCard";
import SectionSubtitle from "@/components/CustomComponents/SectionSubtitle";
import SectionTitle from "@/components/CustomComponents/SectionTitle";

const dummyData = [
  {
    id: 1,
    title: "Prime Office Space Available for Rent",
    location: "Oslo",
    rating: 4,
    img: "/assets/images/interest-1.png",
    bgColor: "#72A1B6",
  },
  {
    id: 2,
    title: "Prime Office Space Available for Rent",
    location: "Bergen",
    rating: 4,
    img: "/assets/images/interest-2.png",
    bgColor: "#457484",
  },
];

export default function InterestsSection() {
  return (
    <div className="mb-4 sm:mb-8">
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title="Spaces you might be interested in" />
        <SectionSubtitle title="Increase productivity. Save money. Get access to unique workspaces on demand" />
      </div>

      <div className="mb-4 mt-5 grid grid-cols-1 gap-3 sm:mb-8 sm:mt-10 sm:grid-cols-2 sm:gap-6">
        {dummyData.map((item) => (
          <InterestCard
            key={item?.id}
            title={item?.title}
            location={item?.location}
            rating={item?.rating}
            img={item?.img}
            bgColor={item?.bgColor}
          />
        ))}
      </div>
    </div>
  );
}
