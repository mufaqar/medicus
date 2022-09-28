import Link from 'next/link'
import React from 'react'
import { Layout } from '../components'

export default function Custom404() {
  return (
    <Layout
      title="404 - Sayfa bulunamadi"
      description="Üzgünüz, ancak istediğiniz sayfa bulunamadı."
    >
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Sayfa bulunamadi</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
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
