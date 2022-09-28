import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import 'moment/locale/tr'

const AdjacentPostCard = ({ post, position }) => {
  moment.locale('tr')
  return (
    <>
      <div
        className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
      />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white text-shadow font-semibold text-xs">
          {moment(post.createdAt).format('DD MMM YYYY')}
        </p>
        <p className="text-white text-shadow font-semibold text-2xl text-center">
          {post.title}
        </p>
      </div>
      <Link href={`/blog/${post.slug}`} passHref>
        <span className="z-10 cursor-pointer absolute w-full h-full" />
      </Link>
      {position === 'LEFT' && (
        <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-medicus left-4 rounded-full flex justify-center">
          <ArrowLeftIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      )}
      {position === 'RIGHT' && (
        <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-medicus right-4 rounded-full flex justify-center">
          <ArrowRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      )}
    </>
  )
}

export default AdjacentPostCard
