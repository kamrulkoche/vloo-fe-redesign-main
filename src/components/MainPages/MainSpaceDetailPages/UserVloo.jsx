import React from 'react'

export const UserVloo = () => {
    return (
        <div>
            <h2 className='text-xl md:text-[48px] font-bold text-center mt-8'>Hear from more <span className='text-[#0091B6]'>VLOO</span> user</h2>
            <p className='text-[#757575] font-normal text-lg md:text-2xl text-center mt-4'>We always value our user feedback</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
                <div className='bg-[#0091B6] rounded-2xl p-8'>
                    <h2 className='text-xl font-bold text-white '>VLOO is the best. I prefer to work on their shared workspaces, much reliable!</h2>
                </div>
                <div className='bg-[#0091B6] rounded-2xl p-8'>
                    <h2 className='text-xl font-bold text-white '>VLOO is the best. I prefer to work on their shared workspaces, much reliable!</h2>
                </div>
                <div className='bg-[#0091B6] rounded-2xl p-8'>
                    <h2 className='text-xl font-bold text-white '>VLOO is the best. I prefer to work on their shared workspaces, much reliable!</h2>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
                <div className='bg-[#0091B6] rounded-3xl p-2 mt-4 flex items-center gap-4'>
                    <div>
                        <img src="/assets/icons/avatar.svg" alt="" className='w-12 h-12' />
                    </div>
                    <div className='grid text-white'>
                        <h2 className='text-[18px] font-bold'>Lue Vincent</h2>
                        <p>CEO, ABCD Inc.</p>
                    </div>
                </div>
                <div className='bg-[#0091B6] rounded-3xl p-2 mt-4 flex items-center gap-4'>
                    <div>
                        <img src="/assets/icons/avatar.svg" alt="" className='w-12 h-12' />
                    </div>
                    <div className='grid text-white'>
                        <h2 className='text-[18px] font-bold'>Lue Vincent</h2>
                        <p>CEO, ABCD Inc.</p>
                    </div>
                </div>
                <div className='bg-[#0091B6] rounded-3xl p-2 mt-4 flex items-center gap-4'>
                    <div>
                        <img src="/assets/icons/avatar.svg" alt="" className='w-12 h-12' />
                    </div>
                    <div className='grid text-white'>
                        <h2 className='text-[18px] font-bold'>Lue Vincent</h2>
                        <p>CEO, ABCD Inc.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
