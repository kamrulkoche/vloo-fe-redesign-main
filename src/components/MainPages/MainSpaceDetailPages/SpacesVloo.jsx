"use client"
import { MapPin } from 'lucide-react';
import { useState } from 'react';

const SpacesVloo = () => {
    const spaces = [
        {
            id: 1,
            image: '/assets/images/carousel-img1.png',
            city: 'Oslo',
            title: '2 BHK Office',
            rating: 5,
            address: '2958 east near phynix Mall, Oslo'
        },
        {
            id: 2,
            image: '/assets/images/carousel-img2.png',
            city: 'Oslo',
            title: '2 BHK Office',
            rating: 5,
            address: '2958 east near phynix Mall, Oslo'
        },
        {
            id: 3,
            image: '/assets/images/space-3.jpg',
            city: 'Oslo',
            title: '2 BHK Office',
            rating: 5,
            address: '2958 east near phynix Mall, Oslo'
        },
        {
            id: 4,
            image: '/assets/images/space-2.jpg',
            city: 'Oslo',
            title: '2 BHK Office',
            rating: 5,
            address: '2958 east near phynix Mall, Oslo'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 2 < 0 ? spaces.length - 2 : prevIndex - 2
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 2) % spaces.length
        );
    };

    return (
        <div className="bg-white p-8 rounded-3xl mt-8">
            <h2 className="text-xl md:text-[48px] font-bold text-[#0B2A3B] text-center">
                See the top <span className="text-[#0091B6]">Spaces</span>here at VLOO
            </h2>
            <p className="text-center text-[#757575] mb-6 font-normal text-lg md:text-[24px]">See the space that are most recommended</p>
            <div className="flex items-center gap-4">
                <button className="w-10 md:w-16" onClick={handlePrev}>
                    <img src="/assets/icons/leftArrow.svg" alt="" className='w-full h-full' />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {spaces.slice(currentIndex, currentIndex + 2).map((space) => (
                        <div key={space.id} className="bg-white rounded-2xl overflow-hidden shadow-md relative">
                            <img src={space.image} alt={space.title} className="w-full h-72 md:h-96 object-cover" />
                            <div className="absolute top-3 left-2 flex items-center justify-between w-full px-4">
                                <span className="bg-[#071A2B] text-white px-6 py-1.5 rounded-full text-xs">
                                    {space.city}
                                </span>
                                <button className="text-gray-400 hover:text-red-500">
                                    <img src="/assets/icons/white-hart.svg" alt="" className='h-6' />
                                </button>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className="p-4">
                                    <div className='flex items-center gap-2'>
                                        <h3 className="text-lg font-semibold">{space.title}</h3>
                                        <ul className='flex gap-2'>
                                            <li><img src="/assets/icons/star-blue.svg" alt="" className='h-5 w-5' /></li>
                                            <li><img src="/assets/icons/star-blue.svg" alt="" className='h-5 w-5' /></li>
                                            <li><img src="/assets/icons/star-blue.svg" alt="" className='h-5 w-5' /></li>
                                            <li><img src="/assets/icons/star-blue.svg" alt="" className='h-5 w-5' /></li>
                                            <li><img src="/assets/icons/star-black.svg" alt="" className='h-5 w-5' /></li>
                                        </ul>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                                        <MapPin size={16} className="mr-1" />
                                        {space.address}
                                    </p>
                                </div>
                                <button className="h-10 px-6 md:px-10 bg-[#006988] text-white py-2 rounded-lg mr-4">
                                    Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-10 md:w-16" onClick={handleNext}>
                    <img src="/assets/icons/rightArrow.svg" alt="" className='w-full h-full' />
                </button>
            </div>
        </div>
    );
};

export default SpacesVloo;
