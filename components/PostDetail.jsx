import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { CalendarIcon } from '@heroicons/react/outline'
import { grpahCMSImageLoader } from '../util'
import 'moment/locale/tr'

const PostDetail = ({ post }) => {
  moment.locale('tr')
  return (
    <div className="bg-white shadow-md rounded-md lg:p-8 pb-12 mb-8 overflow-hidden post-details">
      <div
        className="relative overflow-hidden mb-12 -mt-10"
        style={{ transform: 'skew(7deg, 4deg) scale(1.2)' }}
      >
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.title}
          src={post.featuredImage.url}
          className="object-top h-full w-full object-cover rounded-t-md lg:rounded-lg"
          height={600}
          width={1200}
          quality={50}
          loading="lazy"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
            <Link href="/biz-kimiz">
              <a className="inline-flex">
                <Image
                  alt={post.author.name}
                  height="30px"
                  width="30px"
                  className="align-middle rounded-full"
                  src={post.author.photo.url}
                  quality={50}
                  loading="lazy"
                />
                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                  {post.author.name}
                </p>
              </a>
            </Link>
          </div>
          <div className="flex row font-medium text-gray-700 text-sm items-center">
            <CalendarIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            <span className="align-middle">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold post">{post.title}</h1>
        <div className="post-content">
          <RichText content={post.content.raw} />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
