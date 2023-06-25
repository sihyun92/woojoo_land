import { useEffect, useState } from "react";
import { check2 } from "../../lib/API/userAPI";
import { IProduct } from "../../lib/API/adminAPI";
import MainCartListBtn from "./MainCartListBtn";
import styled from "styled-components";
import { theme } from "../../styles/theme";

function MainCartList() {
  const [carts, setCarts] = useState<IProduct[]>([]);
  const [hasCartItems, setHasCartItems] = useState(false); // 장바구니에 상품이 있는지 여부를 상태로 관리

  // 로컬 스토리지 내 장바구니 목록 조회
  useEffect(() => {
    getCart();
  }, []);

  // 로컬스토리지에 접근하여 장바구니 목록에 접근하는 함수
  const getCart = async () => {
    const res = await check2();
    const getCartItems = localStorage.getItem(`cart_${res.email}`);
    if (getCartItems) {
      setCarts(JSON.parse(getCartItems));
      setHasCartItems(true); // 장바구니에 상품이 있음을 표시
    } else {
      // 상품이 없는 경우 빈 배열
      setHasCartItems(false); // 장바구니에 상품이 없음을 표시
    }
  };

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
              <li key={index}>
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
