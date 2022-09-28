/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useMediaQuery } from 'usehooks-ts'
import { getNavigations } from '../services'
import {WhatsApp, SocialMedia} from './'

const Header = () => {
  const router = useRouter()
  const [nav, setNav] = useState([])
  const [dark, setDark] = useState(
    useMediaQuery('(prefers-color-scheme: dark)')
  )
  useEffect(() => {
    getNavigations('primary').then((res) => {
      setNav(res[0].pages)
    })
  }, [dark])

  return (
    <header>
      <Popover>
        <div className="fixed w-full top-0 z-10 drop-shadow-lg bg-slate-50 dark:text-gray-300 dark:bg-gray-900">

          <div className="mx-auto px-0 py-0 sm:py-4 md:pt-5 md:pb-5">
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                  <a className="flex items-center py-1">
                    <span className="sr-only">MEDICUS Staufen Türkiye</span>
                    <Image
                      src={
                        !dark
                          ? '/asset/medicus.svg'
                          : '/asset/medicus-white.svg'
                      }
                      alt="Medicus"
                      width={154}
                      height={64}
                      quality={50}
                      loading="lazy"
                    />
                  </a>
                </Link>

                <div className="hidden md:block md:pr-4 md:space-x-6 nav">
                  {nav.map((item) => {
                    const isActive =
                      router.asPath.startsWith(`/${item.slug}`) ||
                      (router.asPath.startsWith('/blog') &&
                        item.slug === 'pano') ||
                      (router.asPath === '/' && item.slug === 'index')
                    return (
                      <Link
                        key={item.id}
                        href={`/${
                          item.slug === 'pano'
                            ? 'blog'
                            : item.slug === 'index'
                            ? ''
                            : item.slug
                        }`}
                      >
                        <a
                          title={item.title}
                          className={`font-medium relative ${
                            isActive
                              ? 'active font-semibold text-medicus hover:text-teal-900'
                              : 'font-medium text-gray-500 hover:text-gray-900'
                          } `}
                        >
                          {item.title}
                        </a>
                      </Link>
                    )
                  })}
                </div>

                <div className="flex items-center ">
                  <Link href="/basvur">
                    <a className="text-white bg-gradient-to-r from-medicus-3 to-medicus-4 hover:bg-medicus-4 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-300/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                      Başvur!
                    </a>
                  </Link>

                  <Popover.Button className="ring-1 ring-gray-300 md:hidden bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-300 dark:bg-gray-800">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </nav>
          </div>
          <div className="social">
          <hr className="mx-auto border-gray-200 sm:mx-auto dark:border-gray-700" />
            <div className="container items">
              <WhatsApp />
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-white ring-opacity-5 overflow-hidden dark:text-white dark:bg-gray-900">
              <div className="px-5 pt-4 flex items-center justify-between">
                <Link href="/">
                  <a style={{ outline: 'none', border: 'none' }}>
                    <Image
                      src={
                        !dark
                          ? '/asset/medicus.svg'
                          : '/asset/medicus-white.svg'
                      }
                      style={{ outline: 'none', border: 'none' }}
                      alt="Medicus"
                      width={100}
                      height={40}
                      quality={50}
                      loading="lazy"
                    />
                  </a>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-300 dark:bg-gray-800">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {nav.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${
                      item.slug === 'pano'
                        ? 'blog'
                        : item.slug === 'index'
                        ? '/'
                        : item.slug
                    }`}
                  >
                    <a>
                      <Popover.Button className="flex w-[100%] px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300">
                        {item.title}
                      </Popover.Button>
                    </a>
                  </Link>
                ))}
                <hr className="container mx-auto mb-8 my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="p-2">
                  <SocialMedia />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  )
}

export default Header
