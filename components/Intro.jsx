import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import Image from 'next/image'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import JobsCard from './JobsCard';

export default function Intro() {
  const [search, setSearch] = useState('');
  const jobData = useSelector(state => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([])
  const [doneSearch, setDoneSearch] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredJobs = jobData?.filter((job) => {
      let x = job?.job_category;
      return x?.toUpperCase() === search?.toUpperCase().trim();
    });
    setFilteredJobs(filteredJobs);
    setDoneSearch(true)
  }

  return (
    <>
      <div className='w-full h-full flex items-center lg:justify-start py-24 justify-center flex-wrap'>
        <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col'>
          <div className='bg-white flex-col mb-6 w-full md:px-4 py-4 flex sm:flex-row items-center justify-center rounded-lg'>
            {/* <BiSearchAlt onClick={handleSearch} className='text-2xl text-indigo-600 mx-2 hidden sm:flex' /> */}
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Jobs with Job categories like marketing ...' className='xs:w-full w-3/4 h-full px-2 bg-gray-200 text-base py-3 outline-none rounded-lg' />
            <button onClick={handleSearch} className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'>Search</button>
          </div>
          <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black'>To Choose <span className='text-indigo-600'>Right Jobs.</span> </h1>
          <p className='md:text-lg sm:text-sm text-xs mb-20 text-gray-500'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>

          <div className='w-full px-2 py-1 flex items-center justify-start flex-wrap'>
            <div className='flex items-center justify-center'>
              <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
              <h1 className='font-semibold text-lg'>Suggest Tag:</h1>
            </div>
            <div className='flex items-center justify-center px-4 flex-wrap'>
              <p className='px-2 text-gray-600'>Software</p>
              <p className='px-2 text-gray-600'>Marketing</p>
              <p className='px-2 text-gray-600'>UI/UX Design</p>
            </div>
          </div>
        </div>
        <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
          <Image width={600} height={700} src="/intro.png" alt="no-image-found" />
        </div>
      </div>
      {doneSearch && (
        <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
          {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
            <h1 className='text-3xl text-center font-bold mb-8'>Search Results</h1>,
            filterJobs?.map((job) => (
              <JobsCard job={job} key={job?._id} />
            ))
          ) : (
            <p className='text-sm text-center font-semibold text-red-500'>Sorry, no jobs in the selected category are available right now.</p>
          )}
        </div>
      )}

      {/* Service Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-8">Our Services</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4">
              <div className="bg-gray-200 p-8 rounded-xl shadow-lg h-full flex flex-col hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all">
                <div className="flex-shrink-0">
                  <img className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-xl" src="/jobsearch.jpg" alt="Service 1" />
                </div>
                <div className="flex-grow p-4">
                  <h3 className="text-xl font-semibold mb-2">Job Search</h3>
                  <p className="text-gray-600">Looking for your dream job? Our comprehensive job search functionality can help you find the perfect match. With advanced search filters and an extensive database of job listings, you'll have access to a wide range of opportunities. Take the next step in your career and let our job search tool guide you towards your professional goals.</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4">
              <div className="bg-gray-200 p-8 rounded-xl shadow-lg h-full flex flex-col hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all">
                <div className="flex-shrink-0">
                  <img className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-xl" src="/jobpost.jpg" alt="Service 2" />
                </div>
                <div className="flex-grow p-4">
                  <h3 className="text-xl font-semibold mb-2">Job Post</h3>
                  <p className="text-gray-600">Are you an employer looking to fill a vacancy? Our job posting service is here to help. With our platform, you can reach a large pool of qualified candidates and attract top talent. Create detailed job listings, set preferences, and receive notifications about potential matches. Post your job today and find the right candidate for your organization's success.</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4">
              <div className="bg-gray-200 p-8 rounded-xl shadow-lg h-full flex flex-col hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all">
                <div className="flex-shrink-0">
                  <img className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-xl" src="/apply.jpg" alt="Service 2" />
                </div>
                <div className="flex-grow p-4">
                  <h3 className="text-xl font-semibold mb-2">Job Apply</h3>
                  <p className="text-gray-600">We offer exceptional services tailored to meet your unique needs and exceed expectations. Our dedicated team is committed to delivering top-notch solutions that drive success and maximize your business potential. With our extensive expertise and client-centered approach, we are confident in our ability to add value and contribute to your organization's growth. Contact us today to explore how our services can benefit your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 ">
        <div className="container mx-auto text-center">
          <p  >Copyright&copy; 2023 Job Portal. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
