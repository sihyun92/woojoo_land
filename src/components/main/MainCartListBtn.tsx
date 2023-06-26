import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { check } from "../../lib/API/userAPI";
import { setQuantity } from "../../modules/cartItem";
import { IProductEdit } from "../../lib/API/adminAPI";
import { productDetail } from "../../lib/API/commonAPI";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { formatDollar } from "../../lib/Function/commonFn";

interface ICartListBtnProps {
  id?: string;
  quantity: number;
  price: number;
  title?: string;
}

function MainCartListBtn({ id, quantity, price, title }: ICartListBtnProps) {
  // dispatch 선언
  const dispatch = useDispatch();

  // props로 받은 수량을 state에 저장 및 관리
  let [itemQty, setItemQty] = useState<number>(quantity | 0);

  // 단일 제품 상세 조회 함수
  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductEdit[] = await productDetail(id);
      return product;
    }
    return null;
  };

  // LocalStorage에 장바구니 상품을 post
  const increaseItem = async (updatedCarts: IProductEdit[]) => {
    const res = await check();

    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);

    // cartItems 배열 선언
    let cartItems: IProductEdit[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // 기존의 product 배열에 updatedCarts 배열 concat
    const newCartItems = cartItems.concat(updatedCarts);

    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(newCartItems));
    setItemQty((prevQuantity) => prevQuantity + 1);
  };

  // LocalStorage에 장바구니 상품을 decrease
  const decreaseItem = async (id: string) => {
    const res = await check();

    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);

    // cartItems 배열 선언
    let cartItems: IProductEdit[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // 감소하고자 하는 item의 id값과 장바구니 내 id값을 비교하여 id값 추출
    const decreasedIdx = cartItems.findIndex((item) => item.id === id);

    if (decreasedIdx !== -1) {
      // 수량이 1 이상일 때만 감소 처리
      if (itemQty > 0) {
        // setItemQty((prevQuantity) => prevQuantity - 1);
        cartItems.splice(decreasedIdx, 1);
        setItemQty((prevQuantity) => prevQuantity - 1);
      } else {
        // 수량이 1 이하일 경우 해당 상품을 장바구니에서 제거
        setItemQty(0);
      }
    }

    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(cartItems));
  };

  // 장바구니 내 특정 상품 일괄 삭제
  const removeItem = async (id: string) => {
    const res = await check();

    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);

    // cartItems 배열 선언
    let cartItems: IProductEdit[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // 감소하고자 하는 item의 id값과 장바구니 내 id값을 비교하여 id값 추출
    const removedIdx = cartItems.findIndex((item) => item.id === id);

    if (removedIdx !== -1) {
      // 수량이 1 이상일 때만 삭제 처리
      if (itemQty > 0) {
        cartItems = cartItems.filter((item) => item.id !== id);
        alert("상품이 삭제되었습니다.");
      }
    }
    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(cartItems));
  };

  // 구매 수량 증가 (increase product)
  const onIncrease = async () => {
    const item = await findProduct();
    if (item && title && price) {
      increaseItem(item);
      dispatch(
        setQuantity({ title: title, quantity: itemQty + 1, price: price }),
      );
    }
  };

  // 구매 수량 감소 (decrease product)
  const onDecrease = async () => {
    if (id && title && price) {
      decreaseItem(id);
      dispatch(
        setQuantity({ title: title, quantity: itemQty - 1, price: price }),
      );
    }
  };

  const onRemove = async () => {
    if (id) {
      removeItem(id);
    }
  };

  return (
    <>
      <ButtonWrapper>
        <BiMinusCircle onClick={onDecrease}>-</BiMinusCircle>
        <p>{itemQty}</p>
        <BiPlusCircle onClick={onIncrease}>+</BiPlusCircle>
      </ButtonWrapper>
      <Price>{formatDollar(price * itemQty)}</Price>
      <Delete onClick={onRemove}>X</Delete>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  > p {
    font-size: 1.5rem;
    width: 2rem;
    text-align: center;
  }

  > svg {
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const Price = styled.span`
  min-width: 96px;
`;

const Delete = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default MainCartListBtn;
