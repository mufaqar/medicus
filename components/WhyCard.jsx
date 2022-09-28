/* eslint-disable max-len */
import React from 'react'
import Image from 'next/image'
import { grpahCMSImageLoader } from '../util'

const WhyCard = ({ title, content, image }) => (
  <div className="why">
    <div className="img relative overflow-hidden">
    <svg
        viewBox="0 0 1440 320"
        className="absolute -top-1 left-0"
        style={{ transform: 'matrix(2, 0, 0, -1, 0, 0)' }}
      >
        <path fill="white" d="M0,96L1440,320L1440,320L0,320Z" />
      </svg>
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={title}
        height="300px"
        width="400px"
        className="w-full object-cover"
        src={image}
        quality={50}
        loading="lazy"
      />
      {/* <svg
        viewBox="0 0 1440 320"
        className="absolute -bottom-0.5 left-0"
        style={{ transform: 'matrix(2, 0, 0, 1, 0, 0)' }}
      >
        <path fill="white" d="M0,96L1440,320L1440,320L0,320Z" />
      </svg> */}
    </div>
    <h2 className="font-semibold text-xl text-center text-medicus my-6 dark:text-white text-left">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300">{content}</p>
  </div>
)

export default WhyCard
