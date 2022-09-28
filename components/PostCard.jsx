/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/outline'
import { grpahCMSImageLoader } from '../util'
import 'moment/locale/tr'

const PostCard = ({ post }) => {
  moment.locale('tr')
  const [color] = useState(
    post.categories[0].slug === 'almanya'
      ? 'absolute z-10 right-2 top-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded'
      : post.categories[0].slug === 'kariyer'
      ? 'absolute z-10 right-2 top-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded'
      : 'absolute z-10 right-2 top-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded'
  )

  return (
    <div className="bg-white shadow-md rounded-md p-0 fadeinup overflow-hidden">
      <div className="relative">
        <span
          className={`absolute z-10 right-2 top-2 bg-${color}-100 text-${color}-800 text-xs font-semibold px-2.5 py-0.5 rounded`}
        >
          {post.categories[0].name}
        </span>
        <Link href={`/blog/${post.slug}`}>
          <a>
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post.title}
              title={post.title}
              className="object-top absolute w-full object-cover"
              src={post.featuredImage.url}
              width={640}
              height={480}
              quality={20}
              loading="lazy"
            />
          </a>
        </Link>
        <svg
          viewBox="0 0 1440 320"
          className="absolute -bottom-0.5"
          style={{ transform: 'matrix(2, 0, 0, 1, 0, 0)' }}
        >
          <path fill="white" d="M0,96L1440,320L1440,320L0,320Z" />
        </svg>
      </div>
      <div className="p-4 pt-1">
        <h1 className="mb-4 text-xl font-semibold">{post.title}</h1>
        <p className="text-m text-gray-700 font-normal">{post.excerpt}</p>
        <div className="my-2 w-full">
          <div className="flex row font-medium text-gray-400 text-xs items-center">
            <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="align-middle">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </span>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <a className="block mt-4 text-medicus text-m font-medium cursor-pointer text-l font-semibold">
            Okumaya devam et
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
