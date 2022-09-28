/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/outline'
import { grpahCMSImageLoader } from '../util'
import 'moment/locale/tr'

const FeaturedPostCard = ({ post }) => {
  moment.locale('tr')
  return (
    <div className="bg-white shadow-md rounded-md p-0 m-2 overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <a>
          <div className="relative pb-60">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post.title}
              title={post.title}
              className="object-top absolute h-60 w-full object-cover"
              src={post.featuredImage.url}
              layout="fill"
            />

            <svg
              viewBox="0 0 1440 320"
              className="absolute -bottom-0.5"
              style={{ transform: 'matrix(2, 0, 0, 1, 0, 0)' }}
            >
              <path fill="white" d="M0,96L1440,320L1440,320L0,320Z" />
            </svg>
          </div>
          <div className="p-4 pt-1">
            <h1 className="mb-4 text-l font-normal text-left">{`${post.title.substring(
              0,
              60
            )}...`}</h1>
            <div className="my-2 w-full">
              <div className="flex row font-medium text-gray-400 text-xs items-center">
                <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="align-middle">
                  {moment(post.createdAt).format('DD MMM YYYY')}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default FeaturedPostCard
