import React from 'react'

export const ReviewsCart = () => {
    return (
        <div className='bg-white p-4 rounded-2xl mt-6'>
            <h2 className='text-[20px] font-medium leading-[34px]'>“Whenever they need to work close to home, work privately or meet with the rest of the team outside the office, we provide full flexibility.”</h2>
            <div className='mt-4 flex '>
                <div className='flex items-center gap-2 bg-[#0091B6] p-1.5 rounded-2xl pr-4'>
                    <img src="/assets/icons/review-img.svg" alt="" />
                    <p className='text-base font-normal text-white'>Andreas</p>
                </div>

                <ul className='flex gap-2 ml-4'>
                    <img src="/assets/icons/star-blue.svg" alt="" className='w-5' />
                    <img src="/assets/icons/star-blue.svg" alt="" className='w-5' />
                    <img src="/assets/icons/star-blue.svg" alt="" className='w-5' />
                    <img src="/assets/icons/star-blue.svg" alt="" className='w-5' />
                    <img src="/assets/icons/star-black.svg" alt="" className='w-5' />
                </ul>
            </div>
        </div>
    )
}
