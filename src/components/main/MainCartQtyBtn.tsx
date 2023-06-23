import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { check2 } from "../../lib/API/userAPI";
import { setQuantity } from "../../modules/cartItem";
import { IProductEdit } from "../../lib/API/adminAPI";
import { productDetail } from "../../lib/API/commonAPI";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { TRootState } from "../../modules";

interface ICartQtyBtnProps {
  id?: string;
  quantity: number;
  price?: number;
  title?: string;
}

function MainQtyButton({ id, quantity, price, title }: ICartQtyBtnProps) {
  // dispatch 선언
  const dispatch = useDispatch();

  // props로 받은 수량을 state에 저장 및 관리
  let [itemQty, setItemQty] = useState<number>(quantity | 0);

  // 최초 렌더링 시, 장바구니 내 상품들의 Id-수량을 dispatch
  useEffect(() => {
    const fetchItem = async () => {
      const item = await findProduct();

      if (item && title && price) {
        dispatch(
          setQuantity({ title: title, quantity: itemQty, price: price }),
        );
      }
    };
    fetchItem();
  }, []);

  const test = useSelector((state: TRootState) => state.cartItem);
  console.log(test);
  // const sat = test["토성"];
  // console.log(sat)

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
  const postCart = async (updatedCarts: IProductEdit[]) => {
    const res = await check2();

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

  // LocalStorage에 장바구니 상품을 remove
  const removeCart = async (id: string) => {
    const res = await check2();

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
      console.log(itemQty);

      // 수량이 1 이상일 때만 감소 처리
      if (itemQty > 0) {
        // setItemQty((prevQuantity) => prevQuantity - 1);
        cartItems.splice(removedIdx, 1);
        setItemQty((prevQuantity) => prevQuantity - 1);
      } else {
        // 수량이 1 이하일 경우 해당 상품을 장바구니에서 제거
        setItemQty(0);
      }
    }

    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(cartItems));
  };

  // 구매 수량 증가 (post product)
  const onAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item && title && price) {
      postCart(item);
      dispatch(
        setQuantity({ title: title, quantity: itemQty + 1, price: price }),
      );
    }
  };

  // 구매 수량 감소 (remove product)
  const onRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (id && title && price) {
      removeCart(id);
      dispatch(
        setQuantity({ title: title, quantity: itemQty - 1, price: price }),
      );
    }
  };

  return (
    <ButtonWrapper>
      <button
        onClick={(event) => {
          onRemove(event);
        }}
      >
        <BiMinusCircle>-</BiMinusCircle>
      </button>
      <p>{itemQty}</p>
      <button
        onClick={(event) => {
          onAdd(event);
        }}
      >
        <BiPlusCircle>+</BiPlusCircle>
      </button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  > svg {
    font-size: 1.5rem;
    cursor: pointer;
  }
  > p {
    font-size: 1.5rem;
    width: 2rem;
    text-align: center;
  }
`;

export default MainQtyButton;
