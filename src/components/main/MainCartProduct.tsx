import { useEffect, useState } from "react";
import { check } from "../../lib/API/userAPI";
import { IProduct } from "../../lib/API/adminAPI";
import MainCartQtyBtn from "./MainCartQtyBtn";

function MainCartProduct() {
  const [carts, setCarts] = useState<IProduct[]>([]);

  // 로컬 스토리지 내 장바구니 목록 조회
  useEffect(() => {
    getCart();
  }, [carts]);

  // 로컬스토리지에 접근하여 장바구니 목록에 접근하는 함수
  const getCart = async () => {
    const res = await check();
    const getCartItems = localStorage.getItem(`cart_${res.email}`);
    if (getCartItems) {
      setCarts(JSON.parse(getCartItems));
    }
  };

  // new Set 메소드로 중복을 제거하고, 상품의 id만 추출한 배열 선언
  // 추후에, 기존의 carts와 비교(filtering)하여 상품의 개수를 계산
  const settedCart = Array.isArray(carts)
    ? Array.from(new Set(carts.map((cart) => cart.id)))
    : [];

  return (
    <div>
      {carts
        ? settedCart.map((id, index) => {
            const sortedCart = carts.filter((cart) => cart.id === id);
            const quantity = sortedCart.length;
            const cart = sortedCart[0];

            return (
              <li key={index}>
                <div>
                  <input type="checkbox" />
                  <span>{cart.title}</span>
                  <span>{cart.price}</span>
                  <MainCartQtyBtn id={cart.id} quantity={quantity} />
                </div>
              </li>
            );
          })
        : "장바구니에 상품이 없습니다"}
    </div>
  );
}

export default MainCartProduct;
