"use client";

import CommonPolicyTitle from "@/components/CustomComponents/CommonPolicyTitle";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import LoadingComponent from "../LoadingComponent";
import { DateFormatterType1Function } from "../HelperFunctions/DateFormatterFunctions";

const PrivacyPolicyDetails = () => {
  const { data, isPending } = usePageContentShow(11);

  const privacyPolicyData = data?.data?.page_section?.find(
    (section) => section.section_header === "Content section",
  );

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div className="bg-[#F3F3F3] pb-[70px] pt-[58px]">
          <CommonPolicyTitle
            title={"Privacy Policy"}
            subtitle={`LAST UPDATE: ${DateFormatterType1Function(privacyPolicyData?.updated_at)}`}
          />
          <div
            className="tinyMCE px-[20px] md:px-[50px] lg:px-[100px]"
            dangerouslySetInnerHTML={{
              __html: privacyPolicyData?.details,
            }}
          />

          {/* <div>
            <div className="px-[20px] md:px-[50px] lg:px-[100px]">
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                1. Introduction
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO (referred to as “VLOO” or We”) protects your personal
                integrity and wants to assure you that we process your personal
                data in accordance with the GDPR (the EU General Data Protection
                Regulation nr. 2016/679)
              </p>
              <br />
              <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                This Privacy Policy sets out how we may collect, process and
                store your personal data. This policy applies where we are
                acting as a data controller with respect to your personal data;
                in other words, where we determine the purposes and means of the
                processing of that personal data. 
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                2. What is personal data?
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                Personal data means any information relating to an identified or
                identifiable natural person (‘data subject’); an identifiable
                natural person is one who can be identified, directly or
                indirectly, in particular by reference to an identifier such as
                a name, an identification number, location data, an online
                identifier such as IP-address, or to one or more factors
                specific to the physical, physiological, genetic, mental,
                economic, cultural or social identity of that natural person
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                3. What personal data does VLOO collect?
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO collects personal data that you have provided, such as: 
              </p>
              <ul className="list-disc pl-6 text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                <li>Name</li>
                <li>E-mail</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Identification number (NO. personnummer)</li>
                <li>Bank account number</li>
                <li>Social Channel Statistics</li>
                <li>Geographic statistics</li>
              </ul>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                4. How does VLOO collect personal data?
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                We may collect personal data that you give us, for example:
              </p>
              <ul className="list-disc pl-6 text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                <li>
                  By filling in a form on our website or sending us an e-mail
                </li>
                <li>If you apply for a job at VLOO </li>
                <li>
                  If you participate in competitions and other promotional
                  activities that we organize
                </li>
                <li>
                  If you visit or communicate with us through our social media
                  accounts (ie. third party platforms such as Facebook and
                  Instagram) VLOO may receive information about your profile and
                  your third party platform interactions from its provider.
                </li>
              </ul>
              <br />
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                This information may be personal, financial, educational or
                related to your employment history. Information we may collect
                from you
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                5. Why does VLOO collect personal data?
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                The personal data collected about you will be processed by VLOO,
                or its subcontractors, for the following purposes:
              </p>
              <ul className="list-decimal pl-6 text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                <li>To fulfill our agreement with you;</li>
                <li>To provide our services and to process your payment;</li>
                <li>To place orders and make payments;</li>
                <li>
                  To communicate with you by email, website forms and in our
                  social media accounts;
                </li>
                <li>For recruitment purposes;</li>
                <li>
                  To administer marketing activities like competitions and to
                  announce winners etc.
                </li>
                <li>
                  For marketing purposes, including mail, email and sms / mms
                  marketing (which you can choose to unsubscribe from via a link
                  in each mail or email / text message);
                </li>
                <li>
                  To get statistics about the use of our website and other
                  Social Media;
                </li>
                <li>
                  To maintain, develop, test and improve our website and the
                  technology platforms on which they are provided;
                </li>
                <li>
                  To comply with applicable laws, for example accounting laws,
                  and
                </li>
                <li>Digital Marketing profiles</li>
              </ul>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                6. Legal ground for processing of personal data
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO always processes your personal data in accordance with
                applicable law. We process your personal data when it is
                necessary to fulfill an agreement with you and when we have
                another legal and legitimate interest in processing your
                personal data. If VLOO were to process your personal data for
                any purpose that, according to applicable law, requires your
                consent, we will obtain your prior consent
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                7. Protection of personal data
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO protects your personal data with high security and takes
                appropriate technical and organizational security measures to
                protect your personal data from unauthorized access,
                modification, dissemination or destruction
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                8. Restriction on disclosure of personal data
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO may collaborate with external partners (subcontractors) to
                perform tasks for VLOOs account, for example, to provide IT
                services, delivery, accounting, payment solutions or help with
                marketing, analysis or statistics. The execution of these
                services may mean that VLOO partners, both within the EU / EEA
                and outside the EU / EEA, will have access to your personal
                data. Companies that handle personal data on VLOOs behalf always
                sign a data processor agreement with VLOO to ensure a high level
                of protection for your personal data.
              </p>
              <br />
              <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                If your personal data is transferred to any country outside the
                EU / EEA, VLOO will take steps to ensure that your personal data
                remains protected and also take the necessary steps to legally
                transfer personal data to non-EU / EEA countries
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                9. How long will we store your personal data?
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO will not retain your personal data for longer than what is
                necessary. We will keep your personal information:
              </p>
              <ul className="list-disc pl-6 text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                <li>For as long as required by law</li>
                <li>Until we no longer have a valid reason for keeping it</li>
                <li>Until we no longer have a valid reason for keeping it</li>
              </ul>
              <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                We may keep just enough of your personal data to ensure that we
                comply with your requests not to use your personal information
                or comply with your right to erasure. For example, we must keep
                your request to be erased even if it includes your personal data
                until such time as you are no longer our customer.
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                10. Your rights 
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO will, at your request or on its own initiative, rectify,
                disassociate, delete or supplement information that is found to
                be incorrect, incomplete or misleading. You are entitled to
                object to personal data processing performed on the legal basis
                of a balance of interest. If you object to such processing, we
                will only continue to process your personal data if there are
                legitimate reasons for treatment that weigh heavier than your
                interests. If you do not want us to process your personal data
                for direct marketing, you are always entitled to object to such
                processing by contacting us, see contact information below. Once
                we have received your objection, we will cease processing your
                personal data for such marketing purposes
              </p>
              <br />
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                You are also entitled to request:
              </p>
              <ul className='className="text-[16px] list-decimal pl-6 font-[600] leading-[22px] text-[#13293ACC]'>
                <li>
                  Access to your personal data: This means that you are entitled
                  to request a registry outline of the personal data being
                  processed about you. You are also entitled to receive a copy
                  of the personal data being processed. You are entitled to once
                  a calendar year, by written application, receive a transcript
                  of what personal data is registered about you, the purpose of
                  the processing and information about who we have disclosed
                  your information to.
                </li>
              </ul>
              <br />
              <ul className='className="text-[16px] list-decimal pl-6 font-[600] leading-[22px] text-[#13293ACC]'>
                <li>
                  Correction of your personal data: We will correct any
                  incorrect or incomplete information we have stored about you
                  as soon as possible upon your request.
                </li>
              </ul>
              <br />
              <ul className='className="text-[16px] list-decimal pl-6 font-[600] leading-[22px] text-[#13293ACC]'>
                <li>
                  Deletion of your personal data: This means that you are
                  entitled to request that your personal data be removed if it
                  is no longer necessary for the purpose for which it was
                  collected. However, this right is limited by the fact that
                  there may be legal requirements preventing us from immediately
                  deleting your personal data, for example, accounting and tax
                  laws. In that case, we will stop processing your personal data
                  for any purposes other than complying with applicable
                  legislation. 
                </li>
              </ul>
              <br />
              <ul className='className="text-[16px] list-decimal pl-6 font-[600] leading-[22px] text-[#13293ACC]'>
                <li>
                  Limitation of data processing: This means that your personal
                  data may only be used for specific purposes that you have
                  agreed to. For example, you may request a limitation when you
                  consider your information to be incorrect and you have
                  requested a correction according to section 11.b of this
                  Privacy Policy. Meanwhile, the accuracy of the data is
                  investigated, the processing will be limited
                </li>
              </ul>
              <br />
              <ul className='className="text-[16px] list-decimal pl-6 font-[600] leading-[22px] text-[#13293ACC]'>
                <li>
                  Data portability: This means that you have the right to, under
                  certain conditions, extract and transfer your personal data in
                  a structured, widely used, and machine-readable format to
                  another data controller.
                </li>
              </ul>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                11. Contact information
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO is the responsible data controller for the processing of
                your personal data. If you have any questions about our
                processing of your personal data, what information we have
                stored or if you would like to exercise any of your rights as
                stated above please contact: Andreas Askehagen Kroken - andreas@
              </p>
              <br />
              <p className="text-[20px] font-[700] leading-[28px] text-[#13293ACC]">
                12. Changes to this Privacy Policy
              </p>
              <p className="text-[16px] font-[600] leading-[22px] text-[#13293ACC]">
                VLOO may, from time to time, make changes to this Privacy
                Policy. The latest version of the Privacy Policy is always
                available on VLOO website
              </p>
              <br />
            </div>
            <div className="px-[20px] md:px-[50px] lg:px-[100px]">
              <p className="text-[16px] font-[500] leading-[22px] text-[#868686]">
                Stabekk, Norway
              </p>
              <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
                Andreas Askehagen Kroken
              </p>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default PrivacyPolicyDetails;
