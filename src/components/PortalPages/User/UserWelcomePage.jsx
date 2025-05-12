"use client";

import PortalStatCard from "@/components/Cards/PortalStatCard";
import { getUserData } from "@/components/HelperFunctions/GetUserTypeFunction";
import LoadingComponent from "@/components/LoadingComponent";
import useDashboardList from "@/hooks/QueryHooks/User/useDashboardList";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const UserWelcomePage = () => {
  const router = useRouter();
  const { userData } = useAuth();

  const { data, isPending } = useDashboardList();

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex items-center justify-start">
            <div className="mb-4 hidden h-[300px] w-full rounded-[10px] bg-[#006988] p-5 sm:block sm:h-[400px] sm:w-[80%] md:h-[500px] lg:h-full">
              <p className="text-[24px] font-semibold leading-[32px] text-white md:text-[32px] md:leading-[44px]">
                Welcome, {userData?.first_name + " " + userData?.last_name}
              </p>
            </div>
            <div className="w-0 sm:w-[20%]" />
          </div>
          <div className="flex items-center justify-start">
            <div className="w-full rounded-[10px] bg-[#0A2A3C] p-4 sm:w-[80%]">
              {/* First Section */}
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="h-[147px] w-full flex-1 rounded-[10px] bg-[#006988] p-4 sm:w-auto">
                  <div className="mb-[6px] flex items-start justify-between">
                    <div>
                      <p className="text-[16px] font-[500] leading-[22px] text-white">
                        Your plan
                      </p>
                      <p className="text-[24px] font-[500] leading-[34px] text-[#0A2A3C]">
                        Free
                      </p>
                    </div>

                    {/* <button className="h-[32px] w-[96px] rounded-[10px] bg-[#0A2A3C] text-[16px] font-[600] leading-[22px] text-white">
                  View plans
                </button> */}
                  </div>

                  <p className="text-[24px] font-[500] leading-[64px] text-white">
                    Packages coming soon...
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-4 sm:flex-none">
                  <div
                    onClick={() => router.push("/portal/favorites")}
                    className="flex h-[66px] w-full cursor-pointer items-center justify-center gap-8 rounded-[10px] border-[#006988] bg-[#006988] transition-colors duration-300 hover:border hover:bg-[#0A2A3C] sm:w-[252px]"
                  >
                    <p className="text-[24px] font-[700] leading-[34px] text-white">
                      Favorites
                    </p>
                    <div className="relative">
                      <img
                        src="/assets/icons/favourite-3.svg"
                        alt="favorite-icon"
                        className="h-9 w-9"
                      />
                      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[16px] font-[600] leading-[22px] text-white">
                        {data?.data?.total_favorite_space || 0}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => router.push("/help")}
                    className="flex h-[66px] w-full cursor-pointer items-center justify-center rounded-[10px] border-[#006988] bg-[#006988] transition-colors duration-300 hover:border hover:bg-[#0A2A3C] sm:w-[252px]"
                  >
                    <p className="text-[24px] font-[700] leading-[34px] text-white">
                      Help
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Section */}
              <div className="flex flex-wrap gap-4">
                <div className="w-full flex-1 rounded-[10px]">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {data?.data?.upcoming_booking?.length > 0 &&
                    data?.data?.upcoming_booking ? (
                      <div className="w-full rounded-[10px] border border-[#DEDEDE] bg-[#457480] px-4 py-6">
                        <p className="mb-[6px] text-[14px] font-[500] leading-[20px] text-[#DEDEDE]">
                          Upcoming booking
                        </p>
                        <p className="mb-5 text-[24px] font-[700] leading-[34px] text-white">
                          Thursday, Sep 09
                        </p>
                        <p className="mb-1 text-[14px] font-[500] leading-[20px] text-white">
                          2 Seat Comfortable Sharing Workspace
                        </p>
                        <div className="mb-5 flex items-center gap-2">
                          <img
                            src="/assets/icons/location.png"
                            alt="location"
                            className="h-[16px] w-[13px]"
                          />
                          <p className="text-[14px] font-[500] leading-[20px] text-white">
                            Oslo
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/images/user.png"
                            alt="user-image"
                            className="h-9 w-9 rounded-full"
                          />
                          <div>
                            <p className="text-[14px] font-[500] leading-[20px] text-white">
                              Andreas Grøstad
                            </p>
                            <p className="text-[10px] font-[500] leading-[20px] text-[#DEDEDE]">
                              VLOO
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-[253px] w-full items-center justify-center rounded-[10px] border border-[#DEDEDE] bg-[#457480] px-4 py-6">
                        <p className="text-center text-[14px] font-[500] text-white">
                          No upcoming booking is available right now.
                        </p>
                      </div>
                    )}
                    <div className="w-full flex-1">
                      <PortalStatCard
                        height={"h-full"}
                        value={"0"}
                        label={"My office cost savings"}
                        stat={"NOK 0"}
                        buttonColor="#E3B127"
                        bgColor="bg-[#006988]"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-[252px]">
                  <PortalStatCard
                    height={"h-full"}
                    label={"My energy savings"}
                    stat={data?.data?.energy_saving}
                    bgColor="bg-[#006988]"
                  />
                </div>
              </div>
            </div>
            <div className="w-0 sm:w-[20%]" />
          </div>
        </>
      )}
    </>
  );
};

export default UserWelcomePage;
