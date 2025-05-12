import SpaceBoxCard from "@/components/Cards/SpaceBoxCard";

const dummySpaces = [];

export default function NearByPlaces() {
  return (
    <div className="mx-2 mb-12 mt-11 sm:mx-12 lg:mx-28">
      <p className="mb-8 text-xl font-bold text-[#0A2A3C] sm:text-2xl">
        Spaces near you
      </p>

      {dummySpaces?.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {dummySpaces?.map((item) => (
            <SpaceBoxCard
              key={item?.id}
              name={item?.name}
              rating={item?.rating}
              img={item?.img}
              location={item?.location}
            />
          ))}
        </div>
      ) : (
        "No spaces are found."
      )}
    </div>
  );
}
