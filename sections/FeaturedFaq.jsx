/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getGrids } from '../services'
import { FaqCard } from '../components'

const FeaturedFaq = ({ featured }) => {
  const [faq, setFaq] = useState([])
  const [title, setTitle] = useState(null)
  const [subtitle, setSubitle] = useState(null)

  useEffect(() => {
    getGrids('faq-grid').then((res) => {
      setFaq(res[0].columns)
      setTitle(res[0].title)
      setSubitle(res[0].subtitle)
    })
  }, [])

  if (featured) {
    return (
      <section className="container mx-auto">
        {subtitle && (
          <h3 className="font-semibold text-sm text-white">{subtitle}</h3>
        )}
        {title && (
          <h2 className="mb-8 font-light text-2xl text-white">{title}</h2>
        )}
        <FaqCard faq={faq.filter((f) => f.featuredQuestion)} />
        <Link href="/faq">
          <a className="inline-flex px-4 py-2 text-md border text-white  rounded-md shadow-sm mt-4">
            Tüm Sorular
          </a>
        </Link>
      </section>
    )
  }

  return <FaqCard faq={faq} />
}

export default FeaturedFaq
