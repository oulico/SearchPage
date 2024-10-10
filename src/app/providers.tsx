'use client'

import {CacheProvider, ThemeProvider as EmotionThemeProvider} from '@emotion/react'
import {useState} from 'react'
import createCache from '@emotion/cache'
import {useServerInsertedHTML} from 'next/navigation'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryParamProvider} from 'use-query-params';
import {getQueryClient} from 'utils/get-query-client';
import NextAdapterApp from 'next-query-params/app';
// Emotion theme
const emotionTheme = {
    colors: {
        primary: '#0070f3',
        secondary: '#ff4081',
    },
}

// Chakra UI theme
const chakraTheme = extendTheme({
    colors: {
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
        },
    },
})

export default function Providers({children}: { children: React.ReactNode }) {
    const [cache] = useState(() => {
        const cache = createCache({key: 'css'})
        cache.compat = true
        return cache
    })
    const queryClient = getQueryClient();

    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ))

    return (
        <QueryClientProvider client={queryClient}>
            <QueryParamProvider adapter={NextAdapterApp}>
                <CacheProvider value={cache}>
                    <EmotionThemeProvider theme={emotionTheme}>
                        <ChakraProvider theme={chakraTheme}>
                            {children}
                        </ChakraProvider>
                    </EmotionThemeProvider>
                </CacheProvider>
            </QueryParamProvider>
        </QueryClientProvider>
    )
}
