import React, { useState } from 'react';

export const IncWorks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#E0F7FA] p-[30px] rounded-[35px] sm:w-[306px]  border border-[#B4E6EA]">
      <div className="flex">
        <h2 className="text-2xl font-semibold">INC. Works</h2>
        <ul className="flex gap-2 ml-4">
          <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
          <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
          <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
          <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
          <img src="/assets/icons/star-black.svg" alt="" className="w-5" />
        </ul>
      </div>
      <h2 className="text-base font-medium mt-2">115 W 30th St, Partial 10th floor</h2>
      <p className="text-[#FFFFFF] bg-[#0091B6] px-6 py-2 rounded-2xl w-20 mt-4">Oslo</p>
      <h2 className="mt-12 font-semibold text-lg">Want to book this office space?</h2>
      <button
        onClick={handleBookingClick}
        className="mt-4 font-semibold text-lg bg-[#006988] py-2.5 px-6 text-white rounded-2xl"
      >
        Booking calendar
      </button>

      {/* Modal - Exact replica of the image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-6 bg-[#E0F7FA] p-6 mt-4">
              <h3 className="text-2xl font-bold">March</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Calendar Table */}
            <table className="w-full mb-6 border-separate border-spacing-2">
              <thead>
                <tr className='text-[#071A2B]'>
                  <th className="py-2 text-base font-medium">Su</th>
                  <th className="py-2 text-base font-medium">Mo</th>
                  <th className="py-2 text-base font-medium">Tu</th>
                  <th className="py-2 text-base font-medium">We</th>
                  <th className="py-2 text-base font-medium">Th</th>
                  <th className="py-2 text-base font-medium">Fr</th>
                  <th className="py-2 text-base font-medium">Sa</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-3 border border-gray-300 rounded">2</td>
                  <td className="py-3 border border-gray-300 rounded">3</td>
                  <td className="py-3 border border-gray-300 rounded">4</td>
                  <td className="py-3 border border-gray-300 rounded">5</td>
                  <td className="py-3 border border-gray-300 rounded">6</td>
                  <td className="py-3 border border-gray-300 rounded">7</td>
                  <td className="py-3 border border-gray-300 rounded">8</td>
                </tr>
                <tr>
                  <td className="py-3  border border-gray-300 rounded">9</td>
                  <td className="py-3  border border-gray-300 rounded ">10</td>
                  <td className="py-3  border border-gray-300 rounded ">11</td>
                  <td className="py-3  border border-gray-300 rounded ">12</td>
                  <td className="py-3  border border-gray-300 rounded ">13</td>
                  <td className="py-3  border border-gray-300 rounded ">14</td>
                  <td className="py-3  border border-gray-300 rounded ">15</td>
                </tr>
                <tr>
                  <td className="py-3 border border-gray-300 rounded">16</td>
                  <td className="py-3 border border-gray-300 rounded">17</td>
                  <td className="py-3 border border-gray-300 rounded">18</td>
                  <td className="py-3 border border-gray-300 rounded">19</td>
                  <td className="py-3 border border-gray-300 rounded">20</td>
                  <td className="py-3 border border-gray-300 rounded">21</td>
                  <td className="py-3 border border-gray-300 rounded">22</td>
                </tr>
                <tr>
                  <td className="py-3 border border-gray-300 rounded">23</td>
                  <td className="py-3 border border-gray-300 rounded">24</td>
                  <td className="py-3 border border-gray-300 rounded">25</td>
                  <td className="py-3 border border-gray-300 rounded">26</td>
                  <td className="py-3 border border-gray-300 rounded">27</td>
                  <td className="py-3 border border-gray-300 rounded">28</td>
                  <td className="py-3 border border-gray-300 rounded">29</td>
                </tr>
                <tr>
                  <td className="py-3 border border-gray-300 rounded">30</td>
                  <td className="py-3 border border-gray-300 rounded">31</td>
                  <td className="py-3 border border-gray-300 rounded">1</td>
                  <td className="py-3 border border-gray-300 rounded">2</td>
                  <td className="py-3 border border-gray-300 rounded">3</td>
                  <td className="py-3 border border-gray-300 rounded">4</td>
                  <td className="py-3 border border-gray-300 rounded">5</td>
                </tr>
              </tbody>
            </table>

            {/* Date Range */}
            <div className="mb-6 flex justify-between mx-8">
              <p className="text-sm font-medium">Start &gt; 9 March</p>
              <p className="text-sm font-medium">End &gt; 15 March</p>
            </div>

            {/* People Section */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">People</h4>
              <p className="text-sm mb-2">Space Name</p>
              <button className="bg-[#006988] text-white px-4 py-1.5 rounded-lg text-sm font-medium">
                Book
              </button>
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncWorks;