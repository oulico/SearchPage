'use client'

import {CacheProvider, ThemeProvider} from '@emotion/react'
import {useState} from 'react'
import createCache from '@emotion/cache'
import {useServerInsertedHTML} from 'next/navigation'

const theme = {
    colors: {
        primary: '#0070f3',
        secondary: '#ff4081',
    },
}

export default function Providers({children}: { children: React.ReactNode }) {
    const [cache] = useState(() => {
        const cache = createCache({key: 'css'})
        cache.compat = true
        return cache
    })

    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ))

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}
