import Head from 'next/head'
import { PostCard, Categories, PostWidget, Layout } from '../../components'
import { getPosts, getPageDetails } from '../../services'

const Blog = ({ posts, page }) => (
  <Layout
    title="Medicus - Blog"
    description={page?.excerpt}
    seoTitle={page?.seoTitle}
    seoDescription={page?.seoDescription}
    image={page.featuredImage.url}
    socialPhoto={page?.socialPhoto?.url}
  >
    <div className="container mx-auto mb-32 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-9 col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-3 col-span-1 fadeinup">
          <div className="lg:sticky relative top-8">
            <Categories />
            <PostWidget />
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default Blog

// Fetch data at build time
export async function getStaticProps() {
  const data = await getPageDetails('pano')
  const posts = (await getPosts()) || []
  return {
    props: { posts, page: data },
    revalidate: 60 * 5
  }
}
