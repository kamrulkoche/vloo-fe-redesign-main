import React from 'react'
import Image from 'next/image'

export const WorkOfficeCart = ({ image,name }) => {
    return (
        <div className='mb-[54px]'>
            <div className=''>
                <Image
                    src={image}
                    width={90}
                    height={70}
                    alt="Picture of the author"
                />
            </div>
            <h2 className='font-medium text-[20px] text-white mt-3'>{name}</h2>
        </div>
    )
}
