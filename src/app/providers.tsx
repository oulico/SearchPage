'use client'

import {CacheProvider} from '@emotion/react'
import {useState} from 'react'
import createCache from '@emotion/cache'
import {useServerInsertedHTML} from 'next/navigation'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryParamProvider} from 'use-query-params';
import {getQueryClient} from 'utils/get-query-client';
import NextAdapterApp from 'next-query-params/app';
import {chakraTheme} from "constants/styleScheme";


export default function Providers({children}: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

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
        <QueryClientProvider client={queryClient}>
            <QueryParamProvider adapter={NextAdapterApp}>
                <CacheProvider value={cache}>
                    <ChakraProvider theme={chakraTheme}>
                        {children}
                    </ChakraProvider>
                </CacheProvider>
            </QueryParamProvider>
        </QueryClientProvider>
    )
}
