import React from 'react'
import Image from 'next/image'
import { IncWorks } from './IncWorks'
import { WorkOffice } from './WorkOffice'

export const WorkEnvironment = () => {
    return (
        <div className="">
            <div className="grid xl:flex">
                <div
                    className="flex justify-center flex-shrink-0 mt-6 lg:justify-start sm:mt-0"
                    style={{ width: '416px', height: '396px', aspectRatio: '104 / 99' }}
                >
                    <Image
                        src="/assets/images/WorkEnvironment.png"
                        alt="Space Layout"
                        width={416}
                        height={396}
                        className="object-contain w-full h-full"
                    />
                </div>


                <div className="bg-[#B4E6EA] rounded-2xl ml-6">
                    <p className="text-base md:text-[20px] font-medium leading-[28px] text-[#13293ACC] p-[30px] sm:pr-14 text-justify">
                        <span className="text-2xl font-semibold text-black md:text-3xl">Work Environment</span> is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer. Whenever they need to work close to home, work privately or meet with the rest of the team outside the office, we provide full flexibility. For companies of all sizes, we offer top notch daytime access to work spaces where employees live.is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer.

                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 mt-6 lg:grid-cols-8">
                <div className="bg-[#B4E6EA] rounded-2xl lg:col-span-5">
                    <p className="text-base md:text-[20px] font-medium leading-[28px] text-[#13293ACC] p-[30px] sm:pr-14 text-justify">
                        <span className="text-2xl font-semibold text-black md:text-3xl">Space Layout</span> is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer. Whenever they need to work close to home, work privately or meet with the rest of the team outside the office, we provide full flexibility.For companies of all sizes, we offer top notch daytime access to work spaces where employees live.is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer.

                    </p>
                </div>
                <div className="flex justify-center mt-6 lg:col-span-3 lg:justify-start sm:mt-0">
                    <Image
                        src="/assets/images/spaceLayout.png"
                        alt="Space Layout"
                        width={600}
                        height={600}
                        className="object-contain w-full h-auto md:max-h-72"
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 mt-6 lg:grid-cols-8">
                <div className="flex justify-center lg:col-span-5 lg:justify-start ">
                    <Image
                        src="/assets/images/meetTheHost.png"
                        alt="Space Layout"
                        width={600}
                        height={600}
                        className="object-contain w-full h-auto"
                    />
                </div>

                <div className="bg-[#B4E6EA] rounded-2xl lg:col-span-3 sm:ml-6 sm:h-[450px] mt-6 sm:mt-0 lex justify-center lg:justify-start">
                    <p className="text-base md:text-[20px] font-medium leading-[28px] text-[#13293ACC] p-[30px] text-justify">
                        <span className="text-2xl font-semibold text-black md:text-3xl">Meet the host</span> is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer. Whenever they need to work close to home, work privately or meet with the rest of the team outside the office, we provide full flexibility. For companies of all sizes,
                    </p>
                </div>
            </div>



            {/* <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-7">
                <div className="flex justify-center lg:col-span-4 lg:justify-start">
                    <Image
                        src="/assets/images/meetTheHost.png"
                        alt="Meet the Host"
                        width={600}
                        height={600}
                        className="object-contain w-full h-auto"
                    />
                </div>
                <div className="bg-[#B4E6EA] p-4 rounded-2xl lg:col-span-3">
                    <p className="text-base md:text-lg text-[#13293ACC]">
                        <span className="text-2xl font-semibold text-black md:text-3xl">Meet the host </span> is a super local employee benefit for those that don't like to work from home, those who spend a lot of time commuting, or those that need more privacy than co-working hubs can offer. Whenever they need to work close to home, work privately or meet with the rest of the team outside the office, we provide full flexibility. For companies of all sizes,
                    </p>
                </div>
            </div> */}

            <WorkOffice />
        </div>
    )
}
