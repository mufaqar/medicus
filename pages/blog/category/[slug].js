import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getCategories, getCategoryPost } from '../../../services'
import { PostCard, Categories, Loader, Layout } from '../../../components'

const CategoryPost = ({ posts, params }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <Layout
      title="Medicus - Kategoriler"
    >
      <div className="container mx-auto mb-32 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-9 col-span-1 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-3 col-span-1 fadeinup">
            <div className="lg:sticky relative top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CategoryPost

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug)

  return {
    props: { posts },
    revalidate: 60 * 5
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true
  }
}
