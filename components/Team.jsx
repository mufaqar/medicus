/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getGrids } from '../services'
import { grpahCMSImageLoader, getContentFragment } from '../util'

const Team = () => {
  const [data, setData] = useState([])
  const [title, setTitle] = useState(null)
  const [subtitle, setSubitle] = useState(null)
  const [more, setMore] = useState(false)

  useEffect(() => {
    getGrids('ekibimiz').then((res) => {
      setData(res[0].columns)
      setTitle(res[0].title)
      setSubitle(res[0].subtitle)
    })
  }, [])

  return (
    <section className="-mt-20 text-gray-900 dark:text-gray-300">
      {title && <h2 className="font-light text-2xl">{title}</h2>}
      {subtitle && <h3 className="font-semibold text-lg">{subtitle}</h3>}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((i) => (
          <div key={i.id} className="fadeinup flex flex-col items-center team">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={i.name}
              title={i.name}
              src={i.photo.url}
              width={165}
              height={180}
              quality={50}
              loading="lazy"
            />
            <div
              className={`z-0 relative flex flex-col justify-between p-4 pb-0 leading-normal bg-white rounded-lg shadow-sm pt-28 -mt-20 text-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${
                more ? ' max-h-full' : ' max-h-[400px]'
              }`}
            >
              <div className="team-member">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {i.name}
                </h5>
                <p className="ml-2 tracking-tight text-gray-900 dark:text-white">
                {i.position}
                </p>
              </div>

              <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {i.bio.raw.children.map((typeObj, index) => {
                  const children = typeObj.children.map((item, itemindex) =>
                    getContentFragment(itemindex, item.text, item)
                  )

                  return getContentFragment(
                    index,
                    children,
                    typeObj,
                    typeObj.type
                  )
                })}
              </div>
              {!more && (
                <div className="moreButton">
                  <button
                    type="button"
                    onClick={() => setMore(() => !more)}
                    className="text-white bg-gradient-to-r from-blue-500 to-medicus hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                  >
                    Daha fazlasını göster
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team
