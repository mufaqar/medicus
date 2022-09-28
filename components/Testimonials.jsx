import React, { useState, useEffect } from 'react'
import { getTestimonials } from '../services'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    getTestimonials().then((res) => {
      setTestimonials(res)
    })
  }, [])

  return (
    <div className="bg-white shadow-md rounded-md p-6 pb-12 mb-8">
      <h3 className="text-md mb-8 font-semibold border-b pb-4 text-medicus">
        Referanslarimiz
      </h3>

      {testimonials.map((item) => (
        <TestimonialCard
          key={item.photo.url}
          photo={item.photo.url}
          author={item.author}
          quote={item.quote}
          occupation={item.occupation}
        />
      ))}
    </div>
  )
}

export default Testimonials
