import React from 'react'
import Image from 'next/image'

const Hero = ({ data }) => {
  return (
    <div className="fadeinup relative bg-white overflow-hidden z-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto relative z-2">
        <div className="relative z-10 bg-white sm:pb-4 md:pb-6 lg:max-w-[50%] lg:w-full lg:pb-20 hero dark:bg-gray-800 dark:border-gray-700">
          <main className="py-10 mx-auto max-w-7xl sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-medicus-2 sm:text-5xl md:text-6xl dark:text-white">
                <span className="block xl:inline">{data.title}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg lg:pr-10 sm:mx-auto md:mt-5 md:text-xl lg:mx-0 dark:text-gray-400">
                {data.excerpt}
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:top-0 lg:w-2/3 xl:w-1/2 -mb-8">
        <Image
          src={data.featuredImage.url}
          alt={data.title}
          className="fadeinup h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full lg:min-h-xl"
          width={1920}
          height={1280}
          quality={30}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default Hero
