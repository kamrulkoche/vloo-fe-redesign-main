export default function SectionTitle({ title, textAlign = "text-center" }) {
  return (
    <>
      <p
        className={`pt-5 ${textAlign} text-2xl font-bold text-[#0A2A3C] sm:pt-10 sm:text-4xl`}
      >
        {title}
      </p>
    </>
  );
}
