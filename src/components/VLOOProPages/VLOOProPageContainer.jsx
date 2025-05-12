"use client";

import BannerSection from "@/components/VLOOProPages/BannerSection";
import ClientReview from "@/components/VLOOProPages/ClientReview";
import FAQSection from "@/components/VLOOProPages/FAQSection";
import GetStarted from "@/components/VLOOProPages/GetStarted";
import HowItWorks from "@/components/VLOOProPages/HowItWorks";
import JoinSection from "@/components/VLOOProPages/JoinSection";
import PricingSection from "@/components/VLOOProPages/PricingSection";
import Stats from "@/components/VLOOProPages/Stats";
import SubscribeUs from "@/components/VLOOProPages/SubscribeUs";
import WhatYouGet from "@/components/VLOOProPages/WhatYouGet";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import ErrorDisplayComponent from "../ErrorDisplayComponent";
import LoadingComponent from "../LoadingComponent";

export default function VLOOProPageContainer() {
  const { data, isFetched, isPending, error } = usePageContentShow(3);

  if (!isFetched || !data?.data?.page_section) return <LoadingComponent />;

  const heroData = data?.data?.page_section.find(
    (section) => section.section_header === "Hero section",
  );
  const usp1Data = data?.data?.page_section.find(
    (section) => section.section_header === "USP 1",
  );
  const usp2Data = data?.data?.page_section.find(
    (section) => section.section_header === "USP 2",
  );
  const howItWorks = data?.data?.page_section.find(
    (section) => section.section_header === "How it works",
  );
  const socialProof = data?.data?.page_section.find(
    (section) => section.section_header === "Social Proof",
  );
  const joinUsData = data?.data?.page_section.find(
    (section) => section.section_header === "Join Us",
  );
  const faq = data?.data?.faq;

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorDisplayComponent />
      ) : (
        <div>
          <BannerSection data={heroData} />
          <JoinSection data={usp1Data} />
          <div className="px-2 sm:px-6">
            <WhatYouGet data={usp2Data} />
            <Stats />
            <HowItWorks data={howItWorks} />
            <ClientReview data={socialProof} />
            <PricingSection data={joinUsData} />
            {faq && <FAQSection data={faq} />}
            <GetStarted />
            <SubscribeUs />
          </div>
        </div>
      )}
    </>
  );
}
