import styled from "styled-components";
import { check } from "../../lib/API/userAPI";
import { IProductEdit } from "../../lib/API/adminAPI";
import { productDetail } from "../../lib/API/commonAPI";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

interface ICartQtyBtnProps {
  id?: string;
  quantity?: number;
}

function MainQtyButton({ id, quantity }: ICartQtyBtnProps) {
  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductEdit[] = await productDetail(id);
      return product;
    }
    return null;
  };

  const postCart = async (updatedCarts: IProductEdit[]) => {
    const res = await check();
    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);

    let cartItems: IProductEdit[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }
    // 기존의 product 배열에 updatedCarts 배열 concat
    const newCartItems = cartItems.concat(updatedCarts);

    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(newCartItems));
  };

  const removeCart = async (updatedCarts: IProductEdit[]) => {
    const res = await check();
    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);
    let cartItems: IProductEdit[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // localStorage에 저장(set)
    localStorage.removeItem(`cart_${res.email}`);
  };

  // 구매 수량 증가 (post product)
  const onAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item) {
      postCart(item);
    }
  };

  // 구매 수량 감소 (remove product)
  const onRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item) {
      removeCart(item);
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
      <p>{quantity}</p>
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
