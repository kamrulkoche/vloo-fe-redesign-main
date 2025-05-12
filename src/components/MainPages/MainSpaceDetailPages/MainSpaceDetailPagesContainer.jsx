"use client";

import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";
import LoadingComponent from "@/components/LoadingComponent";
import BannerSection from "@/components/MainPages/MainSpaceDetailPages/BannerSection";
import FixedContent from "@/components/MainPages/MainSpaceDetailPages/FixedContent";
import SpaceDetails from "@/components/MainPages/MainSpaceDetailPages/SpaceDetails";
import WeRecommend from "@/components/MainPages/MainSpaceDetailPages/WeRecommend";
import useSpaceShow from "@/hooks/QueryHooks/Public/Space/useSpaceShow";
import { useEffect, useRef, useState } from "react";
import { WorkEnvironment } from "./WorkEnvironment";
import { Reviews } from "./Reviews";
import SpacesCarousel from "./SpacesCarousel";

const MainSpaceDetailPagesContainer = ({ spaceId }) => {
    const [isBannerInView, setIsBannerInView] = useState(true);
    const [isContentEndVisible, setIsContentEndVisible] = useState(false);
    const bannerRef = useRef(null);
    const contentEndRef = useRef(null);
    const fixedContentRef = useRef(null);
    const [fixedContentHeight, setFixedContentHeight] = useState(0);

    const userType = getUserType();

    const { data, isPending } = useSpaceShow(userType, spaceId);

    useEffect(() => {
        // Skip if component is still loading
        if (isPending) return;

        // Get and set fixed content height
        if (fixedContentRef.current) {
            const height = fixedContentRef.current.offsetHeight;
            setFixedContentHeight(height);
        }

        // Observer for Banner
        const bannerObserver = new IntersectionObserver(
            ([entry]) => {
                setIsBannerInView(entry.isIntersecting);
            },
            {
                threshold: 0.7,
                rootMargin: "-1px 0px 0px 0px",
            },
        );

        // Observer for Content End
        const contentEndObserver = new IntersectionObserver(
            ([entry]) => {
                setIsContentEndVisible(entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: `${fixedContentHeight}px 0px 0px 0px`,
            },
        );

        if (bannerRef.current) {
            bannerObserver.observe(bannerRef.current);
        }

        if (contentEndRef.current) {
            contentEndObserver.observe(contentEndRef.current);
        }

        return () => {
            if (bannerRef.current) {
                bannerObserver.unobserve(bannerRef.current);
            }
            if (contentEndRef.current) {
                contentEndObserver.unobserve(contentEndRef.current);
            }
        };
    }, [fixedContentHeight, isPending, data]);

    const shouldStick = !isBannerInView && !isContentEndVisible;

    if (isPending) {
        return <LoadingComponent />;
    }

    return (
        <div className="relative bg-white ">
            {/* Banner Section */}
            <div ref={bannerRef}>
                <BannerSection
                    data={{
                        spaceName: data?.data?.space_name,
                        unique: data?.data?.unique_identity_description,
                        company_name: data?.data?.company_name,
                        file: data?.data?.upload_files?.[0]?.file_url,
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative mx-2 lg:mx-[4.5rem]">
                <SpaceDetails
                    data={{
                        id: data?.data?.id,
                        company_name: data?.data?.company_name,
                        description: data?.data?.description,
                        location: data?.data?.location,
                        free_snacks: data?.data?.free_snacks,
                        parking: data?.data?.parking,
                        phone_booth: data?.data?.phone_booth,
                        cafe: data?.data?.cafe,
                        free_coffee_facility: data?.data?.free_coffee_facility,
                        lounge_facility: data?.data?.lounge_facility,
                        rating: data?.data?.rating,
                        service_rating: data?.data?.service_rating,
                        location_rating: data?.data?.location_rating,
                        facilities_rating: data?.data?.facilities_rating,
                        total_last_week: data?.data?.total_last_week,
                        reviews: data?.data?.review || [],
                        space_work_space_files: data?.data?.space_work_space_files || [],
                    }}
                />
                <div className="flex flex-col gap-6 bg-black md:flex-row ">
                    <div className="bg-red-700 ">
                        <WorkEnvironment />
                    </div>

                    <div className="-mt-4">
                        <div
                            ref={fixedContentRef}

                        >
                            <FixedContent
                                data={{
                                    spaceName: data?.data?.space_name,
                                    location: data?.data?.location,
                                    work_space: data?.data?.work_space || [],
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Reviews />

                {/* <WeRecommend
                    data={{
                        recommend_space: data?.data?.recommend_space || [],
                    }}
                /> */}
                {/* Spacer for fixed content */}
                {/* <div
                    style={{ height: shouldStick ? fixedContentHeight : 0 }}
                    className="transition-all duration-300"
                /> */}

                {/* <div ref={contentEndRef} /> */}
            </div>

            <SpacesCarousel />
            {/* Fixed Content */}

        </div>
    );
};

export default MainSpaceDetailPagesContainer;
