import React, { useState, useEffect } from 'react'

const Cookie = () => {
  const [active, setActive] = useState(false)

  const buttonText = 'Tamam'
  const content =
    'Sitemizde bilgi toplumu hizmetlerinin sunulması amacıyla çerez kullanılmaktadır. Aydınlatma metnine erişmek için <a href="cerez-politikasi">“Çerez Politikası”</a> sayfamızı ziyaret edebilirsiniz.'
  useEffect(() => {
    const data = localStorage.getItem('legalWarning') === 'true'
    if (!data) {
      setActive(true)
    }
  }, [active])

  const setLegalWarning = () => {
    localStorage.setItem('legalWarning', 'true')
    setActive(false)
  }
  if (active) {
    return (
      <div className="cookie">
        <p
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />

        <button onClick={() => setLegalWarning()}>{buttonText}</button>
      </div>
    )
  }
  return null
}

export default Cookie
