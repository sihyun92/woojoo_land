import { productDetail } from "../../lib/API/commonAPI";
import { useParams, useNavigate } from "react-router-dom";
import { IProductEdit } from "../../lib/API/adminAPI";
import { useEffect } from "react";
import { check } from "../../lib/API/userAPI";

// 인터페이스 선언
interface MainCartBtnProps {
  quantity: number;
}

function MainCartBtn({ quantity }: MainCartBtnProps) {
  // URL로부터 현재 product의 id값 도출
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  });

  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductEdit = await productDetail(id);
      // 다수의 제품을 담았을 경우
      const products: IProductEdit[] = Array(quantity).fill(product);
      return products;
    }
    return null;
  };

  const getUserInfo = async () => {
    const res = await check();
  };

  const postCart = async (updatedCarts: IProductEdit[]) => {
    // 인증 확인
    // 기존의 로컬 스토리지에 저장된 product get
    const res = await check();
    const getCartItems = localStorage.getItem(`cart_${res.email}`);
    let cartItems: IProductEdit[] = [];

    if (getCartItems) {
      cartItems = JSON.parse(getCartItems);
    }

    // props로 받은 상품들을 push
    if (cartItems) {
      cartItems.push(...updatedCarts);
    }

    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(cartItems));
  };

  const onCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item) {
      // 1. postCart() 실행
      postCart(item);
    }

    // 2. 장바구니 추가 후, CartPage로 이동할 지에 대한 여부
    const confirm = window.confirm(
      "장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?",
    );

    if (confirm) {
      navigate("/cart");
    } else {
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        onCart(event);
      }}
    >
      장바구니
    </button>
  );
}

export default MainCartBtn;

// 처음에 Link를 통해 장바구니 페이지를 이동시켰으나, 로컬스토리지에 post하기 전에 장바구니 페이지로 이동되어
// 장바구니 페이지에 도착했을 땐, 아직 로컬 스토리지가 비어있는 문제가 있었다.
// useNavigator를 통해, 스토리지에 저장이 완료되면 그 뒤로 navigate를 통해 페이지를 이동 시켜 오류를 해결했다.
