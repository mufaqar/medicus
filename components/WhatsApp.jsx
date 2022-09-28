import React from 'react'

const WhatsApp = () => (
  <div className="flex space-x-6 sm:justify-center">

    <a
      href="https://api.whatsapp.com/send?phone=4971616270552"
      target="_blank"
      rel="noreferrer"
      className="text-gray-500 hover:text-gray-900 dark:hover:text-white inline-flex"
    >
            <p className="text-sm mr-2">Yardıma ihtiyacınız mı var?</p>
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 58 58"
        aria-hidden="true"
      >
        <path d="m0 58 4.988-14.963A28.35 28.35 0 0 1 1 28.5C1 12.76 13.76 0 29.5 0S58 12.76 58 28.5 45.24 57 29.5 57a28.373 28.373 0 0 1-13.26-3.273L0 58z" />
        <path
          fill="white"
          d="M47.683 37.985c-1.316-2.487-6.169-5.331-6.169-5.331-1.098-.626-2.423-.696-3.049.42 0 0-1.577 1.891-1.978 2.163-1.832 1.241-3.529 1.193-5.242-.52l-3.981-3.981-3.981-3.981c-1.713-1.713-1.761-3.41-.52-5.242.272-.401 2.163-1.978 2.163-1.978 1.116-.627 1.046-1.951.42-3.049 0 0-2.844-4.853-5.331-6.169a2.726 2.726 0 0 0-3.203.482l-1.758 1.758c-5.577 5.577-2.831 11.873 2.746 17.45l5.097 5.097 5.097 5.097c5.577 5.577 11.873 8.323 17.45 2.746l1.758-1.758a2.728 2.728 0 0 0 .481-3.204z"
        />
      </svg>
    </a>
  </div>
)

export default WhatsApp
