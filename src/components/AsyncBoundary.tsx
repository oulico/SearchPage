"use client"

import {
    type ComponentProps,
    type Ref,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react"
import {ErrorBoundary} from "./ErrorBoundary"
import {Suspense} from "./Suspense"

type ErrorBoundaryProps = Omit<ComponentProps<typeof ErrorBoundary>, "render">
type SSRSuspenseProps = Omit<ComponentProps<typeof Suspense>, "fallback">

type Props = SSRSuspenseProps &
    ErrorBoundaryProps & {
    rejected: ComponentProps<typeof ErrorBoundary>["render"]
    pending: ComponentProps<typeof Suspense>["fallback"]
}

interface ResetRef {
    reset?(): void
}

const AsyncBoundary = forwardRef(
    (
        {pending, rejected, children, ...errorBoundaryProps}: Props,
        resetRef: Ref<ResetRef>,
    ) => {
        const ref = useRef<ErrorBoundary | null>(null)

        useImperativeHandle(resetRef, () => ({
            reset: () => ref.current?.resetErrorBoundary(),
        }))

        return (
            <ErrorBoundary ref={ref} render={rejected} {...errorBoundaryProps}>
                <Suspense fallback={pending}>{children}</Suspense>
            </ErrorBoundary>
        )
    },
)

AsyncBoundary.displayName = 'AsyncBoundary';

export default AsyncBoundary
