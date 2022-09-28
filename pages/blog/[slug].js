import React from 'react'
import { useRouter } from 'next/router'
import {
  PostDetail,
  Categories,
  PostWidget,
  Loader,
  Layout
} from '../../components'
import { getPosts, getPostDetails } from '../../services'
import { AdjacentPosts } from '../../sections'

const PostDetails = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <Layout
      title={post.title}
      description={post?.excerpt}
      seoTitle={post?.seoTitle}
      seoDescription={post?.seoDescription}
      image={post?.featuredImage.url}
      socialPhoto={post?.socialPhoto?.url}
    >
      <div className="container mx-auto mb-32 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="col-span-1 lg:col-span-9">
            <PostDetail post={post} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="relative lg:sticky top-8">
              <Categories />
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default PostDetails

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post: data
    },
    revalidate: 60 * 5
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true
  }
}
