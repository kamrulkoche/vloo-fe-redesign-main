const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="rounded-[20px] bg-[#0A2A3C] px-3 py-14 text-center text-white">
      <div className="mb-4">
        <img src={image} alt={title} className="mx-auto h-[80px] w-[80px]" />
      </div>
      <h4 className="mb-2 text-[28px] font-[600] leading-[40px]">{title}</h4>
      <p className="text-[20px] font-[400] leading-[20px]">{description}</p>
    </div>
  );
};

export default BenefitCard;
