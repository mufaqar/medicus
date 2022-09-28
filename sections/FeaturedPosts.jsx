/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { FeaturedPostCard } from '../components'
import { getFeaturedPosts } from '../services'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1200, min: 768 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
}

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result)
      setDataLoaded(true)
    })
  }, [])

  const customLeftArrow = (
    <div className="absolute arrow-btn bottom-10 text-center py-3 cursor-pointer bg-medicus left-0 rounded-full flex justify-center">
      <ArrowLeftIcon className="h-6 w-6 text-white" aria-hidden="true" />
    </div>
  )

  const customRightArrow = (
    <div className="absolute arrow-btn bottom-10 text-center py-3 cursor-pointer bg-medicus right-0 rounded-full flex justify-center">
      <ArrowRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
    </div>
  )

  return (
    <section className="container mx-auto my-12 lg:my-16 text-center relative z-3">
      <h3 className="font-semibold text-sm text-medicus-2 dark:text-white">
        Medicus Blog
      </h3>
      <h2 className="mb-8 font-light text-2xl text-gray-300 dark:text-gray-300">
        Almanya ve Sağlık Sistemi Hakkında Daha Fazla Bilgi Edinin.
      </h2>
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))}
      </Carousel>
      <div className="z-4 relative">
        <Link href="/blog">
          <a className="inline-flex px-4 py-2 text-md border text-medicus-2 justify-center rounded-md shadow-sm mt-4 dark:text-gray-300">
            Tüm Yazılar
          </a>
        </Link>
      </div>
    </section>
  )
}

export default FeaturedPosts
