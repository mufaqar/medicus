/* eslint-disable max-len */
import Head from 'next/head'
import { FeaturedPosts, FeaturedFaq } from '../sections/index'
import TestimonialCard from '../components/TestimonialCard'
import { HeroHome, HowCard, WhyCard, Layout } from '../components'
import { getPageDetails, getGrids, getTestimonials } from '../services'

const Home = ({ page, how, why, testimonials }) => (
  <Layout
    title="Medicus Staufen Türkiye"
    description={page?.excerpt}
    seoTitle={page?.seoTitle}
    seoDescription={page?.seoDescription}
    image={page.featuredImage.url}
    socialPhoto={page?.socialPhoto?.url}
  >
    <HeroHome data={page} />
    <section className="bg-white relative skew">
      <div className="container mx-auto pt-8 pb-16 md:pt-24 md:pb-20 text-center relative z-1 dark:text-gray-300 dark:bg-gray-800">
        {why[0].title && (
          <h2 className="font-light text-2xl">{why[0].title}</h2>
        )}
        {why[0].subtitle && (
          <h3 className="font-semibold text-lg mb-16">{why[0].subtitle}</h3>
        )}
        <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 nasil">
          {why[0].columns.map((i) => (
            <WhyCard
              key={i.id}
              content={i.content}
              title={i.title}
              image={i.image.url}
            />
          ))}
        </div>
      </div>
      <TestimonialCard
        photo={testimonials[2].photo.url}
        author={testimonials[2].author}
        quote={testimonials[2].quote}
        occupation={testimonials[2].occupation}
        v2
      />
      <div className="container mx-auto pt-8 pb-16 md:pt-24 md:pb-20  text-center relative dark:text-gray-300 dark:bg-gray-800">
        {how[0].title && (
          <h2 className="font-light text-2xl">{how[0].title}</h2>
        )}
        {how[0].subtitle && (
          <h3 className="font-semibold text-lg mb-16">{how[0].subtitle}</h3>
        )}
        <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 nasil">
          {how[0].columns.map((i, index) => (
            <HowCard
              key={i.id}
              step={index + 1}
              content={i.content}
              title={i.title}
              image={i.image.url}
            />
          ))}
        </div>
      </div>
    </section>
    <TestimonialCard
      photo={testimonials[0].photo.url}
      author={testimonials[0].author}
      quote={testimonials[0].quote}
      occupation={testimonials[0].occupation}
      linkedin={testimonials[0].linkedin}
      school={testimonials[0].school}
    />
    <div className="mx-auto pt-16 pb-16 md:pt-28 md:pb-16 relative skew-2">
      <FeaturedPosts />
    </div>
    <div className="mx-auto pt-20 pb-24 md:pt-28 md:pb-24 relative z-0 text-center bg-gradient-to-r from-blue-900 via-medicus to-blue-300">
      <FeaturedFaq featured />
    </div>
  </Layout>
)

export default Home

// Fetch data at build time
export async function getStaticProps() {
  const data = await getPageDetails('anasayfa')
  const how = await getGrids('how')
  const why = await getGrids('why')
  const testimonials = await getTestimonials()

  return {
    props: {
      page: data,
      how,
      why,
      testimonials
    },
    revalidate: 60 * 5
  }
}
