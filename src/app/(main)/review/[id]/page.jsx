import ReviewComponent from "@/components/MainPages/ReviewComponent";

const Review = ({ params }) => {
  const spaceId = params.id;

  return (
    <div>
      <ReviewComponent spaceId={spaceId} />;
    </div>
  );
};

export default Review;
