# 앨리스 과정검색 페이지 클론

이 프로젝트는 [앨리스 아카데미](https://academy.elice.io)의 과정검색 페이지를 클론 코딩한 것입니다. 실제 운영 중인 서비스의 API를 활용하여 프론트엔드 개발 실무 역량을 강화하는 것을 목표로 합니다.

## 주요 기능

- 과정 목록 조회 및 필터링
- 동적 URL 기반 상태 관리
- 서버 사이드 렌더링(SSR)과 클라이언트 사이드 렌더링(CSR) 하이브리드 구조

## 사용 기술

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **상태 관리**: TanStack Query, React Hooks
- **스타일링**: emotion, Chakra UI
- **데이터 검증**: Zod
- **기타**: React, Temporal.js

## 주요 구현 사항

1. **견고한 프론트엔드 아키텍처**
   - Next.js 14 App Router를 활용한 라우팅 및 SSR/CSR 하이브리드 구조
   - AsyncBoundary와 ErrorBoundary를 통한 선언적 비동기 처리 및 에러 핸들링

2. **타입 안전성 및 데이터 검증**
   - TypeScript와 Zod를 조합한 런타임 및 컴파일 타임 타입 안전성 확보
   - 필터 조건을 상수로 분리하여 타입 안전성 보장 및 feature flag 구현 준비

3. **효율적인 상태 관리 및 데이터 동기화**
   - TanStack Query를 활용한 서버 상태 관리 및 캐싱 전략 구현
   - 커스텀 훅을 통한 데이터 fetching 로직 모듈화

4. **API 통합 및 보안**
   - 실제 프로덕션 API 리버스 엔지니어링을 통한 데이터 구조 파악
   - Next.js API Routes를 활용한 CORS 문제 해결 및 백엔드 로직 모듈화

5. **성능 최적화 (진행 중)**
   - TanStack Query를 활용한 데이터 프리페칭 전략 수립 (구현 예정)

## 코딩 원칙

- **Colocation**: 관련된 코드를 가까이 배치하여 유지보수성 향상
- **타입 안전성**: TypeScript와 Zod를 통한 엄격한 타입 체크
- **모듈화**: 재사용 가능한 컴포넌트와 훅 설계
- **선언적 프로그래밍**: AsyncBoundary 등을 활용한 명확한 비동기 처리
- **확장성**: feature flag 등을 고려한 유연한 구조 설계

## 현재 진행 상황

- [x] 프로젝트 기본 구조 설정
- [x] API 리버스 엔지니어링 및 데이터 fetching 구현
- [x] 기본적인 상태 관리 및 필터링 기능 구현
- [x] SSR을 위한 emotion 설정
- [ ] 스타일링 적용 (진행 중)
- [ ] SSR 환경에서의 useSearchParams 최적화 (예정)
- [ ] 데이터 프리페칭 구현 (예정)
- [ ] 테스트 코드 작성 (예정)

## 향후 계획

1. SSR 환경에서의 useSearchParams 사용 최적화
2. 스타일링 완성 및 반응형 디자인 구현
3. 데이터 프리페칭 구현을 통한 초기 로딩 성능 개선
4. feature flag 시스템 구현
5. 종합적인 테스트 전략 수립 및 구현
