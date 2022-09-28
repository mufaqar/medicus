/* eslint-disable max-len */
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { RichText } from '@graphcms/rich-text-react-renderer'

const FaqCard = ({ faq }) => (
  <div className="mx-auto max-w-3xl w-full faq">
    {faq.map((f) => (
      <Disclosure key={f.id}>
        {({ open }) => (
          <>
            <Disclosure.Button className="fadeinup relative shadow-md z-1 mb-2 flex w-full justify-between rounded-md p-4 text-left text-m sm:text-lg font-medium bg-white text-medicus hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-75">
              <span>{f.title}</span>
              <ChevronUpIcon
                className={`${
                  open ? '' : 'rotate-180 transform'
                } h-7 w-7 text-medicus`}
              />
            </Disclosure.Button>

            <Disclosure.Panel className="relative z-2 rounded-md shadow-md mb-2 -mt-4 px-4 pt-2 pb-2 text-md text-gray bg-white text-left post-content">
              <RichText content={f.answer.raw.children} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </div>
)

export default FaqCard
