import React from 'react'
import { ReviewsCart } from './ReviewsCart'

export const Reviews = () => {
    return (
        <div className='mt-8 lg:mx-0 bg-[#E0F7FA] rounded-3xl p-8'>
            <div className='flex justify-between'>
                <h2 className='text-xl font-semibold ml-1'>Reviews</h2>
                <button className='text-black text-base font-medium items-center border border-[#006988] px-2 py-1.5 rounded-2xl'>View all</button>
            </div>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <ReviewsCart />
                <ReviewsCart />
                <ReviewsCart />
            </div>
        </div>
    )
}
