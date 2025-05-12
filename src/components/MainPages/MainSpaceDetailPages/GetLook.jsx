import React from 'react'

export const GetLook = () => {
    return (
        <div>
            <h2 className='text-xl sm:text-3xl lg:text-5xl font-bold mt-8 text-center'>Get a look at how <span className='text-[#0091B6]'>VLOO</span> works</h2>
            <p className='text-[#757575] font-normal text-lg sm:text-2xl mt-2 text-center '>See what VLOO offers compared to others on the market</p>

            <div className='grid md:grid-cols-2 mt-8'>
                <div className='w-full'>
                    <img src="/assets/images/look.png" alt="" />
                </div>
                <div className='bg-[#E0F7FA] py-16 px-10 rounded-[2rem] md:-ml-16'>
                    <div className='flex gap-4 '>
                        <h1 className='bg-[#7FE5F0] text-black p-4 rounded-full text-lg font-semibold w-10 h-10 flex items-center justify-center'>
                            1
                        </h1>
                        <div className='grid'>
                            <h2 className='bg-[#7FE5F0] text-lg font-normal rounded-3xl py-2 px-4 flex items-center justify-center w-fit'>
                                Find your space
                            </h2>
                            <h2 className='mt-2 text-[#071A2B] font-normal text-base'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document </h2>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-10'>
                        <h1 className='bg-[#F0A3A3] text-black p-4 rounded-full text-lg font-semibold w-10 h-10 flex items-center justify-center'>
                            2
                        </h1>
                        <div className='grid'>
                            <h2 className='bg-[#F0A3A3] text-lg font-normal rounded-3xl py-2 px-4 flex items-center justify-center w-fit'>
                                Join VLOO
                            </h2>
                            <h2 className='mt-2 text-[#071A2B] font-normal text-base'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document </h2>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-10'>
                        <h1 className='bg-[#A3D6E7] text-black p-4 rounded-full text-lg font-semibold w-10 h-10 flex items-center justify-center'>
                            3
                        </h1>
                        <div className='grid'>
                            <h2 className='bg-[#A3D6E7] text-lg font-normal rounded-3xl py-2 px-4 flex items-center justify-center w-fit'>
                                Book your favorable space
                            </h2>
                            <h2 className='mt-2 text-[#071A2B] font-normal text-base'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document </h2>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-10'>
                        <h1 className='bg-[#FFD8C2] text-black p-4 rounded-full text-lg font-semibold w-10 h-10 flex items-center justify-center'>
                            4
                        </h1>
                        <div className='grid'>
                            <h2 className='bg-[#FFD8C2] text-lg font-normal rounded-3xl py-2 px-4 flex items-center justify-center w-fit'>
                                Go to your space
                            </h2>
                            <h2 className='mt-2 text-[#071A2B] font-normal text-base'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document </h2>
                        </div>
                    </div>

                    <button className='text-white font-medium text-[18px] mt-14 bg-[#006988] px-14 py-2.5 rounded-2xl hover:bg-[#1d7c99] duration-200'>Join</button>

                </div>
            </div>
        </div>
    )
}
