"use client";

import BannerSection from "@/components/MainPages/BannerSection";
import BecomeAHost from "@/components/MainPages/BecomeAHost";
import BestSpaces from "@/components/MainPages/BestSpaces";
import FAQSection from "@/components/MainPages/FAQSection";
import FundedBy from "@/components/MainPages/FundedBy";
import HowItWorks from "@/components/MainPages/HowItWorks";
import InterestsSection from "@/components/MainPages/InterestsSection";
import JoinSection from "@/components/MainPages/JoinSection";
import OfficeSpaceSection from "@/components/MainPages/OfferSpaceSection";
import PricingSection from "@/components/MainPages/PricingSection";
import SubscribeUs from "@/components/MainPages/SubscribeUs";
import { TestimonialSection } from "@/components/MainPages/TestimonialSection";
import WhatYouGet from "@/components/MainPages/WhatYouGet";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import React from "react";
import ErrorDisplayComponent from "../ErrorDisplayComponent";
import LoadingComponent from "../LoadingComponent";
import { useAuth } from "@/contexts/AuthContext";
import { AddressSocial } from "./MainWhyVLOOPages/AddressSocial";
import { VlooWorks } from "./MainWhyVLOOPages/VlooWorks";
import SpacesCarousel from "./MainSpaceDetailPages/SpacesCarousel";
import SpacesVloo from "./MainSpaceDetailPages/SpacesVloo";
import { GetLook } from "./MainSpaceDetailPages/GetLook";
import { UserVloo } from "./MainSpaceDetailPages/UserVloo";

export default function MainPageContainer() {
    const { data, isFetched, isPending, error } = usePageContentShow();

    // Scroll to top on page load
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!isFetched || !data?.data?.page_section) return <LoadingComponent />;

    const heroData = data.data.page_section.find(
        (section) => section.section_header === "Hero section",
    );
    const usp1Data = data.data.page_section.find(
        (section) => section.section_header === "USP 1",
    );
    const usp2Data = data.data.page_section.find(
        (section) => section.section_header === "USP 2",
    );
    const benefitsData = data.data.page_section.find(
        (section) => section.section_header === "Benefits",
    );
    const searchSpaceData = data.data.page_section.find(
        (section) => section.section_header === "Search space",
    );
    const howItWorksData = data.data.page_section.find(
        (section) => section.section_header === "How it works",
    );
    const socialProofData = data.data.page_section.find(
        (section) => section.section_header === "Social Proof",
    );
    const joinUsData = data.data.page_section.find(
        (section) => section.section_header === "Join Us",
    );

    return (
        <>
            {isPending ? (
                <LoadingComponent />
            ) : error ? (
                <ErrorDisplayComponent />
            ) : (
                <div>
                    {/* <AddressSocial /> */}
                    <BannerSection data={heroData} />

                    <JoinSection data={usp1Data} />
                    <div className="px-2 sm:px-6">
                        {/* <WhatYouGet data={usp2Data} /> */}
                        <VlooWorks />
                        <SpacesVloo />
                        <SpacesCarousel />
                        <GetLook />
                        <UserVloo />
                        <OfficeSpaceSection data={benefitsData} />
                        <InterestsSection />
                        <BestSpaces data={searchSpaceData} />
                        <HowItWorks data={howItWorksData} />
                        <TestimonialSection data={socialProofData} />
                        <FundedBy />
                        <PricingSection data={joinUsData} />
                        <FAQSection data={data?.data?.faq} />
                        <BecomeAHost />
                        <SubscribeUs />
                    </div>
                </div>
            )}
        </>
    );
}
