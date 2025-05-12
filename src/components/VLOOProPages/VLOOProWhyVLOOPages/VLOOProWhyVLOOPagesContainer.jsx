"use client";
import React from "react";
import BannerSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/BannerSection";
import VideoSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/VideoSection";
import GetStartedTodaySection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/GetStartedTodaySection";
import JoinNowSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/JoinNowSection";
import AboutSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/AboutSection";
import FAQSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/FAQSection";
import SubscribeUs from "@/components/VLOOProPages/VLOOProWhyVLOOPages/SubscribeUs";
import USPSection from "@/components/VLOOProPages/VLOOProWhyVLOOPages/USPSection";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorDisplayComponent from "@/components/ErrorDisplayComponent";

export default function VLOOProWhyVLOOPagesContainer() {
  const { data, isFetched, isPending, error } = usePageContentShow(6);
  if (!isFetched || !data?.data?.page_section) return <LoadingComponent />;

  const heroData = data.data.page_section.find(
    (section) => section.section_header === "Hero section",
  );
  const usp1Data = data.data.page_section.find(
    (section) => section.section_header === "USP 1",
  );
  const getStarted = data.data.page_section.find(
    (section) => section.section_header === "Get Started",
  );
  const join = data.data.page_section.find(
    (section) => section.section_header === "Join Now - About",
  );
  const about = data.data.page_section.find(
    (section) => section.section_header === "About",
  );
  const faq = data.data.faq;

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorDisplayComponent />
      ) : (
        <div>
          {heroData && <BannerSection data={heroData} />}
          {usp1Data && <USPSection data={usp1Data} />}
          <VideoSection />
          {getStarted && <GetStartedTodaySection data={getStarted} />}
          {join && <JoinNowSection data={join} />}
          {about && <AboutSection data={about} />}
          {faq && <FAQSection data={faq} />}
          <SubscribeUs />
        </div>
      )}
    </>
  );
}
