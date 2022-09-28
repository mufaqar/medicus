import Link from 'next/link'
import React from 'react'
import { Layout } from '../components'

export default function Custom404() {
  return (
    <Layout
      title="500 - Server Error"
      description='Üzgünüz, ancak istediğiniz sayfa bulunamadı.'
    >
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Server Error</h3>
          <h1>
            <span>5</span>
            <span>0</span>
            <span>0</span>
          </h1>
        </div>
        <h2>Üzgünüz, ancak istediğiniz sayfa bulunamadı.</h2>
        <Link passHref href="/">
          Ana sayfaya dön
        </Link>
      </div>
    </Layout>
  )
}
