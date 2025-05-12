const RenderStars = ({ rating = "5" }) => {
  const totalStars = 5;
  const starElements = [];

  for (let i = 1; i <= totalStars; i++) {
    const starImg = i <= 4 ? "/assets/icons/star-black.svg" : "/assets/icons/star-white.svg";
    starElements.push(
      <img
        key={i}
        src={starImg}
        alt={`star-${i}`}
        className="mr-[3px] h-[24px] w-[25px]"
      />,
    );
  }
  return starElements;
};

export default RenderStars;
