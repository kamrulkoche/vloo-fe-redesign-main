"use client";
import React from "react";
import BannerSection from "@/components/MainPages/MainWhyVLOOPages/BannerSection";
import USP1Section from "@/components/MainPages/MainWhyVLOOPages/USP1Section";
import OnDemandSection from "@/components/MainPages/MainWhyVLOOPages/OnDemandSection";
import GetStartedTodaySection from "@/components/MainPages/MainWhyVLOOPages/GetStartedTodaySection";
import JoinNowSection from "@/components/MainPages/MainWhyVLOOPages/JoinNowSection";
import AboutSection from "@/components/MainPages/MainWhyVLOOPages/AboutSection";
import FAQSection from "@/components/MainPages/MainWhyVLOOPages/FAQSection";
import SpaceSection from "@/components/MainPages/MainWhyVLOOPages/SpaceSection";
import GetStarted from "@/components/MainPages/MainWhyVLOOPages/GetStarted";
import SubscribeUs from "@/components/MainPages/MainWhyVLOOPages/SubscribeUs";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorDisplayComponent from "@/components/ErrorDisplayComponent";

export default function MainWhyVLOOPagesContainer() {
  const { data, isFetched, isPending, error } = usePageContentShow(5);

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
  const getStarted = data.data.page_section.find(
    (section) => section.section_header === "Get Started",
  );
  const join = data.data.page_section.find(
    (section) => section.section_header === "Join Now",
  );
  const about = data.data.page_section.find(
    (section) => section.section_header === "About",
  );
  const usp = data.data.page_section.find(
    (section) => section.section_header === "USP",
  );
  const faq = data.data.faq;
  const space = data.data.space;

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorDisplayComponent />
      ) : (
        <div>
          {heroData && <BannerSection data={heroData} />}
          {usp1Data && <USP1Section data={usp1Data} />}
          {usp2Data && <OnDemandSection data={usp2Data} />}
          {getStarted && <GetStartedTodaySection data={getStarted} />}
          {join && <JoinNowSection data={join} />}
          {about && <AboutSection data={about} />}
          {faq && <FAQSection data={faq} />}
          {space && <SpaceSection data={space} />}
          {usp && <GetStarted data={usp} />}
          <SubscribeUs />
        </div>
      )}
    </>
  );
}
