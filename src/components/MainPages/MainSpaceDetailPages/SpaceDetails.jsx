"use client";

import RenderStars from "@/components/CustomComponents/RenderStars";
import Image from "next/image";
import { useRouter } from "next/navigation";

const allBenefits = [
    {
        name: "Shared lounge",
        key: "lounge_facility",
        class: "bg-[#44748333] border-[#447483] text-[#447483]",
    },
    {
        name: "Free coffee",
        key: "free_coffee_facility",
        class: "bg-[#62534B33] border-[#62534B] text-[#62534B]",
    },
    {
        name: "Cafe",
        key: "cafe",
        class: "bg-[#5856D633] border-[#5856D6] text-[#5856D6]",
    },
    {
        name: "Phone Booths",
        key: "phone_booth",
        class: "bg-[#00669933] border-[#006699] text-[#006699]",
    },
    {
        name: "Parking",
        key: "parking",
        class: "bg-[#64863A33] border-[#64863A] text-[#64863A]",
    },
    {
        name: "Free snacks",
        key: "free_snacks",
        class: "bg-[#FFA50033] border-[#FFA500] text-[#FFA500]",
    },
];

const getRatingText = (rating) => {
    if (rating === 0) return "No review found yet!";
    if (rating >= 4) return "Excellent";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Average";
    if (rating >= 1) return "Below Average";
    return "Poor";
};

export default function SpaceDetails({ data }) {
    const router = useRouter();

    const activeBenefits = allBenefits.filter(
        (benefit) => data?.[benefit.key] === "Active"
    );

    return (
        <div className="mt-4 sm:mt-6 sm:mb-6">
            <div className="grid gap-6 md:flex">
                {/* Main Details Section */}
                <div className="w-full sm:max-w-[60.38rem] rounded-[1.88rem] bg-[#E0F7FA] p-4 sm:p-[1.88rem]">
                    <p className="text-4xl font-bold text-[#071A2B] leading-[48px]">
                        {data?.company_name}
                    </p>

                    <div className="mt-4 text-[20px] font-normal leading-[24px] text-[#40525f] sm:mb-6 overflow-y-auto text-justify">
                        {/* {data?.description} */}
                        <p>
                            This Chelsea office is white boxed and can be built out by the landlord.
                            Note the photos are examples of similar suites in the building. 
                            Reach out to customize your office. This nomad office features 1 large 
                            conference room, 5 meeting rooms/offices, large open area for desks 
                            and lounge seating, brand new kitchen, great window line and natural light, 
                            and tenant-controlled HVAC.
                        </p>

                        <p className="mt-6">
                            This nomad office features 1 large conference room, 5 meeting rooms/offices, 
                            large open area for desks and lounge seating, brand new kitchen, great window 
                            line and natural light, and tenant-controlled HVAC.
                        </p>
                    </div>

                    <div className="flex items-center mt-6 sm:mt-[3.2rem]">
                        <p className="text-[#FFFFFF] bg-[#0091B6] px-6 py-2 rounded-2xl">
                            Oslo
                        </p>
                        <p className="text-[#071A2B] font-medium text-lg ml-5">
                            115 W 30th St, Partial 10th floor
                        </p>
                    </div>
                </div>

                {/* Rating & Popularity Section with fixed height */}
                <div className="flex flex-col items-center rounded-[1.88rem] bg-[#0091B6] justify-items-center py-[1.88rem] sm:px-5 w-full md:max-w-[19.125rem] h-[22.8rem]">
                    <p className="text-center text-2xl font-bold leading-[24px] text-white">
                        VLOO rating
                    </p>
                    <div className="flex items-center gap-3 mt-[1.90rem]">
                        <RenderStars rating={String(data?.rating)} />
                    </div>

                    <div className="text-black grid items-center justify-items-center gap-2 mt-[3.816rem] bg-[#B4E6EA] py-4 px-5 rounded-[1.88rem]">
                        <h2 className="text-2xl font-semibold leading-[34px]">
                            Popular hostF
                        </h2>
                        <div className="relative inline-flex items-center justify-center bg-[#B4E6EA] rounded-full">
                            <Image
                                src={"/assets/icons/hart.svg"}
                                alt="space-location"
                                width={50}
                                height={50}
                            />
                            <span className="absolute p-2 text-2xl font-semibold leading-10 text-white">
                                25
                            </span>
                        </div>
                        <h2 className="text-2xl font-semibold leading-[34px]">
                            bookings this week
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
