"use client"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {
    QueryClientProvider,
} from "@tanstack/react-query"
import {getQueryClient} from "components/getQueryClient"
import {type ComponentProps} from "react"

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({children, ...props}: Props) => {
    const client = getQueryClient()

    return (
        <QueryClientProvider {...props} client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
