import React from 'react'
import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

const Layout = ({
  children,
  title,
  description,
  seoDescription,
  seoTitle,
  image,
  socialPhoto
}) => (
  <>
    <Head>
      <title>{seoTitle ? seoTitle : title}</title>
      <meta property="og:title" content={seoTitle ? seoTitle : title} />
      <meta charSet="utf-8" />
      {description && (
        <>
          <meta
            name="description"
            content={seoDescription ? seoDescription : description}
          />
          <meta
            property="og:description"
            content={seoDescription ? seoDescription : description}
          />
        </>
      )}
      {(image || socialPhoto) && (
        <>
          <meta
            property="og:image"
            content={socialPhoto ? socialPhoto : image}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
    </Head>
    <div className="pt-[90px] md:pt-[110px] layout">
      <Header />
      {children}
      <Footer />
    </div>
  </>
)

export default Layout
