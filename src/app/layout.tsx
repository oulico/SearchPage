import type {Metadata} from "next";
import Providers from './providers'

export const metadata: Metadata = {
    title: "앨리스 강좌 리스트",
    description: "앨리스에서 제공하는 무료/유료 강좌 리스트입니다",
};


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}
