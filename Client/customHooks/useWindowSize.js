import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
    const isSSR = typeof window !== 'undefined'

    const [windowSize, setWindowSize] = useState({
        width: isSSR ? window.innerWidth : 1200,
        height: isSSR ? window.innerHeight : 800,
    })

    const changeWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    useEffect(() => {
        window.addEventListener('resize', changeWindowSize)

        return () => {
            window.removeEventListener('resize', changeWindowSize)
        }
    }, [])

    return windowSize
}

export default useWindowSize
