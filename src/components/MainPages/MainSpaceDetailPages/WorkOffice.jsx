import React from 'react'
import { WorkOfficeCart } from './WorkOfficeCart'

export const WorkOffice = () => {
  return (
    <div className="mt-6 flex flex-col lg:flex-row items-center lg:items-start gap-6">
      {/* Left Box */}
      <div className="bg-[#006988] pt-[52px] px-6 rounded-2xl w-full sm:w-[526px]">
        <h2 className="text-2xl font-bold text-white text-start">
          Come, Work at our office
        </h2>
        <div className="mt-[22px] grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          <WorkOfficeCart image="/assets/icons/freeCoffee.svg" name="Free Coffee" />
          <WorkOfficeCart image="/assets/icons/café.svg" name="Café" />
          <WorkOfficeCart image="/assets/icons/sharedLounge.svg" name="Shared lounge" />
          <WorkOfficeCart image="/assets/icons/freeSnacks.svg" name="Free Snacks" />
          <WorkOfficeCart image="/assets/icons/reception.svg" name="Reception" />
          <WorkOfficeCart image="/assets/icons/phoneBooths.svg" name="Phone booths" />
        </div>
      </div>

      {/* Map */}
      <div className="relative w-[400px] sm:w-[400px] h-[300px] sm:h-[400px]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-3xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091543!2d144.95373531531686!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57768f9a8693e8a!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1715322217601!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Office Location"
        />
      </div>
    </div>
  )
}
