"use client";
import Image from 'next/image'

import { motion } from "framer-motion";
import GlobalSearch from "../CustomComponents/GlobalSearch";


export default function BannerSection({ data }) {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    }),
  };

  return (

    // <div className="relative h-[300px] w-full md:h-[548px]">
    //   <motion.video
    //     src={
    //       data?.upload_files?.[0]?.file_url || "/assets/videos/home-page.mp4"
    //     }
    //     autoPlay
    //     loop
    //     muted
    //     className="h-[300px] w-full object-cover md:h-[548px]"
    //     initial={{ scale: 1.03, opacity: 0 }}
    //     animate={{ scale: 1, opacity: 1 }}
    //     transition={{ duration: 1 }}
    //   />

    //   {/* Opacity Layer */}
    //   <div className="absolute inset-0 bg-black opacity-40" />

    //   {/* Contents */}
    //   <motion.div
    //     className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-28"
    //     variants={containerVariants}
    //     initial="hidden"
    //     animate="visible"
    //   >
    //     {/* Animated Title */}
    //     <motion.p
    //       className="text-center text-[28px] font-bold leading-none text-white md:text-[60px]"
    //       variants={textVariants}
    //       custom={0.5}
    //     >
    //       {data?.section_title && (
    //         <>
    //           {data.section_title.split(" ").slice(0, -1).join(" ")}{" "}
    //           <span className="mt-2 inline-block h-[30px] rounded-[10px] bg-white px-2 text-[#00A481] md:mt-8 md:h-[70px]">
    //             {data.section_title.split(" ").slice(-1)}
    //           </span>
    //         </>
    //       )}
    //     </motion.p>
    //     <div className="mt-8 md:mt-20">
    //       {/* Animated Subtitle */}
    //       <motion.p
    //         className="mb-3 text-center text-[14px] font-medium leading-[18px] text-white md:text-[18px] md:leading-[24px]"
    //         variants={textVariants}
    //         custom={0.7}
    //       >
    //         {data?.section_sub_title}
    //       </motion.p>
    //       {/* Global Search */}
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6, delay: 1 }}
    //       >
    //         <GlobalSearch />
    //       </motion.div>
    //     </div>
    //   </motion.div>
    // </div>

    <div className=''>
      <div>
        <h2 className="text-3xl sm:text-5xl lg:text-[90px] text-[#071A2B] font-semibold text-center mx-auto mt-14">
          Streamlining the Office Space <span className="sm:block text-[#006988]">Experience.</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-2xl font-medium text-center mx-auto mt-8 text-[#071A2B]">Now  Available at your nearest cities in Norway!!</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-fit mx-auto mt-8'>
        <button className='bg-[#0A2A3C] py-2.5 px-8 flex items-center gap-2 rounded-2xl text-white font-medium text-[13px] w-[145px] text-center justify-center'>
          <span> <Image
            src="/assets/icons/location.png"
            width={13}
            height={13}
            alt="Picture of the author"
          />
          </span>
          Oslo
        </button>
        <button className='bg-[#115B72] py-2.5 px-8 flex items-center gap-2 rounded-2xl text-white font-medium text-[13px] w-[145px] text-center justify-center'>
          <span> <Image
            src="/assets/icons/location.png"
            width={13}
            height={13}
            alt="Picture of the author"
          />
          </span>
          Bergen
        </button>
        <button className='bg-[#457484] py-2.5 px-8 flex items-center gap-2 rounded-2xl text-white font-medium text-[13px] w-[145px] text-center justify-center'>
          <span> <Image
            src="/assets/icons/location.png"
            width={13}
            height={13}
            alt="Picture of the author"
          />
          </span>
          Tromso
        </button>
        <button className='bg-[#72A1B6] py-2.5 px-8 flex items-center gap-2 rounded-2xl text-white font-medium text-[13px] w-[145px] text-center justify-center'>
          <span> <Image
            src="/assets/icons/location.png"
            width={13}
            height={13}
            alt="Picture of the author"
          />
          </span>
          Lofoten
        </button>


      </div>

      <div className='mt-8 mx-4'>
        <GlobalSearch />
      </div>

    </div>





  );
}
