import MainSpaceDetailPagesContainer from "@/components/MainPages/MainSpaceDetailPages/MainSpaceDetailPagesContainer";

export default function MainSpaceDetail({ params }) {
  const spaceId = params.space;

  return (
    <div>
      <MainSpaceDetailPagesContainer spaceId={spaceId} />
    </div>
  );
}
