"use client";

import CommonPolicyTitle from "@/components/CustomComponents/CommonPolicyTitle";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import LoadingComponent from "../LoadingComponent";
import { DateFormatterType1Function } from "../HelperFunctions/DateFormatterFunctions";

const SustainabilityPolicyDetails = () => {
  const { data, isPending } = usePageContentShow(12);

  const sustainabilityPolicyData = data?.data?.page_section?.find(
    (section) => section.section_header === "Content section",
  );

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div className="bg-[#F3F3F3] pb-[70px] pt-[58px]">
          <CommonPolicyTitle
            title={"Sustainability Policy"}
            subtitle={`LAST UPDATE: ${DateFormatterType1Function(sustainabilityPolicyData?.updated_at)}`}
          />
          <div
            className="tinyMCE px-[20px] md:px-[50px] lg:px-[100px]"
            dangerouslySetInnerHTML={{
              __html: sustainabilityPolicyData?.details,
            }}
          />

          {/* <div>
          <div className="px-[20px] md:px-[50px] lg:px-[100px]">
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              PURPOSE
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              Our ambition is to make vacant office spaces available to more
              people. Better space utilization leads to better sustainability.
              We all have a responsibility to make sustainable commitments and
              support others to change their behavior for a healthier future.
              Millions of dollars are wasted on fixed lease contracts where
              companies rent more office space than needed. VLOOs platform
              finally gives them an opportunity to share their empty space
              whenever they want, whilst having complete control on the booking
              calendar, risk free. VLOO will improve the company's bottom line,
              regardless of how many people are in the office. Therefore, VLOO
              is a concept that makes economic sense for society, companies, and
              employees alike
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              To reach our ambition, we need to think and act sustainably and
              make sustainable innovations that benefit others. The purpose of
              this policy is to strengthen our commitment to a more sustainable
              world and to guide us in our daily work life. It applies to all
              employees and all parts of our operations. By following the
              principles in this document, we will improve as a company - and at
              the same time improve the world.
            </p>
            <br />
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              WHO WE ARE 
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              VLOO is the first work space platform offering companies and real
              estate owners increased  liquidity and flexibility by unlocking
              empty desks on their terms. By combining technology, bold
              marketing and communication strategies, and innovative digital
              concepts, we work hard every day to build a platform that helps
              companies of all sizes to improve their bottom line, regardless of
              how many people are in the office.
            </p>
            <br />
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              WHAT WE STAND FOR
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              As a modern technology company that encourages companies to share
              their vacant office space, we want to help our customers make
              sustainable decisions that have a positive impact on society,
              companies and individuals as we all strive to advance the green
              transition. Rooted in our values and culture is our belief in
              everyone’s equal worth. We are personal and welcoming to all. As a
              startup we are committed to have fun while we work and help each
              other on the way. We take pride in the work we do. We stand for
              inclusion and diversity, a great working life and a healthy
              planet. We also support the ten principles of responsible business
              established in the UN Global Compact, aiming to meet fundamental
              responsibilities in the areas of human rights, labor, environment
              and anti-corruption. VLOO shall, through our operations and the
              missions we take on, contribute to a more sustainable society.
            </p>
            <br />
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              INCLUSION & DIVERSITY 
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              We stand for inclusion and diversity. For everyone’s right to be
              who they are and what they want. This applies to all of our
              operations; to how we treat each other, when recruiting new
              talents and when choosing the partners we collaborate with. We
              have zero tolerance towards any forms of harassment or
              discrimination. At VLOO, we treat everybody the same way, and
              expect others to do so as well. We believe that a diverse
              workforce with a wide array of perspectives promotes creativity
              and customer satisfaction.
            </p>
            <br />
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              GREAT WORKING LIFE
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              VLOO is nothing without our talents. We strive to create a great
              workplace that suits everyone. Regardless of personality, we offer
              a place where you can grow, develop and have a healthy lifestyle.
              We believe in flexibility, and that having a flexible and dynamic
              working life contributes to a more creative and productive
              environment. We actively encourage collaborations with partners
              and clients who can ensure good working conditions in their value
              chain.
            </p>
            <br />
            <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
              A HEALTHY PLANET
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              We stand for a healthy planet and rational thinking. Our way of
              life is threatened by climate change where marginalized groups and
              future generations will be disproportionately impacted. Reducing
              global warming is for a fact the biggest challenge of our
              lifetime. At VLOO, we want to change the tide and contribute to a
              healthier planet and a sustainable future. Therefore, we strive to
              continually improve our operations and reduce our ecological
              footprint, AND help others to do it as well
            </p>
            <br />
            <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
              This policy is updated at least every year.
            </p>
          </div>
        </div>

        <div className="mt-[40px] px-[20px] md:px-[50px] lg:px-[100px]">
          <p className="text-[16px] font-[500] leading-[22px] text-[#868686]">
            Stabekk, Norway
          </p>
          <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
            Andreas Askehagen Kroken
          </p>
        </div> */}
        </div>
      )}
    </>
  );
};

export default SustainabilityPolicyDetails;
