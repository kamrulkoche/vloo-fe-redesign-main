export default function WhatYouGetCard({ title, desc, file, index }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`mb-8 flex flex-col items-center gap-5 sm:mb-16 sm:gap-28 ${
        isEven ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      <div className="w-full sm:w-1/2">
        <p className="mb-2 text-3xl font-medium text-[#006988] sm:mb-5 sm:text-5xl">
          {title}
        </p>
        <p className="text-xl font-normal text-[#757575] sm:text-2xl">{desc}</p>
      </div>
      <div className="w-full sm:w-1/2">
        <video
          src={file}
          autoPlay
          loop
          muted
          className="h-56 w-full rounded-[20px] border border-[#f3f3f3] object-cover"
          // onMouseEnter={(e) => (e.target.controls = true)}
          // onMouseLeave={(e) => (e.target.controls = false)}
        />
      </div>
    </div>
  );
}
