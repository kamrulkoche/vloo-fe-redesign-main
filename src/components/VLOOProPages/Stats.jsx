"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const dummyData = [
  {
    id: 1,
    value: 54,
    desc: "Full control of your office costs",
  },
  {
    id: 2,
    value: 75,
    desc: "Office access to cool companies in different industries.",
  },
  
  {
    id: 3,
    value: 95,
    desc: "No setup costs",
  },
];

export default function Stats() {
  return (
    <div className="mx-6 md:mx-[25px] mb-[25px] rounded-[10px] bg-[#F3F3FE]">
      <p className="pb-[80px] pt-6 md:pt-[74px] text-center text-[40px] md:text-[48px] font-bold leading-[44px] text-[#0A2A3C]">
        No lease commitments. No extra fees
      </p>
      <div className="mx-6 md:mx-20 flex flex-col text-center md:flex-row justify-between gap-[50px] pb-[71px]">
        {dummyData.map((item, index) => (
          <StatItem
            key={item.id}
            value={item.value}
            desc={item.desc}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, desc, index }) {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger animation when 50% of the component is visible
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let interval;
    if (inView) {
      const increment = Math.ceil(value / 50); // Divide the target value into 100 steps
      interval = setInterval(() => {
        setDisplayValue((prev) => {
          if (prev + increment >= value) {
            clearInterval(interval); // Stop when the target value is reached
            return value;
          }
          return prev + increment;
        });
      }, 50); // Update every 50ms (adjust this for smoother/slower animations)
    } else {
      setDisplayValue(0); // Reset when out of view
    }

    return () => clearInterval(interval); // Cleanup on unmount or when inView changes
  }, [inView, value]);

  return (
    <div ref={ref} className="ml-0 flex flex-col">
      <p className="mb-[21px] text-[80px] font-bold leading-[80px] text-[#006988]">
        {displayValue}
        <span className="text-[36px] font-bold leading-[48px] text-[#006988]">
          %
        </span>
      </p>
      <p
        className={`text-[28px] font-semibold leading-[40px] text-[#006988] ${
          index === 0
            ? "w-full md:w-[300px]"
            : index === 1
              ? "w-full md:w-[300px]"
              : "w-full md:w-[300px]"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
