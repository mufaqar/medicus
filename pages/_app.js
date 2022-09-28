import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics'
import Script from 'next/script'
import { GTM_ID, pageview } from '../util'
import '../styles/globals.scss'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
  // usePageViews()

  return (
    <>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="9c5f4647-aff9-47f0-b367-c5ca0e4cd458"
        data-blockingmode="auto"
        strategy="beforeInteractive"
      />
      <Script
        id="chatwerk"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var headHandler = document.querySelector('head');
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://cdn.chatwerk.de/1.0.0/chatwerk-loader.min.js.gz'; 
          script.onload = function () {
            var chatwerkLoaderConfig = {
               "inboxConfig": {
                 "organizationQuery": {
                   "id": "ZtbYjHmfxc"
                 },
                 "opened": true,
                 "language": "en",
                 "dictionaries": {
                    "en": {
                      "subTitle": "Messenger'ı açarak kişisel verilerimin (örn. e-posta adresi, telefon numarası) işlenmesine izin veriyorum. Daha fazla bilgi için: {https://turkiye.medicusstaufen.com/gizlilik-politikasi | Gizlilik Politikası}",
                      "title": "Medicus Staufen'e canlı desteğe hoş geldiniz?",
                      "welcomeMessage": "Merhaba, size yardımcı olabilir miyim?"
                    }
                 },
                 "theme": {
                   "circleIconBackground": "#2b83a0",
                   "headerBackgroundColor": "#2b83a0",
                   "intrudictionFieldBackgroundColor": "#2b83a0",
                   "intrudictionFieldFontColor": "#FFFFFF",
                   "welcomeMessageBackgroundColor": "#2b83a0",
                   "welcomeMessageTextColor": "#FFFFFF"
                 }
               }
             };
            chatwerkLoader.initialize(chatwerkLoaderConfig);
          };
          headHandler.appendChild(script);`
        }}
      />
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
        }}
      />
      {/* <GoogleAnalytics
        gaMeasurementId="G-JCB466PGLW"
        strategy="beforeInteractive"
      /> */}
      <Component {...pageProps} />
    </>
  )
}

export default App
