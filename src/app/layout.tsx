import type {Metadata} from 'next'
import Providers from './providers'

export const metadata: Metadata = {
    title: '앨리스 아카데미 강좌 검색',
    description: '앨리스 아카데미에서 제공하는 다양한 온라인 강좌를 검색하고 찾아보세요. 프로그래밍, 데이터 과학, 인공지능 등 다양한 주제의 강좌를 제공합니다.',
    keywords: '앨리스 아카데미, 온라인 강좌, 프로그래밍 강좌, 데이터 과학, 인공지능, 코딩 교육',
    openGraph: {
        title: '앨리스 아카데미 강좌 검색',
        description: '앨리스 아카데미의 다양한 온라인 강좌를 검색하고 찾아보세요. 당신의 커리어를 위한 최고의 선택!',
        type: 'website',
        url: 'https://courses.aliceacademy.com',
        images: 'https://courses.aliceacademy.com/og-image.jpg',
    },
    twitter: {
        card: 'summary_large_image',
        title: '앨리스 아카데미 강좌 검색',
        description: '프로그래밍, 데이터 과학, AI 등 다양한 온라인 강좌를 제공하는 앨리스 아카데미에서 당신의 미래를 준비하세요.',
        images: 'https://courses.aliceacademy.com/twitter-image.jpg',
    },
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
