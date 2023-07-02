### 23.05.31.

프로젝트 초기 세팅 (npm, CRA, react-router-dom, TS, redux...)

### 23.06.02.

Components 폴더 내 하위 4개의 폴더 및 Common 폴더 생성, pages 폴더 내 하위 폴더 세분화, Router 세팅

### 23.06.04.

Common Button 컴포넌트 작성

### 23.06.05.

Header 컴포넌트 초안 작성, ProductPage 세분화, Layout, ThemeProvider, Tag 생성

### 23.06.07.

2차 코드 컨벤션 작성, 레이아웃 수정, 라우터 컴포넌트 삭제 -> App.tsx에 병합하여 관리

### 23.06.08.

기본 Header와 MainPage에서만 사용되는 SubHeader 구성
MainPage Banner와 Commet에 대한 컴포넌트 구성
전역적 스타일링 Inner 컴포넌트 생성 및 적용

### 23.06.09

MainPage 내 MainList 컴포넌트와 MainCommet, MainPackage 컴포넌트 생성
MainList에서 제품 전체 조회 후, MainCommet 컴포넌트를 통해 리스트 출력 성공
MainBanner 컴포넌트 가안 완성

### 23.06.12.

useEffect 의존성 배열 관련 API 무한 호출 수정 및 적용
라우터 구성 지저분하지 않게 Page 컴포넌트로 구성

### 23.06.13.

Router 병합
MainPage에서만 출력하도록 SubHeader 수정
상품 상세 페이지를 담당할 ProductPage 컴포넌트 생성

### 23.06.19.

CartPage 내 Order 기능 추가
장바구니 내 수량 변경 기능 추가
메인페이지 내 상품 Carousel 기능 추가 ( 4개씩 출력 )
리덕스 설치 및 구성

### 23.06.20.

장바구니 구성 및 상품 목록과 주문서 사이의 props 관리
장바구니(cartItem) 리덕스 state 테스트

### 23.06.21.

장바구니 내 수량을 포함한 컴포넌트 - cartItem reducer 연결
reducer 내에서 상품의 수량과 가격을 곱한 결과값을 return하도록 구성
-> 코드는 깔끔해지겠지만, 중복 아이템 등의 오류 가능성 내포

### 23.06.22.

rebase 실시. repositoty의 sync를 맞추지 않고 무턱대고 push하지 않아야 함을 깨닫다.
sync를 맞추지 않고 앞서 commit했던 내용은 잠시 대기하고, sync부터 맞추자.
함부로 discard commit을 누르지 말자.

### 23.06.23.

- Tag Click event로 toggle 기능 및 해당 태그가 포함된 상품을 출력
  <img width="1055" alt="image" src="https://github.com/1017yu/Javascript-Essentials/assets/83483378/12b3070a-3037-49bc-a963-109baffc5a50">

- 장바구니에 상품을 담았을 때, 계속 쇼핑할 것인지, 장바구니 페이지로 이동할 것인지 선택할 수 있도록하는 기능 추가
  <img width="987" alt="image" src="https://github.com/1017yu/Javascript-Essentials/assets/83483378/e96333be-44d8-491a-beb2-e60e3731fc56">

---

### 23.06.24.

- input onChange를 통해 입력 받은 값을 모든 상품의 `title`과 `tag`와 비교하여 해당되는 상품을 출력.
  ![image](https://github.com/1017yu/Javascript-Essentials/assets/83483378/0b964d52-4e20-4ace-8ad1-703873f19d26)
  ![image](https://github.com/1017yu/Javascript-Essentials/assets/83483378/bd6798bd-5f6e-4c17-9ff1-5bf6a3648138)
  ![image](https://github.com/1017yu/Javascript-Essentials/assets/83483378/95a4c979-d2ba-40b7-8ca7-59dae6cc9d03)

### 23.06.26.

장바구니 내에 있는 상품들을 cartItem state에 디스패치하기 위해, title, quantity, price를 업데이트
즉시구매를 구현하기 위해, payment redux 세팅.

- 장바구니에서 구매 신청 + 상품 상세 페이지에서 즉시 구매 신청 = 최종 구매 신청
- 두 가지 구매 방식을 redux state로 관리
- 하지만 장바구니 목록은 리렌더링 시에도 남도록 localStorage에 저장하는 기존의 방식을 유지.

### 23.06.27.

임시로 제품 구매 신청 API 테스트, 성공
다수의 제품 구매 시, 모두 고유한 productId값을 가져야 함
반복문을 통해서 하나씩 결제 신청해야 유저 페이지 파트너 측에서 관리하기 용이

### 23.06.28.

모든 상품들은 tags 배열 내에 tag들을 갖는다. -> tag 여부에 따른 조건부 상품 검색 가능
관리자 페이지 파트너와 tag 등록을 논의, tag 등록 방식 함께 세팅 -> 규칙에 맞게 tag에 따라 조건부 렌더링
페이지 내 잦은 유저 인증 API 호출 인지, 동민님께서 건의한 부분 고려하여 react-query 도입 (적용 담당: 차동민님)

- 메인 페이지 내 배너는 보여지는 캐러셀의 슬라이스 수가 4개가 아닌 1개.
  - 따라서 Carousel의 slidesToShow를 고정 값이 아닌, props로 넘겨 받도록 수정

### 23.06.29.

- 미뤄왔던 discountRate 설정 및 구현 시작

  - redux-state에도 적용해야할 필요 인지

- 컴포넌트 내 props로도 전달해야함
  - 코드 리팩토링 불가피

### 23.06.30.

- 주문서 페이지 내에서의 트러블 슈팅

  1. 결제 계좌 미선택 결제 시도 시
  2. 결제 완료 후 navigate 상황
  3. 결제 완료 후 PaymentPage 리로드 `window.location.reload()`
  4. 비 로그인 시 비정상적으로 PaymentPage 접근 시 LoginPage로 리디렉션

- 결제 시 주문 내역에 주문 갯수 비정상 출력 트러블 슈팅

`...Array.from({ length: quantity }, () => item.productId`
수량과 동일한 길이의 새 배열을 생성, arrow function을 사용하여 productId 값을 채움.

### 23.07.01.

MainPage 코드 리팩토링 진행
할인된 가격을 계산해주는 common function 생성
redux 리팩토링 (payment -> buyItem)
가독성 떨어지는 컴포넌트를 분리하여 세분화

### 23.07.02.

결제할 금액보다 선택한 계좌의 잔액이 부족할 때, 구매 목록 페이지로 이동 중지 및
개인 계좌 페이지로 이동할 수 있도록 조건 추가
