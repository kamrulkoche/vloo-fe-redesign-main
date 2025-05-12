import React from 'react'

export const VlooWorks = () => {
    return (
        <div className='bg-[#B4E6EA] rounded-[2rem] p-8 pb-14 mt-20'>
            <div className=''>
                <div className='text-center mx-auto'>
                    <h2 className='text-[#071A2B] font-bold text-2xl sm:text-[48px]'>
                        Get a look at how <span className='text-[#0091B6]'>VLOO</span> works
                    </h2>
                    <p className='text-[#757575] text-lg sm:text-2xl font-normal mt-4'>See what VLOO offers compared to others on the market</p>
                </div>
                <div className='grid lg:grid-cols-2 gap-8 mt-10'>
                    <div className='pb-4'>
                        <div>
                            <h2 className='text-[#0091B6] font-semibold text-xl sm:text-[50px] '>Free membership</h2>
                            <p className='text-lg mt-6 sm:text-[28px] font-normal leading-snug text-[#071A2B]'>Automate away routine tasks with the power of generative AI and simplify your, Automate away routine tasks</p>
                            <button className='bg-[#006988] text-white font-medium sm:text-[18px] py-2.5 px-4 rounded-2xl mt-8'>
                                <h2> Learn More</h2> <span></span>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <iframe
                            className="aspect-video w-full max-w-[532px] rounded-3xl bg-[#42D2ED] p-4"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    )
}
