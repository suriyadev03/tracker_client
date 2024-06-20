import { useState, useEffect } from 'react'


const hasFocus = (): boolean =>  document.hasFocus()

const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(hasFocus)

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOnline(false)
    })
    window.addEventListener('online', () => {
      setIsOnline(true)
    })

    return () => {
      window.removeEventListener('offline', () => {
        setIsOnline(false)
      })
      window.removeEventListener('online', () => {
        setIsOnline(true)
      })
    }
  }, [])

  return isOnline
}

export { useOnlineStatus }
