import { useEffect, useState } from "react";
import { check } from "../../lib/API/userAPI";
import { IProduct } from "../../lib/API/adminAPI";
import MainCartListBtn from "./MainCartListBtn";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../modules/cartItem";

function MainCartList() {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState<IProduct[]>([]);
  const [hasCartItems, setHasCartItems] = useState(false); // 장바구니에 상품이 있는지 여부를 상태로 관리

  // 로컬 스토리지 내 장바구니 목록 조회 및 장바구니 내 상품 정보 dispatch
  useEffect(() => {
    const getCart = async () => {
      // 인증 확인
      const res = await check();
      // 로컬스토리지에서 장바구니 목록 GET
      const getCartItems = localStorage.getItem(`cart_${res.email}`);
      const prevCartItems = JSON.stringify(carts);

      // 장바구니 내 상품이 있다면
      if (getCartItems && getCartItems !== prevCartItems) {
        // JSON 파싱
        const cartItems: IProduct[] = JSON.parse(getCartItems);

        // carts state Update
        setCarts(cartItems);

        // 장바구니에 상품이 있음을 표시
        setHasCartItems(true);

        // 수량 계산
        const amount: { [title: string]: number } = {}; // 객체 생성
        cartItems.forEach((item) => {
          // item 객체의 title 속성을 변수에 할당
          const { title } = item;
          // amount 객체에 해당 title 속성이 존재하는 지에 따라 수량 할당
          amount[title as string]
            ? (amount[title as string] += 1)
            : (amount[title as string] = 1);
        });

        // 수량에 맞게 state에 dispatch
        Object.entries(amount).forEach(([title, quantity]) => {
          // [key, value] - [title, quantity]
          const cartItem = cartItems.find((item) => item.title === title);
          if (cartItem) {
            const { id, price } = cartItem;
            dispatch(
              setQuantity({
                productId: id as string,
                title: title as string,
                quantity: quantity,
                price:
                  cartItems.find((item) => item.title === title)?.price || 0,
                discountRate: 0,
              }),
            );
          }
        });
      } else if (!prevCartItems) {
        // 상품이 없는 경우 빈 배열
        setCarts([]);
        setHasCartItems(false); // 장바구니에 상품이 없음을 표시
      }
    };
    getCart();
  }, [carts]);

  // new Set 메소드로 중복을 제거하고, 상품의 id만 추출한 배열 선언
  // 추후에, 기존의 carts와 비교(filtering)하여 상품의 개수를 계산
  const settedCart = Array.isArray(carts)
    ? Array.from(new Set(carts.map((cart) => cart.id)))
    : [];

  return (
    <Ul>
      {hasCartItems
        ? settedCart.map((id, index) => {
            const sortedCart = carts.filter((cart) => cart.id === id);
            const quantity = sortedCart.length;
            const cart = sortedCart[0];

            return (
              <li key={id}>
                <input type="checkbox" />
                <img src={cart.thumbnail} alt="Thumbnail" width="100px" />
                <Title>{cart.title} 특별 분양</Title>
                <MainCartListBtn
                  id={cart.id}
                  quantity={quantity}
                  price={cart.price as number}
                  title={cart.title}
                />
              </li>
            );
          })
        : "장바구니에 상품이 없습니다"}
    </Ul>
  );
}

const Ul = styled.ul`
  list-style: none;

  > li {
    padding: 0 2rem;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[3]};

    > img {
      border-radius: 5px;
    }
  }
`;

const Title = styled.div`
  min-width: 275px;
  width: 275px;
`;

export default MainCartList;
