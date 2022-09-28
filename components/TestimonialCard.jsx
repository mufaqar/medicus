import React from 'react'
import Image from 'next/image'
import { grpahCMSImageLoader } from '../util'

const TestimonialCard = ({
  author,
  occupation,
  quote,
  photo,
  linkedin,
  school,
  v2
}) => {
  if (v2) {
    return (
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-white bg-gradient-to-r from-medicus-2 to-medicus-3 overflow-hidden relative z-1">
        <div className="relative pt-8 pb-8 md:pt-32 md:pb-32 content md:mr-10 ml-10 mr-4">
          <h2 className="font-semibold text-xl mb-4">{author}</h2>
          <p>{occupation}</p>
          <p className="opacity-90 dark:text-gray-300 text-m md:text-xl mb-2">
            {quote}
          </p>
        </div>
        <div className="relative skew-x-12 overflow-hidden -mr-12 image hidden md:block">
          <Image
            unoptimized
            loader={grpahCMSImageLoader}
            alt={author}
            title={author}
            className="-skew-x-12 scale-125 object-top absolute h-60 w-full object-cover"
            src={photo}
            layout="fill"
          />
        </div>
      </div>
    )
  }
  return (
    <div className="testimonial mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-white bg-gradient-to-r from-medicus-4 to-medicus-3 overflow-hidden relative z-1">
      <div className="hidden md:flex relative skew-x-12 overflow-hidden -ml-10 image">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={author}
          title={author}
          className="-skew-x-12 scale-125 object-top absolute h-60 w-full object-cover"
          src={photo}
          layout="fill"
        />
      </div>
      <div className="relative pt-16 pb-8 md:pt-32 md:pb-32 content md:mr-10 mr-4">
        <p className="opacity-90 dark:text-gray-300 text-m md:text-xl mb-8">
          {quote}
        </p>
        <p>{author}</p>
        <p>{occupation}</p>
        <p>{school}</p>
        <a
          href={linkedin}
          title={author}
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
        >
          <svg
            viewBox="0 0 455 455"
            xmlSpace="preserve"
            className="w-8 h-8 mt-2 fill-white"
          >
            <path d="M246.4 204.35v-.665c-.136.223-.324.446-.442.665h.442z" />
            <path d="M0 0v455h455V0H0zm141.522 378.002H74.016V174.906h67.506v203.096zm-33.753-230.816h-.446C84.678 147.186 70 131.585 70 112.085c0-19.928 15.107-35.087 38.211-35.087 23.109 0 37.31 15.159 37.752 35.087 0 19.5-14.643 35.101-38.194 35.101zM385 378.002h-67.524V269.345c0-27.291-9.756-45.92-34.195-45.92-18.664 0-29.755 12.543-34.641 24.693-1.776 4.34-2.24 10.373-2.24 16.459v113.426h-67.537s.905-184.043 0-203.096H246.4v28.779c8.973-13.807 24.986-33.547 60.856-33.547 44.437 0 77.744 29.02 77.744 91.398v116.465z" />
          </svg>
        </a>
      </div>
      <div className="flex md:hidden overflow-hidden -mt-8 skew-y-4">
        <img src={photo} alt={author} title={author} className=" -mb-8" />
        <svg
          viewBox="0 0 1440 320"
          className="absolute -bottom-0.5"
          style={{ transform: 'matrix(2, 0, 0, 1, 0, 0)' }}
        >
          <path fill="#f6f9fc" d="M0,96L1440,320L1440,320L0,320Z" />
        </svg>
      </div>
    </div>
  )
}

export default TestimonialCard
