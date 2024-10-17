'use client'

import {CacheProvider} from '@emotion/react'
import {useState} from 'react'
import createCache from '@emotion/cache'
import {useServerInsertedHTML} from 'next/navigation'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryProvider} from "app/providers/QueryProvider";
import {chakraTheme} from "constants/styleScheme";


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
        <QueryProvider>
            <CacheProvider value={cache}>
                <ChakraProvider theme={chakraTheme}>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </QueryProvider>
    )
}
