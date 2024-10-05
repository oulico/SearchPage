## UI Components

- [x] Layout.tsx
- [ ] SearchArea.tsx
- [ ] Filter ⏫
- state(keyword,price)가 url에 저장된다고 보면 됨. useParam 사용하기.
- filter메서드를 써서 칩을 두번 눌러서 토글을 해제하면, 경로 인자에서도 지우기
- useReact, useToggle사용하기.
- price는 free, paid가 있음. 중복으로 넣을 수 있음 price=free&price=paid
- [ ] CourseCard
- [ ] Body
- [ ] Label
- course.enroll_type, course.is_free 값에 따라서 레이블을 다르게 표현.
- 따로 함수로 만들기. 그 값을 label에 넣어주기. (무료, 유료, 구독 이렇게 세개이고, 이는 따로 타입을 또 그 함수안에 넣어놓을 것임.)
- [ ] Title
- [ ] Description
- [ ] IconText
- [ ] Logo
- [ ] Pagination
- [ ] Box
    - ![[CleanShot 2024-10-05 at 10.14.27.png]]

 ```

const pages = (클릭한 숫자) => {
 
  const currentPage
  // 클릭한 숫자가 한가운데, 그 숫자의 플러스 마이너스 2까지 양옆으로 표시한다.
 
  const pageNums
 // 숫자 다섯개 나옴

  return // pageNums.map 해서 컴포넌트 다섯개.

}

const pages = 
 <Box>
	 <Buttons>
		 <Button>
		 //왼쪽 화살표. 클릭하면 tanstackQuery로 호출. 대신, 화살표에 할당된 데이터들은 prefetching을 해놓기.
		 </Button>
		 <Info>
		 {pages}
			 //<Page>
			 //숫자 5개
			 //</Page> 
		 </Info>
	 
		 <Button>
		 // 오른쪽 화살표
		 </Button>
	 </Buttons>
 </Box>
```

## etc

- [ ] StateManagement
- [ ] fetch



