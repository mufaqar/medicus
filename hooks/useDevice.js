import { useEffect, useState } from 'react'

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const smellLikeMobile = typeof window.orientation !== 'undefined'
    setIsMobile(smellLikeMobile)
  }, [])

  return {
    isMobile
  }
}
