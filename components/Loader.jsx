import React from 'react'

const Loader = () => (
  <div className="text-center">
    <button
      type="button"
      // eslint-disable-next-line max-len
      className="inline-flex items-center my-12 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100/50 hover:bg-indigo-200 md:text-lg transition ease-in-out duration-150 cursor-not-allowed"
      disabled=""
    >
      <svg
        className="animate-spin h-8 w-8 text-indigo-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </button>
  </div>
)

export default Loader
