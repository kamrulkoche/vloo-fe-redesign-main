"use client";

import ErrorDisplayComponent from "@/components/ErrorDisplayComponent";
import LoadingComponent from "@/components/LoadingComponent";
import SignUpContainer from "@/components/SignUpLayout/SignUpContainer";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";

export default function ProSignUpPage() {
  const { data, isFetched, isPending, error } = usePageContentShow(3);

  if (!isFetched || !data?.data?.page_section) return <LoadingComponent />;

  const socialProof = data?.data?.page_section.find(
    (section) => section.section_header === "Social Proof",
  );

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorDisplayComponent />
      ) : (
        <div>
          <SignUpContainer
            source="Host"
            socialProofData={socialProof?.sub_section}
          />
        </div>
      )}
    </>
  );
}
