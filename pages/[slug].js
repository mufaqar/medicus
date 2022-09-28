import React from 'react'
import { useRouter } from 'next/router'
import {
  PageDetail,
  Loader,
  Hero,
  Team,
  ApplicationForm,
  Layout
} from '../components'
import { getPages, getPageDetails } from '../services'
import { FeaturedFaq } from '../sections/index'

const PageDetails = ({ page }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <Layout
      title={page.title}
      description={page?.excerpt}
      seoTitle={page?.seoTitle}
      seoDescription={page?.seoDescription}
      image={page.featuredImage.url}
      socialPhoto={page?.socialPhoto?.url}
    >
      <section className="mb-32">
        {page.slug !== 'basvur' && <Hero data={page} />}
        <div className="container mx-auto my-8 md:my-16">
          {page.slug === 'basvur' ? (
            <ApplicationForm />
          ) : (
            <PageDetail page={page} />
          )}
          {page.slug === 'faq' && <FeaturedFaq />}
          {page.slug === 'biz-kimiz' && <Team />}
        </div>
      </section>
    </Layout>
  )
}
export default PageDetails

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPageDetails(params.slug)
  return {
    props: {
      page: data
    },
    revalidate: 60 * 5
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const pages = await getPages()

    return {
      paths: pages.map(({ node: { slug } }) => ({ params: { slug } })),
      fallback: false
    }
  } catch (error) {
    console.log('error', error.message)
    return {
      notFound: true
    }
  }
}
