"use client";
import PricingComponent from "@/components/MainPages/PricingComponent";
import FAQSection from "@/components/VLOOProPages/FAQSection";
import React, { useState } from "react";

const PricingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PricingComponent />
      <FAQSection />
    </>
  );
};

export default PricingPage;
